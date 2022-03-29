<template>
  <v-dialog v-model="dialog" persistent max-width="400px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" text>{{item.code}}</v-btn>
    </template>
    <v-card class="boxditale">
      <v-card-title class="text-h6 font-weight-bold font-color1"><v-icon color="6c6c6c">mdi-tooltip-text</v-icon>&nbsp; 상세정산내역</v-card-title>
      <v-card-text class="bottom-padding-0">
        <v-text-field :value="item.code" label="접수코드" readonly />
        <v-text-field :value="Number(item.total_price).toLocaleString()" label="결제금액" readonly />
        <v-text-field :value="Number(item.fee).toLocaleString()" label="수수료" readonly />
        <v-text-field :value="Number(item.adjustment_price).toLocaleString()" label="최종 정산금액(결제금액-수소료)" readonly/>
        <v-text-field :value="item.forwarding.bank" label="정산계좌" readonly/>
        <v-text-field :value="item.status_name" label="처리결과" readonly/>
      </v-card-text>
      <v-card-actions class="justify-center top-padding-0">
        <v-btn large color="#3d9cd2" dark height="48" elevation="0" @click="dialog = false" width="100">확인</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AdjustmentDialog",
  props: ['item'],
  data: () => ({
    dialog: false,
  }),
  watch: {
    dialog: {
      immediate: true,
      handler(value) {
        if (value) {
          this.init();
        }
      }
    }
  },
  methods: {
    async init() {
      //const data = (await this.$axios.get('/forwarding/adjustments/'+this.id)).data;
    }
  }
}
</script>

<style scoped>
  .replebtn {background: #f8f8f8!important; border: 1px solid #e7e7e7;padding: 0 10px!important;}
  .boxditale {padding: 18px 10px 22px; border-radius: 10px;}
  .font-color1 {color: #757575;margin-bottom: 10px;}
</style>
