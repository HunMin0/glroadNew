<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn depressed dark v-bind="attrs" v-on="on" color="#7294b5"><v-icon small>mdi-note-plus-outline</v-icon>&nbsp;접수서류확인 및 견적발행 </v-btn>
    </template>
     <v-card class="boxditale">
      <v-card-title class="text-h6 font-weight-bold font-color1"><v-icon color="6c6c6c">mdi-tooltip-text</v-icon>&nbsp; 견적서발행</v-card-title>
      <v-card-subtitle>
        - 모든 비용은 VAT 포함 기준입니다.
        <template v-if="isEstimated"> <br/>- 결제만료일시: {{$dayjsFormat(contract.payment_deadline_datetime)}} </template>
      </v-card-subtitle>
      <v-card-text>
        <v-currency-field v-model="form.price" :error-messages="errors.price" readonly outlined reverse suffix="운송료" prefix="KRW"
                          :auto-decimal-mode="false" :value-as-integer="false" :allow-negative="false" :decimal-length="0" :default-value="0"/>
        <template v-if="contract.is_pickup === 'Y'">
          <v-currency-field v-model="form.pickup_price" :error-messages="errors.pickup_price" :readonly="isEstimated"
                            outlined reverse suffix="픽업비용" prefix="KRW"
                            :auto-decimal-mode="false" :value-as-integer="false" :allow-negative="false" :decimal-length="0" :default-value="0"
                            persistent-hint :hint="expectedPickupPriceHint" />
        </template>
        <template v-if="contract.is_document_agency === 'Y'">
          <v-currency-field v-model="form.document_agency_price" :error-messages="errors.document_agency_price" :readonly="isEstimated"
                            outlined reverse suffix="서류대행료" prefix="KRW"
                            :auto-decimal-mode="false" :value-as-integer="false" :allow-negative="false" :decimal-length="0" :default-value="0"/>
        </template>
        <v-currency-field :value="totalPrice" readonly outlined reverse suffix="최종 견적금액" prefix="KRW"
                          :auto-decimal-mode="false" :value-as-integer="false" :allow-negative="false" :decimal-length="0" :default-value="0"/>

        <template v-if="!isEstimated">
          <v-select v-model="form.payment_deadline_hour" :items="paymentDeadlineHourItems" :error-messages="errors.payment_deadline_hour"
                    item-value="value" item-text="text" outlined label="결제마감시간" persistent-hint hint="견적발송시간기준"/>
        </template>

        <v-textarea hide-details="auto" v-model="form.notice" :readonly="isEstimated" outlined label="전달사항" />
      </v-card-text>
      <v-card-actions class="justify-center top-padding-0">
        <v-btn large color="grey darken-1" outlined height="48" elevation="0" @click="dialog = false" width="100">닫기</v-btn>
        <v-btn v-if="!isEstimated" @click="save" large color="#3d9cd2" dark height="48" elevation="0" width="100">견적서발행</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions} from "vuex";
export default {
  name: "EstimateForm",
  props: ['contract', 'isReadonly'],
  mounted() {
    //this.dialog = true;//FORTEST
  },
  computed: {
    totalPrice() {
      return this.form.price + this.form.pickup_price + this.form.document_agency_price;
    },
    expectedPickupPriceHint() {
      return `예상픽업비용: ${Number(this.contract.expected_pickup_price).toLocaleString()}`;
    },
    isEstimated() {
      return this.$dayjs(this.contract.estimated_at).isValid();
    }
  },
  watch: {
    dialog(value) {
      if (value) {
        this.form = this.contract;
        if (!this.isEstimated) {
          this.form.price = this.contract.schedule.price;
          this.form.pickup_price = this.contract.expected_pickup_price;
        }
      } else {
        this.form = {price: 0, pickup_price: 0, document_agency_price: 0};
      }
    }
  },
  data: () => ({
    dialog: false,
    paymentDeadlineHourItems: [
      {value: 1, text: '1시간 후'},
      {value: 2, text: '2시간 후'},
      {value: 3, text: '3시간 후'},
      {value: 4, text: '4시간 후'},
      {value: 5, text: '5시간 후'},
    ],
    form: {price: 0, pickup_price: 0, document_agency_price: 0},
    errors: {}
  }),
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    async save() {
      try {
        this.errors = {};
        const data = await this.$axios.$put('/forwarding/contracts/'+this.contract.id+'/estimate', this.form)
        if (data.result) {
          this.showSnackbar({show: true, color: 'success', message: '견적서가 발행되었습니다.'});
          this.dialog = false;
          this.$emit('update');
        } else {
          this.showSnackbar({show: true, color: 'error', message: data.message});
        }
      } catch (e) {
        //console.log(e);
        this.showSnackbar({show: true, color: 'error', message: 'Error: ' + e.response.status + '(' + e.response.statusText + ')'});
        if (e.response.status === 422) {
          for (let [key, value] of Object.entries(e.response.data.errors)) {
            /*console.log(key, value);
            this.$set(this.errors, key, true);*/
            var keys = key.split('.');
            //console.log(keys, value[0]);
            if (keys[1]) {
              //this.$set(this.errors[keys[0]], keys[1], value[0]);
              this.$set(this.errors, keys[0], value[0]);
            } else {
              this.$set(this.errors, keys[0], value[0]);
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  .replebtn {background: #f8f8f8!important; border: 1px solid #e7e7e7;padding: 0 10px!important;}
  .boxditale {padding: 18px 10px 22px; border-radius: 10px;}
  .font-color1 {color: #757575;margin-bottom: 10px;}
</style>
