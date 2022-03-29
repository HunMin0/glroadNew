<template>
  <div>
    <v-toolbar flat class="mt-2">
      <v-toolbar-title>진행단계</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-stepper alt-labels v-model="step">
      <v-stepper-header>
        <v-stepper-step step="1">접수</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2">결제</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">픽업</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="4">운송</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="5">도착</v-stepper-step>
      </v-stepper-header>
    </v-stepper>


    <template v-if="contract.status === _CONST_.STATUS_ORDER_PLACED">
      <v-card flat class="mt-2">
        <v-card-title>서류가 정상적으로 접수되었습니다.</v-card-title>
        <v-card-text>
          ※ 최종견적을 기다리고 있습니다.<br/>
          ※ 보완이 필요한 경우 포워딩업체에서 연락드리겠습니다.<br/>
          <br/>
          ※ 접수번호: {{contract.code}} <br/>
          ※ 포워딩 담당자: {{forwardingInfo}}
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn>접수취소</v-btn>&nbsp;
        </v-card-actions>
      </v-card>
    </template>

    <template v-if="contract.status === _CONST_.STATUS_ESTIMATE_ISSUANCE_ID || contract.status === _CONST_.STATUS_SIGNATURE_COMPLETED_ID">
      <v-card flat class="mt-2">
        <v-card-title>
          주문이 완료되어 최종견적이 도착하였습니다.<br/>
          견적서와 계약서를 확인해주세요.
        </v-card-title>
        <v-card-text>
          ※ 본 견적은 아래 견적 마감시간까지 유효합니다.<br/>
          ※ 미응답으로 인한 취소사유는 페널티가 발생할 수 있습니다.<br/>
          ※ 글로드 고객센터 02)1234-5678<br/>
        </v-card-text>
      </v-card>

      <v-card class="mt-2">
        <v-card-title>수출 견적서</v-card-title>
        <v-card-subtitle>접수번호 {{contract.code}}</v-card-subtitle>
        <v-card-text>
          <v-row>
            <v-col class="text-right"> 견적발송시간 {{$dayjsFormat(contract.estimated_at)}}<br/> </v-col>
          </v-row>
          <v-row>
            <v-col>운송수수료</v-col>
            <v-col class="text-right">{{Number(contract.price).toLocaleString()}}원</v-col>
          </v-row>
          <v-row>
            <v-col>픽업비용</v-col>
            <v-col class="text-right">{{Number(contract.pickup_price).toLocaleString()}}원</v-col>
          </v-row>
          <v-row>
            <v-col>서류대행료</v-col>
            <v-col class="text-right">{{Number(contract.document_agency_price).toLocaleString()}}원</v-col>
          </v-row>
          <v-row>
            <v-col>최종 견적금액</v-col>
            <v-col class="text-right">{{Number(contract.total_price).toLocaleString()}}원</v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea :value="contract.notice" label="전달사항" outlined readonly hide-details/>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="red--text"> 결제마감시간
              {{ $dayjsFormat(contract.payment_deadline_datetime) }}
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <small>견적 담당자: {{forwardingInfo}}</small>

        <template v-if="contract.status === _CONST_.STATUS_SIGNATURE_COMPLETED_ID">
        <v-card class="mt-2">
          <v-card-title>결제정보</v-card-title>
          <v-card-text>
            <v-row>
              <v-col>입급자명</v-col>
              <v-col class="text-right">{{contract.member.name}}</v-col>
            </v-row>
            <v-row>
              <v-col>입금계좌</v-col>
              <v-col class="text-right">기업은행 123-456789-123 주식회사 글로드</v-col>
            </v-row>
            <v-row>
              <v-col>금액</v-col>
              <v-col class="text-right">{{Number(contract.total_price).toLocaleString()}}원</v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            ※ 반드시 입금자명과 결제금액을 동일하게 처리부탁드립니다. (띄워쓰기 포함)<br/>
            ※ 결제확인까지 최대 30분이 소요될 수 있으며, 입금자명과 금액이 다른 경우 글로드 고객센터로 문의바랍니다.<br/>
          </v-card-text>
        </v-card>
        </template>

      <v-card-actions class="justify-center">
        <question-dialog type="contract" :id="contract.id"></question-dialog>&nbsp;
        <v-btn>취소요청</v-btn>&nbsp;
        <contract-form :contract="contract" @update="$emit('update')"></contract-form>
      </v-card-actions>
    </template>

    <template v-if="contract.status === _CONST_.STATUS_PAYMENT_COMPLETED_ID">
      <template v-if="contract.is_pickup === 'Y'">
        <v-card flat class="mt-2">
          <v-card-title>결제가 완료되어, 픽업 대기중입니다.</v-card-title>
          <v-card-text>
            <span class="red--text">※ 픽업예정일시 : {{ $dayjsFormat(contract.pickup_expected_at) }}</span><br/>
            ※ 픽업이 완료되면, 다음단계로 넘어갑니다.<br/>
          </v-card-text>
          <v-card class="mt-2">
            <v-card-title>픽업정보</v-card-title>
            <v-card-text>
              ※ 픽업 담당자 : {{ forwardingInfo }}<br/>
              ※ 픽업창고주소 : {{contract.address}} {{contract.address_detail}}
            </v-card-text>
          </v-card>
          <v-card-actions class="justify-center">
            <v-btn>접수취소</v-btn>&nbsp;
            <question-dialog type="contract" :id="contract.id"></question-dialog>&nbsp;
          </v-card-actions>
        </v-card>
      </template>
      <template v-else>
        <v-card flat class="mt-2">
          <v-card-title>결제가 완료되어, 입고 대기중입니다.</v-card-title>
          <v-card-text>
            <span class="red--text">※ 입고만료일시: {{$dayjsFormat(contract.schedule.warehouse_deadline_date)}}</span><br/>
            ※ 입고가 완료되면, 다음단계로 넘어갑니다.<br/>
          </v-card-text>
          <v-card class="mt-2">
            <v-card-title>입고정보</v-card-title>
            <v-card-text>
              ※ 포워딩 담당자 : {{forwardingInfo}}
              ※ 입고창고주소 : {{ contract.schedule.address }} {{ contract.schedule.address_detail }}
            </v-card-text>
          </v-card>
          <v-card-actions class="justify-center">
            <v-btn>접수취소</v-btn>&nbsp;
            <question-dialog type="contract" :id="contract.id"></question-dialog>&nbsp;
          </v-card-actions>
        </v-card>
      </template>
    </template>

    <template v-if="contract.status === _CONST_.STATUS_WAREHOUSE_ARRIVAL_ID">
      <v-card flat class="mt-2">
        <v-card-title>상품이 물류창고에 정상적으로 도착하였습니다.</v-card-title>
        <v-card-text>
          ※ 선적/출항하는대로 다시 안내드리겠습니다.
        </v-card-text>
        <v-card class="mt-2">
          <v-card-text>
            ※ 포워딩 담당자 : {{forwardingInfo}}
          </v-card-text>
        </v-card>
        <v-card-actions class="justify-center">
          <v-btn>접수취소</v-btn>&nbsp;
          <question-dialog type="contract" :id="contract.id"></question-dialog>&nbsp;
        </v-card-actions>
      </v-card>
    </template>

    <template v-if="contract.status === _CONST_.STATUS_TRANSPORT_DEPARTED_ID">
      <v-card flat class="mt-2">
        <v-card-title>상품이 목적지로 출발하였습니다.</v-card-title>
        <v-card-text>
          <span class="red--text">※ 도착예정일시 :
            {{ $dayjsFormat(contract.schedule.arrival_date + ' ' + contract.schedule.arrival_time) }}
          </span><br/>
          ※ 안전한 배송을 약속드리며, 도착하는대로 다시 안내드리겠습니다.<br/>
        </v-card-text>
        <v-card class="mt-2">
          <v-card-text>
            ※ 포워딩 담당자 : {{forwardingInfo}}
          </v-card-text>
        </v-card>
        <v-card-actions class="justify-center">
          <v-btn>접수취소</v-btn>&nbsp;
          <question-dialog type="contract" :id="contract.id"></question-dialog>&nbsp;
        </v-card-actions>
      </v-card>
    </template>

    <template v-if="contract.status === _CONST_.STATUS_TRANSPORT_COMPLETED_ID">
      <v-card flat class="mt-2">
        <v-card-title>{{contract.schedule.pod_fullname}}에 화물이 도착했습니다.</v-card-title>
        <v-card-text>
          <span class="red--text">※ 도착일시 : {{ $dayjsFormat(contract.arrived_at) }}
          </span><br/>
          ※ 현지 도착확인 확인 후 구매확정 바랍니다..<br/>
        </v-card-text>
        <v-card class="mt-2">
          <v-card-text>
            ※ 포워딩 담당자 : {{forwardingInfo}}
          </v-card-text>
        </v-card>
        <v-card-actions class="justify-center">
          <question-dialog type="contract" :id="contract.id"></question-dialog>&nbsp;
          <v-btn color="primary" @click="updateContract(_CONST_.STATUS_PURCHASE_CONFIRMATION_ID)">구매확정</v-btn>&nbsp;
        </v-card-actions>
      </v-card>
    </template>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ContractForm from "./ContractForm";
