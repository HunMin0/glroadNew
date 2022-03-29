<template>
  <v-col cols="12" sm="6">
    <app-bar title="스케줄 상세페이지"></app-bar>
    <v-toolbar flat class="mt-2">
      <v-toolbar-title>스케줄 정보</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card tile>
      <v-card-text>
        Busan(KRPUS) - Changsa(CNCSX)<br/>
        2021-12-09 06:00 - 2021-12-09 06:00 (2일 7시간 소요)<br/>
        Dry Container | LCL | 잔여 17CBM<br/>
      </v-card-text>
    </v-card>

    <contract-stepper></contract-stepper>

    <v-card v-if="!isSave" flat class="mt-2">
      <template v-if="!isAgencyDocument">
        <v-card-title> 계약진행을 위해 수출문서 등록이 필요합니다.</v-card-title>
        <v-card-subtitle>pdf,jpg,png파일 첨부가능합니다. 문서확인 후 포워딩사에서 최종견적을 제공드립니다.</v-card-subtitle>
        <v-card-text>
          <v-file-input outlined label="* 수출신고필증(Export Permit)"></v-file-input>
          <v-file-input outlined label="* 인보이스(Invoice)"></v-file-input>
          <v-file-input outlined label="* 패킹리스트(Packing List)"></v-file-input>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn x-large>취소</v-btn>
          <v-btn x-large color="primary" @click="save">서류전송</v-btn>
        </v-card-actions>
        <div class="text-center">
          <small>수출문서 등록대행이 필요하다면? <a href="#" @click="isAgencyDocument = true">서류대행 신청하기</a></small>
        </div>
      </template>
      <template v-else>
        <v-card-title>서류대행 등록을 위해 수출신고필증을 업로드해주세요.</v-card-title>
        <v-card-subtitle>과거 진행했던 인보이스,패킹리스트가 있다면 기타 첨부서류 등록 부탁드립니다.</v-card-subtitle>
        <v-card-text>
          <v-file-input outlined label="* 수출신고필증(Export Permit)"></v-file-input>
          <v-file-input outlined label="기타 첨부서류1(과거 인보이스, 페킹리스트 등)"></v-file-input>
          <v-file-input outlined label="기타 첨부서류2(과거 인보이스, 페킹리스트 등)"></v-file-input>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn x-large>취소</v-btn>
          <v-btn x-large color="primary" @click="save">서류전송</v-btn>
        </v-card-actions>
        <div class="text-center">
          <small><a href="#" @click="isAgencyDocument = false">이전으로 돌아가기</a></small>
        </div>
      </template>
    </v-card>
    <v-card v-else flat class="mt-2">
      <v-card-title> 서류가 정상적으로 접수되었습니다.</v-card-title>
      <v-card-subtitle>최종견적을 기다리고 있습니다. 보완이 필요한 경우 포워딩업체에서 연락드리겠습니다.</v-card-subtitle>
      <v-card-text>
        <v-text-field outlined label="접수코드" value="G2156988"></v-text-field>
        포워딩 담당자 : 김포딩  02-1234-5678
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn x-large>접수취소</v-btn>
        <v-btn x-large color="primary" to="/schedules/1/document">문의하기</v-btn>
      </v-card-actions>
    </v-card>

  </v-col>
</template>

<script>
import AppBar from "../../../components/AppBar";
import ContractStepper from "../../../components/ContractStepper";

export default {
  name: "document",
  components: {ContractStepper, AppBar},
  data: () => ({
    isSave: false,
    isAgencyDocument: false,
  }),
  methods: {
    save() {
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
        setTimeout(() => this.$nuxt.$loading.finish(), 500)
      })
      this.isSave = true;
    }
  }
}
</script>

<style scoped>

</style>
