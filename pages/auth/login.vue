<template>
  <v-container class="mypageBg" fluid>
    <v-row class="justify-center content-center">
      <div class="vCardLoginBg">
        <v-col class="pa-0">
          <v-card flat>
            <NuxtLink to="/">
              <div class="loginLogo">
                <img src="/images/logo.png" alt="logo" />
              </div>
            </NuxtLink>
          </v-card>
          <v-card flat>
            <div class="loginTextB">
              <p class="firstTextTitle">글로드에 오신것을 환영합니다! <img src="/images/applause.png" alt="applause" /></p>
              <p class="lastTextTitle">서비스 이용을 위해 계정 로그인을 진행해주세요</p>
            </div>
            <v-card-text class="pa-0">
              <v-text-field v-model="form.email" :error-messages="errors.email" outlined label="Email"
                            hide-details="auto" class="inpBottom vinpuT" placeholder="이메일을 입력해주세요."></v-text-field>
              <v-text-field v-model="form.password" :error-messages="errors.password" hide-details="auto"
                            class="inpBottom vinpuT" outlined label="Password" placeholder="비밀번호를 입력해주세요."
                            @keyup.enter="login" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
                            @click:append="show1 = !show1"></v-text-field>
            </v-card-text>
            <div class="settingBox">
              <!--v-checkbox class="pa-0 ma-0 fText" hide-details="auto" v-model="checkbox" label="Email 저장"></v-checkbox-->
              <router-link to="/auth/password">비밀번호를 잊으셨나요?</router-link>
            </div>
            <v-card-actions class="pa-0">
              <v-btn color="primary" block x-large @click="login">LOGIN</v-btn>
            </v-card-actions>
            <div class="settingBox2">
              <span>아직 회원이 아니신가요?</span>&emsp;<router-link to="/auth/register">회원가입하기</router-link>
            </div>
          </v-card>
          <!--
          <div class="snsform"> <span>or</span> </div>
          <div class="snsSetting">
            <v-btn icon dark><img src="/images/facebook.png" height="24"></v-btn>
            <v-btn icon dark><img src="/images/twitter.png" height="24"></v-btn>
            <v-btn icon dark><img src="/images/google.png" height="24"></v-btn>
            <v-btn icon dark><img src="/images/naver.png" height="24"></v-btn>
          </div>
          -->
          <!-- 작업완료 후 삭제 영역 -->
          <template v-if="!isProduction">
            <div class="closeAction" style="position: fixed; bottom:30px">
              <v-card-actions>
                <a href="#" @click.prevent="loginTest('test@test.com')">(임시)포워딩 로그인</a>&emsp;
                <a href="#" @click.prevent="loginTest('test1@test.com')">(임시)회원 로그인</a>
              </v-card-actions>
            </div>
          </template>
          <!-- 삭제영역 종료 -->
        </v-col>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions} from "vuex";
import Snackbar from "../../components/Snackbar";

export default {
  layout: 'login',
  auth: 'guest',
  data: () => ({
    show1: false,
    password: 'Password',
    rules: {
      required: value => !!value || '비밀번호를 입력해 주세요.',
      min: value => !!value || '비밀번호를 입력해 주세요.',
    },
    checkbox: false,
    form: {},
    errors: {},
    isProduction: process.env.NODE_ENV === 'production'
  }),
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    async loginTest(email) {
      await this.$auth.loginWith('laravelSanctum', {
        data: {
          email: email,
          password: '123456',
        }
      })
    },
    async login() {
      this.errors = {}
      try {
        const response = await this.$auth.loginWith('laravelSanctum', {data: this.form});
      } catch (e) {
        //console.log('error', e.response.data)
        //this.showSnackbar({show: true, color: 'error', message: 'Error: ' + e.response.status + '(' + e.response.statusText + ')'});
        this.showSnackbar({show: true, color: 'error', message: e.response.data.message});
        if (e.response.status === 422) {
          for (let [key, value] of Object.entries(e.response.data.errors)) {
            this.$set(this.errors, key, value[0]);
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  ::v-deep .vinpuT .v-label {color: #969696;}
  ::v-deep .vinpuT .v-input__slot {padding: 0 18px!important;}
  ::v-deep .v-text-field fieldset, .v-text-field .v-input__control, .v-text-field .v-input__slot {border: 1px solid #d4d3d5;}
  ::v-deep .fText .v-label {font-size: 14px;}
  .loginLogo {margin-bottom: 2rem;display: flex;-webkit-box-align: center;align-items: center;-webkit-box-pack: center;justify-content: center;}
  .loginLogo img {height: 58px;}
  .firstTextTitle {margin: 0px 0px 0.375rem;font-size: 1.25rem;line-height: 1.334;color: rgba(58, 53, 65, 0.87);font-weight: 600;}
  .lastTextTitle {font-weight: 400; font-size: 0.875rem; line-height: 1.5; letter-spacing: 0.15px; color: rgba(58, 53, 65, 0.68);}
  .loginTextB {margin-bottom: 1.5rem;}
  .inpBottom {margin-bottom: 16px;}
  .settingBox {font-size: 14px; margin-bottom: 28px; display: flex; -webkit-box-align: center; align-items: center; flex-wrap: wrap; -webkit-box-pack: justify; justify-content: space-between;}
  .settingBox2 {margin: 28px 0; text-align: center; font-size: 14px; color: rgba(58, 53, 65, 0.68);}
  .snsform {flex-shrink: 0; display: flex; white-space: nowrap; text-align: center; border: 0px;  margin-bottom: 14px;}
  .snsform span {display: inline-block; padding-left: calc(0.3rem); padding-right: calc(0.3rem);}
  .snsform::before {position: relative; width: 100%; border-top: thin solid rgba(58, 53, 65, 0.12); top: 50%; content: ""; transform: translateY(50%);}
  .snsform::after {position: relative;  width: 100%; border-top: thin solid rgba(58, 53, 65, 0.12); top: 50%; content: ""; transform: translateY(50%);}
  .snsSetting {display: flex; -webkit-box-align: center; align-items: center; -webkit-box-pack: center; justify-content: center;}
  .firstTextTitle img {height: 28px;}

@media (min-width: 600px){
  .vCardLoginBg {
      width: 448px;
  }

}

</style>