import QuestionDialog from "./QuestionDialog";
export default {
  name: "ContractStepper",
  components: {QuestionDialog, ContractForm},
  props: ['contract'],
  computed: {
    ...mapGetters(['_CONST_']),
    /*estimateCreatedAt() {
      const idx = this.contract.histories.findIndex(e => e.status === this._CONST_.STATUS_ESTIMATE_ISSUANCE_ID);
      if (idx >= 0) {
        return this.$dayjsFormat(this.contract.histories[idx].created_at)
      }
      return '';
    },*/
    forwardingInfo() {
      return `${this.contract.schedule.forwarding.name} ${this.contract.schedule.forwarding.phone}`
    },
    step() {
      let result = 1;
      switch(this.contract.status) {
          case this._CONST_.STATUS_ORDER_PLACED:
            result = 1; break;
          case this._CONST_.STATUS_ESTIMATE_ISSUANCE_ID:
            result = 1; break;
          case this._CONST_.STATUS_SIGNATURE_COMPLETED_ID:
            result = 2; break;
          case this._CONST_.STATUS_PAYMENT_COMPLETED_ID:
            result = 3; break;
          case this._CONST_.STATUS_WAREHOUSE_ARRIVAL_ID:
            result = 3; break;
          case this._CONST_.STATUS_TRANSPORT_DEPARTED_ID:
            result = 4; break;
          case this._CONST_.STATUS_TRANSPORT_COMPLETED_ID:
            result = 5; break;
          case this._CONST_.STATUS_PURCHASE_CONFIRMATION_ID:
            result = 5; break;
      }

      return result;
    }
  },
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    async updateContract(status) {
      try {
        this.errors = {};
        const data = await this.$axios.$put('/contracts/' + this.contract.id + '/status/' + status)
        if (data.result) {
          this.showSnackbar({show: true, color: 'success', message: '상태가 변경되었습니다.'});
          this.$emit('update')
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

</style>
