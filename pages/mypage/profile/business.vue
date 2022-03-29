<template>
  <!-- 사업자정보 수정 -->
    <v-card flat class="cardTopMargin">
      <v-card-text class="pa-0">
        <v-card class="d-flex form-m" elevation="0">
          <v-text-field prepend-inner-icon="mdi-playlist-check" disabled v-model="form.company_name" :error-messages="errors.company_name" label="회사명" outlined hide-details="auto" class="inpBottom inpRight vinpuT"/>
          <v-text-field prepend-inner-icon="mdi-home-modern" v-model="form.address" :error-messages="errors.address" label="사업장주소" outlined hide-details="auto" class="inpBottom inpLeft vinpuT"/>
        </v-card>
        <v-card class="d-flex" elevation="0">
          <v-text-field disabled prepend-inner-icon="mdi-clipboard-outline"  v-model="form.business_registration_number" :error-messages="errors.business_registration_number" class="inpBottom vinpuT"
                      label="사업자등록번호" persistent-hint hint="사업자 변경시 사업자등록증을 첨부하여 주세요. 인증 후 변경 처리 됩니다." outlined />&emsp;

          <!-- 등록되어있는 사업자사번 첨부파일 이름 노출 -->
          <v-text-field disabled prepend-inner-icon="mdi-paperclip"  class="inpBottom vinpuT"
                        label="사업자사본첨부 유/무" outlined />&emsp;

          <!-- <template v-if="form.business_registration_file_name">
            <v-input prepend-icon="mdi-cloud-download-outline" @click:prepend="download" append-icon="mdi-close" @click:append="removeFile">
              {{form.business_registration_file_name}}
            </v-input>
          </template>

          <v-file-input v-else v-model="form.business_registration_file" :error-messages="errors.business_registration_file"
                outlined accept="image/*,.pdf" label="사업자등록증" />
          -->
          <v-btn large elevation="0" color="primary" height="56" class="inpBottom">사업자등록증 변경</v-btn>
        </v-card>
          <v-card-actions class="pa-0 btnButton clearBtn justify-center">
          <v-btn :disabled="disabledSave" @click="save" color="primary" large min-width="150"  min-height="50" elevation="0"><v-icon>mdi-check</v-icon> 회사정보 수정</v-btn>
          <v-btn  color="primary" outlined large to="/mypage/dashboard" min-width="100" min-height="50"><v-icon>mdi-reply</v-icon> 돌아가기</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  <!-- 사업자정보 종료 -->
</template>

<script>
import {mapActions} from "vuex";
import DefaultLayout from "../../../layouts/default";
import VerificationPhone from "../../../components/VerificationPhone";

export default {
  name: "business",
  auth: true,
  components: {DefaultLayout, VerificationPhone},
  async asyncData({params, $axios}) {
    const response = await $axios.get('/mypage/profile');
    //console.log('data', response.data)
    return {...response.data}
  },
  computed: {
    /*disabledSave() {
      return !(this.form.phone && this.form.code);
    }*/
    disabledSave() {
      return this.isChangePhone && !(this.form.phone && this.form.code);
    }
  },
  data: () => ({
    //form: {},
    errors: {},
    isChangePhone: false,
  }),
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    updateForm(form) {
      //this.form = {...form};
      //this.$set(this, 'form', {...form});
      this.$set(this.form, 'phone', form.phone);
      this.$set(this.form, 'code', form.code);
    },
    download() {
      window.open(`${this.$config.axios.browserBaseURL}/mypage/business-registration-file`);
    },
    async removeFile() {
      const response = await this.$axios.delete('/mypage/business-registration-file');
      if (response.data.result) {
        this.form.business_registration_file_name = null;
      }
    },
    async save() {
      try {
        this.errors = {};
        let formData = new FormData();
        for (var key in this.form) {
          formData.append(key, this.form[key]);
        }
        const response = await this.$axios.post('/mypage/profile', formData, {headers: {'Content-Type': 'multipart/form-data'}});
        //console.log(response.data.result);
        if (response.data.result) {
          this.showSnackbar({show: true, color: 'success', message: '정보가 변경되었습니다.'});
          this.form = response.data.data;
        } else {
          this.showSnackbar({show: true, color: 'error', message: response.data.message});
        }
      } catch (e) {
        this.showSnackbar({show: true, color: 'error', message: 'Error'});
        if (e.response.status === 422) {
          for (let [key, value] of Object.entries(e.response.data.errors)) {
            this.$set(this.errors, key, value[0]);
          }
        }
      }
    }
  }
}
// export default {
//   name: "business",
//   mounted() {
//     //console.log('mounted reviews');
//     this.init();
//   },
//   data: () => ({
//     errors: {}
//   }),
//   methods: {
//     async init() {
//       const response = await this.$axios.get('/dashboard/myedit');
//       this.items = response.data.data.items;
//     }
//   }
// }
</script>

<style scoped>
.cardTopMargin {margin-top: 40px;}
.myBtnBox {margin-bottom: 24px;}
.myBtnMa {margin-left: 10px;}
.myBtnBox button {margin-right: 14px;}
.myBtnText {font-weight: 400; font-size: 0.875rem; line-height: 1.5; letter-spacing: 0.15px; color: rgba(58, 53, 65, 0.68);}
.snsform {flex-shrink: 0; display: flex; white-space: nowrap; text-align: center; border: 0px;  margin: 14px 0;}
.snsform span {display: inline-block; padding-left: calc(0.3rem); padding-right: calc(1rem);}
.snsform::before {position: relative; width: 1%;top: 50%; content: ""; transform: translateY(50%);}
.snsform::after {position: relative;  width: 100%; border-top: thin solid rgba(58, 53, 65, 0.12); top: 50%; content: ""; transform: translateY(50%);}
.form-m {margin-bottom: 10px;}
.inpBottom {margin: 8px 0;}
.inpRight {margin-right: 8px;}
.inpLeft {margin-left: 8px;}
.clearBtn {margin: 30px 0 10px;}
@media (max-width: 590px){
  .myBtnBox button {width: 100%; display: block; margin-right: 0;}
  .myBtnBox:first-child button {margin-bottom: 10px;}
}
</style>
