<template>
  <!-- 비밀번호 수정 -->
    <v-card flat class="cardTopMargin">
        <v-card-text class="pa-0">
          <v-card elevation="0">
            <v-text-field prepend-inner-icon="mdi-lock-outline" label="현재 비밀번호" outlined class="vinpuT" autocomplete="new-password"
                        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"  :rules3="[rules3.required, rules3.min]" :type="show3 ? 'text' : 'password'"  @click:append="show3 = !show3"
                        />
              <v-text-field prepend-inner-icon="mdi-lock-open-outline" v-model="form.password" :error-messages="errors.password" label="새비밀번호" outlined class="vinpuT"
                        autocomplete="new-password" persistent-hint hint="비밀번호는 8자리이상 입력해주세요."
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"  :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"  @click:append="show1 = !show1"
                        />
              <v-text-field prepend-inner-icon="mdi-lock-open-outline" v-model="form.password_confirmation" :error-messages="errors.password_confirmation" class="vinpuT"
                        label="새비밀번호 확인"  outlined autocomplete="new-password"
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"  :rules2="[rules2.required, rules2.min]" :type="show2 ? 'text' : 'password'"  @click:append="show2 = !show2"
                        />
          </v-card>
            <v-card-actions class="pa-0 btnButton clearBtn justify-center">
            <v-btn :disabled="disabledSave" @click="save" color="primary" large min-width="150"  min-height="50" elevation="0"><v-icon>mdi-check</v-icon> 비밀번호 수정</v-btn>
            <v-btn  color="primary" outlined large to="/mypage/dashboard" min-width="100" min-height="50"><v-icon>mdi-reply</v-icon> 돌아가기</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
  <!-- 비밀번호 종료 -->
</template>

<script>
import {mapActions} from "vuex";
import DefaultLayout from "../../../layouts/default";
import VerificationPhone from "../../../components/VerificationPhone";

export default {
  name: "editpassword",
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

    show1: false,
    show2: false,
    show3: false,
    password: 'Password',
    rules: {
      required: value => !!value || '비밀번호를 입력해 주세요.',
    },
     rules2: {
      required: value => !!value || '비밀번호를 다시 확인해 주세요.',
    },
     rules3: {
      required: value => !!value || '비밀번호를 입력해 주세요.',
    },
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
//   name: "editpassword",
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
