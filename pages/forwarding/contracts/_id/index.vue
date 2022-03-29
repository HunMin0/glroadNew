<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12">
        <div class="vCardBg">
           <v-row>
            <v-col>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h5 mb-0">
                    <router-link to="/forwarding/contracts"><v-btn icon class="iconMa ma-0">
                      <v-icon>mdi-arrow-left-thick</v-icon>
                    </v-btn></router-link> 계약 상세조회  <span class="titleSpan">접수코드 #{{ contract.code }}에 대한 상세내역 입니다.</span>
                  </v-list-item-title>
                </v-list-item-content>

                <v-card-actions class="justify-end">
                  <!-- 상태가 신규접수일 때 주문취소, 견적발행
                  상태가 견적발행때 주문취소, 견적발행-->
                  <template v-if="contract.status === _CONST_.STATUS_ORDER_PLACED || contract.status === _CONST_.STATUS_ESTIMATE_ISSUANCE_ID">
                    <v-btn color="#cd6969" depressed dark><v-icon small>mdi-close-circle-outline</v-icon>&nbsp;주문취소</v-btn>
                    &nbsp;&nbsp;<estimate-form :contract="contract" @update="init()"></estimate-form>
                  </template>

                  <!-- 상태가 견적승인일 때 결제확인 -->
                  <template v-if="contract.status === _CONST_.STATUS_SIGNATURE_COMPLETED_ID">
                    <v-btn depressed>결제확인중</v-btn>
                    <!--&nbsp;<payment-confirmation-form :contract="contract" @update="init()"></payment-confirmation-form>-->
                  </template>

                  <!-- 상태가 결제완료일 때 창고입고 -->
                  <template v-if="contract.status === _CONST_.STATUS_PAYMENT_COMPLETED_ID">
                    &nbsp;<pickup-expect-form :contract="contract" @update="init()"></pickup-expect-form>
                    &nbsp;<v-btn depressed @click="updateContract(_CONST_.STATUS_WAREHOUSE_ARRIVAL_ID)">창고입고</v-btn>
                  </template>

                  <!-- 상태가 창고입고일 때 운송시작 -->
                  <template v-if="contract.status === _CONST_.STATUS_WAREHOUSE_ARRIVAL_ID">
                    &nbsp;<v-btn depressed @click="updateContract(_CONST_.STATUS_TRANSPORT_DEPARTED_ID)">운송시작</v-btn>
                  </template>

                  <!-- 상태가 운송시작일 때 운송완료 -->
                  <template v-if="contract.status === _CONST_.STATUS_TRANSPORT_DEPARTED_ID">
                    &nbsp;<transport-complete-form :contract="contract" @update="init()"></transport-complete-form>
                  </template>

                  <!-- 상태가 취소요청일 때 취소확인 -->
                  <template v-if="contract.status === _CONST_.STATUS_CANCEL_REQUEST_ID">
                    &nbsp;<v-btn depressed @click="updateContract(_CONST_.STATUS_CANCEL_DONE_ID)">취소요청 승인</v-btn>
                  </template>

                </v-card-actions>
                  &nbsp;
                  <v-btn icon>
                    <v-icon>mdi-printer</v-icon>
                  </v-btn>
              </v-list-item>
             <v-divider></v-divider>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
             <v-card class="d-flex justify-space-between mb-6 setting-padding-lr font-type1 dFlex" flat tile>
              <v-card class="mb-8 mb-sm-0" elevation="0">
                <div class="d-flex align-center mb-6">
                  <v-img height="54px" src="/images/logo.png" contain position="left center"></v-img>
                </div>
                <span class="d-block typeColor mb-1">회사명 : <span class="font-type2">{{ contract.member.company_name }}</span></span>
                <span class="d-block typeColor mb-1">사업자등록번호 : <span class="font-type2">{{ contract.member.business_registration_number }}</span></span>
                <span class="d-block typeColor mb-1">담당연락처 : <span class="font-type2">{{ contract.member.phone }}</span></span>
              </v-card>
              <v-card elevation="0" class="text-right setRight">
                <p class="mb-4 font-type4 typeColor">Invoice <span class="font-type3 typeColor2">#{{ contract.code }}</span></p>
                <p class="mb-2 typeColor">접수일 : <span class="typeColor2">{{ $dayjsFormat(contract.created_at, 'YYYY-MM-DD') }}</span></p>
                <p class="mb-2 typeColor">출발일 : <span class="typeColor2">{{ $dayjsFormat(contract.schedule.departure_date, 'YYYY-MM-DD') }}</span></p>
                <p class="mb-2 typeColor">진행단계 : <span class="typeColor2">{{ contract.status_name }}</span></p>
              </v-card>
            </v-card>
            <v-divider></v-divider>
            </v-col>
          </v-row>

           <v-row>
            <v-col>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="mt-2 mb-0 colPadding">
                    <v-icon class="iconMa">mdi-television-guide</v-icon> 스케줄정보
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-card tile elevation="0">
                <v-card-text>
                  <table id="tableSet">
                    <tr>
                      <th class="thSize"><v-icon class="iconStyle">mdi-ferry</v-icon><p>출발항(POL)</p></th>
                      <th rowspan="2"><v-icon>mdi-arrow-right-thick</v-icon></th>
                      <th class="thSize"><v-icon class="iconStyle">mdi-map-marker</v-icon><p>도착항(POD)</p></th>
                      <th rowspan="2"><v-icon color="#ddd">mdi-ray-vertex</v-icon></th>
                      <th class="thSize"><v-icon class="iconStyle">mdi-calendar-clock</v-icon><p>출발일</p></th>
                      <th rowspan="2"><v-icon color="#ddd">mdi-ray-vertex</v-icon></th>
                      <th class="thSize"><v-icon class="iconStyle">mdi-forklift</v-icon><p>컨테이너종류</p></th>
                      <th rowspan="2"><v-icon color="#ddd">mdi-ray-vertex</v-icon></th>
                      <th class="thSize"><v-icon class="iconStyle">mdi-scale</v-icon><p>화물중량</p></th>
                    </tr>
                    <tr>
                      <td>{{ contract.schedule.pol_fullname }}</td>
                      <td>{{ contract.schedule.pod_fullname }}</td>
                      <td>{{ $dayjsFormat(contract.schedule.departure_date, 'YYYY-MM-DD') }}</td>
                      <td>{{ contract.schedule.container_name }}</td>
                      <td>{{ contract.schedule.cbm }}CBM / {{ contract.schedule.kg }}kg 이상</td>
                    </tr>
                  </table>

                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="6">
        <div class="vCardBg minHeight">
          <v-row>
            <v-col>
              <div class="setting-padding-lr colHeight"><v-icon class="iconMa">mdi-account-circle</v-icon> 화주정보</div>
              <v-card tile elevation="0">
                <v-card-text>
                  <table class="tableSet2">
                    <tr>
                      <td>회사명</td>
                      <td>{{ contract.member.company_name }}</td>
                    </tr>
                    <tr>
                      <td>사업자등록번호</td>
                      <td>{{ contract.member.business_registration_number }}</td>
                    </tr>
                    <tr>
                      <td>화주담당자</td>
                      <td>{{ contract.member.name }}</td>
                    </tr>
                    <tr>
                      <td>담당자 연락처</td>
                      <td> {{  contract.member.phone }}</td>
                    </tr>
                    <tr>
                      <td>담당자 이메일</td>
                      <td>{{ contract.member.email }}</td>
                    </tr>
                  </table>

                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
       <v-col cols="12" md="6">
        <div class="vCardBg minHeight">
          <v-row>
            <v-col>
              <div class="setting-padding-lr colHeight"><v-icon class="iconMa">mdi-pin</v-icon> 픽업정보</div>
              <v-card tile elevation="0">
                <v-card-text>
                  <table class="tableSet2">
                    <tr>
                      <td>주소</td>
                      <td>{{ contract.address }}</td>
                    </tr>
                    <tr>
                      <td>상세주소</td>
                      <td>{{ contract.address_detail }}</td>
                    </tr>
                  </table>
                </v-card-text>
              </v-card>
              <v-divider></v-divider>
            </v-col>
          </v-row>
           <v-row>
            <v-col>
              <div class="setting-padding-lr colHeight"><v-icon class="iconMa">mdi-file-document</v-icon> 등록서류</div>
              <v-card tile elevation="0">
                <v-card-text>
                  <v-row class="justify-center">
                    <v-col cols="12" sm="4" v-for="(item, i) in contract.files" :key="i" >
                      <v-btn @click="download(item.id)" elevation="0" large class="btnStyle2">
                        <v-icon large color="#1976d2">{{`mdi-${$getIcon(item.type)}`}}</v-icon>
                        {{item.type_name}}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col>
        <div class="vCardBg">
           <v-row>
            <v-col>
              <div class="setting-padding-lr colHeight"><v-icon class="iconMa">mdi-message-text</v-icon> 문의내역</div>
              <v-card tile elevation="0">
                <v-card-text>
                  <v-simple-table>
                    <template v-slot:default>
                      <colgroup>
                        <col style="width:20%">
                        <col style="width:80%">
                        <col style="width:10%">
                      </colgroup>
                      <!--thead> <tr> <th class="text-left"> Name </th> <th class="text-left"> Calories </th> </tr> </thead-->
                      <tbody>
                      <tr v-for="(item, i) in contract.questions" :key="i">
                        <td>{{ $dayjsFormat(item.created_at)}}</td>
                        <td>{{ item.content}}</td>
                        <td>
                          <question-answer-dialog :id="item.id" @update="searchItem"></question-answer-dialog>
                        </td>
                      </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import AppBar from "@/components/AppBar";
