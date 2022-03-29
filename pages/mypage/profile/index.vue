<template>
  <!-- 내정보수정 -->
    <v-card flat>
        <v-card flat>
          <v-list-item two-line class="left-padding-0">
            <v-list-item-avatar size="130" rounded color="#ddd">
              <v-img class="elevation-6" alt="" src="/images/avater.png"></v-img>
            </v-list-item-avatar>
            <v-list-item-content class="myBtnMa">
              <v-list-item-title class="myBtnBox">
                <v-btn color="primary" dark large elevation="4">프로필 사진 업로드</v-btn>
                <v-btn color="#ff9a52" dark outlined large>프로필 사진 삭제</v-btn>
              </v-list-item-title>
              <p class="myBtnText">이미지는 PNG or JPEG만 가능하며, 파일 최대크기는 1MB이하만 등록 가능 합니다.</p>
            </v-list-item-content>
          </v-list-item>
        </v-card>

        <v-card-text class="pa-0">
          <div class="snsform fontWeight-600">
            <v-icon class="iconMa3">mdi-checkbox-marked-outline</v-icon><span>내회원정보</span>
          </div>

          <v-card class="d-flex form-m" elevation="0">
            <v-text-field prepend-inner-icon="mdi-email-outline" disabled v-model="form.email" :error-messages="errors.email" label="이메일(아이디)" outlined hide-details="auto" class="inpBottom inpRight vinpuT"/>
            <v-text-field prepend-inner-icon="mdi-account"  v-model="form.name" :error-messages="errors.name" label="이름" outlined hide-details="auto" class="inpBottom inpLeft vinpuT"/>
          </v-card>

          <v-card class="d-flex" elevation="0">
            <v-text-field disabled prepend-inner-icon="mdi-phone"  v-model="form.phone" :error-messages="errors.phone" class="inpBottom vinpuT"
                        label="휴대폰번호" persistent-hint hint="휴대폰번호 변경시 인증이 필요 합니다." outlined />&emsp;
            <v-btn large elevation="0" color="primary" height="56" class="inpBottom">휴대폰 번호변경</v-btn>

            <!-- <verification-phone v-if="isChangePhone" ref="verificationPhone" type="R" @update="updateForm"></verification-phone>
            <v-text-field v-else v-model="form.phone" :error-messages="errors.phone" @click:append="isChangePhone = true"
                      readonly label="휴대폰번호" outlined append-icon="mdi-phone-sync-outline"></v-text-field> -->
          </v-card>

            <v-card-actions class="pa-0 btnButton clearBtn justify-center">
            <v-btn :disabled="disabledSave" @click="save" color="primary" large min-width="150" min-height="50" elevation="0"><v-icon>mdi-check</v-icon> 정보수정</v-btn>
            <v-btn  color="primary" outlined large to="/mypage/dashboard" min-width="120" min-height="50"><v-icon>mdi-reply</v-icon> 돌아가기</v-btn>
          </v-card-actions>

        </v-card-text>
      </v-card>
  <!-- 내정보수정 종료 -->
</template>

<script>
import {mapActions} from "vuex";
import DefaultLayout from "../../../layouts/default";
import VerificationPhone from "../../../components/VerificationPhone";

export default {
  name: "myedit",
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
//   name: "myedit",
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
