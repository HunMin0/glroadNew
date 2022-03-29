<template>
  <v-col cols="12" sm="6">

    <v-toolbar flat class="mt-2">
      <v-toolbar-title>{{ isStatusReview ? '리뷰작성' : '스케줄정보' }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <template v-if="isStatusReview">
      <review-form :contract="contract" @saved="updateContract" @close="$router.push('/')"></review-form>
    </template>
    <template v-else>
      <v-card>
        <v-card-text v-if="contract">
          {{ contract.schedule.pol_fullname }} - {{ contract.schedule.pod_fullname }}<br/>
          {{ $dayjsFormat(contract.schedule.departure_date/* + ' ' + contract.schedule.departure_time*/, 'YYYY-MM-DD') }}
          - {{ $dayjsFormat(contract.schedule.arrival_date/* + ' ' + contract.schedule.arrival_time*/, 'YYYY-MM-DD') }}
          ({{ contract.schedule.expected_delivery_days_text }})<br/>
          {{ contract.schedule.container_name }} | 잔여{{ contract.schedule.cbm }}CBM
          <br/>
        </v-card-text>
      </v-card>

      <contract-stepper :contract="contract" @update="updateContract"></contract-stepper>

      <v-card flat>
        <v-card-title>진행기록</v-card-title>
        <v-card-text>
          <v-data-table :headers="historyHeaders" :items="contract.histories"
                        disable-pagination hide-default-footer>
            <template v-slot:item.created_at="{item}"> {{ $dayjsFormat(item.created_at) }}</template>
          </v-data-table>
        </v-card-text>
      </v-card>

      <v-card flat>
        <v-card-title>
          문의내역 <v-spacer/> <question-dialog type="contract" :id="contract.id" @update="init"></question-dialog>&nbsp;
        </v-card-title>
        <v-card-text>
          <v-data-table :headers="questionHeaders" :items="contract.questions"
                        disable-pagination hide-default-footer>
            <template v-slot:item.created_at="{item}"> {{ $dayjsFormat(item.created_at) }}</template>
          </v-data-table>
        </v-card-text>
      </v-card>

      <v-card flat>
        <v-card-title>
          등록서류 <v-spacer/> <contract-file-dialog type="contract" :id="contract.id" @update="init"></contract-file-dialog>&nbsp;
        </v-card-title>
        <v-card-text>
          <v-data-table :headers="fileHeaders" :items="contract.files"
                        disable-pagination hide-default-footer>
            <template v-slot:item.created_at="{item}"> {{ $dayjsFormat(item.created_at) }}</template>
          </v-data-table>
        </v-card-text>
      </v-card>

    </template>

  </v-col>
</template>

<script>
import {mapGetters} from "vuex";
import ContractStepper from "../../../components/ContractStepper";
import Signature from "../../../components/Signature";
import ReviewForm from "../../../components/ReviewForm";
import QuestionDialog from "../../../components/QuestionDialog";
import ContractFileDialog from "../../../components/ContractFileDialog";

export default {
  name: "index",
  components: {ContractFileDialog, ContractStepper, Signature, ReviewForm, QuestionDialog},
  async asyncData({params, $axios}) {
    const response = await $axios.get('/contracts/'+params.id);
    //console.log('data', response.data.data)
    const contract = response.data.data;
    return {contract}
  },
  computed: {
    ...mapGetters(['_CONST_']),
    isStatusReview() {
      return this.contract.status === this._CONST_.STATUS_PURCHASE_CONFIRMATION_ID;
    },
    isStatusReviewDone() {

    }
  },
  data: () => ({
    dialog: false,
    historyHeaders: [
      {align: 'center', sortable: false, width: '20%', text: '일시', value: 'created_at'},
      {align: 'center', sortable: false, width: '20%', text: '상태', value: 'status_name'},
      {align: 'center', sortable: false, width: '60%', text: '내용', value: 'status_desc'},
    ],
    questionHeaders: [
      {align: 'center', sortable: false, width: '20%', text: '일시', value: 'created_at'},
      {align: 'center', sortable: false, width: '20%', text: '상태', value: 'status_text'},
      {align: 'center', sortable: false, width: '60%', text: '내용', value: 'content'},
    ],
    fileHeaders: [
      {align: 'center', sortable: false, width: '20%', text: '일시', value: 'created_at'},
      {align: 'center', sortable: false, width: '20%', text: '구분', value: 'type_name'},
      {align: 'center', sortable: false, width: '60%', text: '이름', value: 'name'},
    ],
  }),
  methods: {
    async init() {
      const response = await this.$axios.$get('/contracts/'+this.$route.params.id);
      //console.log('data', response.data)
      this.contract = response.data;
    },
    updateContract() {
      this.init();
    }
  }
}
</script>

<style scoped>

</style>