import EstimateForm from "../../../../components/EstimateForm";
import PaymentConfirmationForm from "../../../../components/PaymentConfirmationForm";
import PickupExpectForm from "../../../../components/PickupExpectForm";
import TransportCompleteForm from "@/components/TransportCompleteForm";
import QuestionAnswerDialog from "../../../../components/QuestionAnswerDialog";

export default {
  name: "ForwardingContractsView",
  layout: "forwarding",
  components: {AppBar, EstimateForm, PaymentConfirmationForm, PickupExpectForm, TransportCompleteForm, QuestionAnswerDialog},
  async asyncData({params, $axios}) {
    const response = await $axios.get('/forwarding/contracts/' + params.id);
    //console.log('data', response.data.data)
    const contract = response.data.data;
    return {contract}
  },
  computed: {
    ...mapGetters(['_CONST_']),
  },
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    async init() {
      const response = await this.$axios.$get('/forwarding/contracts/' + this.contract.id);
      //console.log('data', response.data)
      this.contract = response.data;
    },
    download(id) {
      window.open(`${this.$config.axios.browserBaseURL}/forwarding/contract-files/${id}`);
    },
    async updateContract(status) {
      try {
        if (!confirm("해당스케줄의 상태를 변경 하시겠습니까?")) return false;
        this.errors = {};
        const data = await this.$axios.$put('/forwarding/contracts/'+this.contract.id+'/status/'+status)
        if (data.result) {
          this.showSnackbar({show: true, color: 'success', message: '상태가 변경되었습니다.'});
          this.init();
        } else {
          this.showSnackbar({show: true, color: 'error', message: data.message});
        }
      } catch (e) {
        //console.log(e);
        this.showSnackbar({show: true, color: 'error', message: ''});
      }
    }
  }
}
</script>

<style scoped>
 #tableSet {width: 100%; text-align: center; margin-bottom: 40px;}
 #tableSet td {color: #111;}
 .iconStyle {background: #f1f1f1; border-radius: 50%; padding: 14px; margin-bottom: 10px;}
 .thSize {width: 20%;}
 .tableSet2  {width: 100%; padding: 40px; text-align: left; border-radius: 10px;  border-collapse: collapse;}
 .tableSet2 td { padding: 18px; border-bottom: 1px solid #ddd;}
 .tableSet2 td:first-child {width: 154px;}
 .tableSet2 td:last-child {font-weight: 800;}
 .tableSet2 tr:last-child td {border-bottom: none;}
 .colHeight {padding-top: 20px; margin-bottom: 10px;}
 .colPadding {padding-top: 2px;}
 .minHeight {min-height: 420px;}
 .btnStyle2 {width: 100%; background: #fff!important; border: 1px solid #ddd; padding: 28px 0!important;}

 @media (max-width: 960px) {
   #tableSet { margin-bottom: 0; }
   .dFlex { display: unset !important; }
   .setLeft { width: 100%; }
   .thSize { width: auto !important; }
 }
 @media (max-width: 590px) {
   #tableSet { display: grid; }
 }
</style>
