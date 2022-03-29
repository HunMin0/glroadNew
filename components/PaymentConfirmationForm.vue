<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on"> 결제확인 및 픽업 </v-btn>
    </template>
    <v-card>
      <v-card-title> 결제확인 및 픽업예정일시 </v-card-title>
      <!--v-card-subtitle> - 결제일을 입력하지 않으면 현재 시간으로 입력 됩니다. </v-card-subtitle-->
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field v-model="form.payment_date" :error-messages="errors.payment_date" type="date" outlined label="결제일"></v-text-field>
<!--            <v-menu v-model="form.menu_payment_date" :close-on-content-click="false" transition="scale-transition"
                    offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="form.payment_date" :error-messages="errors.payment_date"
                              label="결제일" readonly outlined v-bind="attrs" v-on="on"/>
              </template>
              <v-date-picker v-model="form.payment_date" @input="form.menu_payment_date = false"/>
            </v-menu>-->
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="form.payment_time" :error-messages="errors.payment_time" type="time" outlined label="결제시간"></v-text-field>
<!--            <v-menu ref="menu_payment_time" v-model="form.menu_payment_time" :close-on-content-click="false"
                    :nudge-right="40" :return-value.sync="form.payment_time"
                    transition="scale-transition" offset-y max-width="290px" min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="form.payment_time" :error-messages="errors.payment_time"
                              outlined label="결제시간" readonly v-bind="attrs" v-on="on" style="max-width: 200px"/>
              </template>
              <v-time-picker v-model="form.payment_time" full-width format="24hr"
                             @click:minute="$refs.menu_payment_time.save(form.payment_time)"/>
            </v-menu>-->
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="form.pickup_expected_date" :error-messages="errors.pickup_expected_date" type="date" outlined label="픽업예정일"></v-text-field>
<!--            <v-menu v-model="form.menu_pickup_expected_date" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="form.pickup_expected_date" :error-messages="errors.pickup_expected_date"
                              label="픽업예정일" readonly outlined v-bind="attrs" v-on="on" />
              </template>
              <v-date-picker v-model="form.pickup_expected_date" @input="form.menu_pickup_expected_date = false" />
            </v-menu>-->
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="form.pickup_expected_time" :error-messages="errors.pickup_expected_time" type="time" outlined label="픽업예정시간"></v-text-field>
<!--            <v-menu ref="menu_pickup_expected_time" v-model="form.menu_pickup_expected_time" :close-on-content-click="false"
                    :nudge-right="40" :return-value.sync="form.pickup_expected_time"
                    transition="scale-transition" offset-y max-width="290px" min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="form.pickup_expected_time" :error-messages="errors.pickup_expected_time"
                              outlined label="픽업예정시간" readonly v-bind="attrs" v-on="on" style="max-width: 200px" />
              </template>
              <v-time-picker v-model="form.pickup_expected_time" full-width format="24hr"
                             @click:minute="$refs.menu_pickup_expected_time.save(form.pickup_expected_time)"/>
            </v-menu>-->
          </v-col>
        </v-row>

      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false">취소</v-btn>
        <v-btn color="primary" @click="save">저장</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "PaymentConfirmationForm",
  props: ['contract'],
  watch: {
    dialog(value) {
      if (value) {
      } else {
        this.form = {
          /*menu_payment_date: false, payment_date: '', menu_payment_time: false, payment_time: '',*/
          menu_pickup_expected_date: false, pickup_expected_date: '', menu_pickup_expected_time: false, pickup_expected_time: '',
        };
      }
    }
  },
  data: () => ({
    dialog: false,
    form: {
      /*menu_payment_date: false, payment_date: '', menu_payment_time: false, payment_time: '',*/
      menu_pickup_expected_date: false, pickup_expected_date: '', menu_pickup_expected_time: false, pickup_expected_time: '',
    },
    errors: {},
  }),
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    async save() {
      try {
        this.errors = {};
        const data = await this.$axios.$put('/forwarding/contracts/'+this.contract.id+'/payment-confirmation', this.form)
        if (data.result) {
          this.showSnackbar({show: true, color: 'success', message: '결제가 확인되었습니다.'});
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

</style>
