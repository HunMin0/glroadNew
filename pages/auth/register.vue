<template>
  <v-container class="mypageBg" fluid>
    <v-row class="justify-center content-center">
      <div class="vCardLoginBg joinMargin">
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
              <p class="firstTextTitle">간편하고 빠른 소화물 수출, 글로드 <img src="/images/helping-hand.png" alt="padlock" /></p>
              <p class="lastTextTitle">글로드는 안전하고 원활한 서비스 제공을 위해 회원가입 시 '관리자 승인'후에 이용이 가능합니다.</p>
            </div>
            <v-form>
               <v-card-text class="pa-0">
                  <div class="snsform fontWeight-600">
                    <v-icon class="iconMa3">mdi-checkbox-marked-outline</v-icon><span>본인인증</span>
                  </div>
                  <verification-phone type="R" @update="updateForm"></verification-phone>
              </v-card-text>

              <v-card-text class="pa-0">
                <div class="snsform fontWeight-600">
                  <v-icon class="iconMa3">mdi-checkbox-marked-outline</v-icon><span>계정정보</span>
                </div>

                <v-text-field v-model="form.email" :error-messages="errors.email" label="이메일(아이디)" outlined  hide-details="auto" class="inpBottom vinpuT"/>
                <v-text-field v-model="form.password" :error-messages="errors.password" label="비밀번호" outlined
                              class="vinpuT"
                              autocomplete="new-password" persistent-hint hint="비밀번호는 8자리이상 입력해주세요."
                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'"
                              @click:append="show1 = !show1"/>
                <v-text-field v-model="form.password_confirmation" :error-messages="errors.password_confirmation"
                              class="vinpuT"
                              label="비밀번호 확인" outlined autocomplete="new-password"
                              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :type="show2 ? 'text' : 'password'"
                              @click:append="show2 = !show2"/>
              </v-card-text>

              <v-card-text class="pa-0">
                <div class="snsform fontWeight-600"> <v-icon class="iconMa3">mdi-checkbox-marked-outline</v-icon><span>회원정보</span> </div>
                <v-text-field prepend-inner-icon="mdi-account" v-model="form.name" :error-messages="errors.name"
                              label="이름" outlined hide-details="auto" class="inpBottom vinpuT"/>
                <v-text-field prepend-inner-icon="mdi-domain" v-model="form.company_name"
                              :error-messages="errors.company_name" label="회사명" outlined hide-details="auto"
                              class="inpBottom vinpuT"/>
                <v-text-field prepend-inner-icon="mdi-map-marker" v-model="form.address"
                              :error-messages="errors.address" label="사업장주소" outlined hide-details="auto"
                              class="inpBottom vinpuT"/>
                <v-text-field prepend-inner-icon="mdi-file-plus" v-model="form.business_registration_number"
                              :error-messages="errors.business_registration_number" hide-details="auto"
                              class="inpBottom vinpuT"
                              label="사업자등록번호" placeholder='"-"없이 숫자만 입력' outlined/>
                <v-file-input prepend-icon="" prepend-inner-icon="mdi-paperclip" v-model="form.business_registration_file" :error-messages="errors.business_registration_file" class="inpBottom vinpuT"
                              outlined accept="image/*,.pdf" label="사업자등록증" persistent-hint hint="사업자등록증을 첨부하여 주세요." />

                <!--v-card elevation="0" class="pa-0 ma-0 d-flex">
                <v-file-input disabled prepend-icon="" prepend-inner-icon="mdi-paperclip" v-model="form.business_registration_file" :error-messages="errors.business_registration_file" class="inpBottom vinpuT"
                              outlined accept="image/*,.pdf" label="사업자등록증" persistent-hint hint="사업자등록증을 첨부하여 주세요." />
                 <v-text-field disabled prepend-inner-icon="mdi-paperclip"  v-model="form.business_registration_number" :error-messages="errors.business_registration_number" class="inpBottom vinpuT"
                              label="사업자등록증" persistent-hint hint="사업자등록증을 첨부하여 주세요." outlined />&emsp;
                <v-btn large elevation="0" color="primary" height="56">첨부파일</v-btn>
                </v-card-->
              </v-card-text>

              <v-card-text class="pa-0">
                  <div class="snsform fontWeight-600">
                    <v-icon class="iconMa3">mdi-checkbox-marked-outline</v-icon><span>약관정보</span>
                  </div>
                  <div class="checBox">
                    <v-checkbox v-model="form.is_agree_terms" :error-messages="errors.is_agree_terms"
                        append-icon="mdi-magnify" @click:append="dialogAgree('terms')" label="(필수) 이용약관 동의"
                        hide-details />
                    <v-checkbox v-model="form.is_agree_privacy" :error-messages="errors.is_agree_privacy"
                                append-icon="mdi-magnify" @click:append="dialogAgree('privacy')"
                                label="(필수) 개인정보 취급방침 동의" hide-details />
                    <v-checkbox v-model="form.is_agree_marketing" :error-messages="errors.is_agree_marketing"
                                true-value="Y" false-value="N" label="(선택) 마케팅 정보 수신 동의" hide-details />
                  </div>
              </v-card-text>

              <v-card-actions class="pa-0 btnButton">
                <v-btn :disabled="disabledSave" @click="save" color="primary" block x-large>회원가입</v-btn>
              </v-card-actions>
              <div class="settingBox2">
                <span>이미 계정이 있으신가요?</span>&emsp;<router-link to="/auth/login">로그인하기</router-link>
              </div>
              <!--
              <div class="snsform2"> <span>or</span> </div>
              <div class="snsSetting">
                <v-btn icon dark><img src="/images/facebook.png" height="24"></v-btn>
                <v-btn icon dark><img src="/images/twitter.png" height="24"></v-btn>
                <v-btn icon dark><img src="/images/google.png" height="24"></v-btn>
                <v-btn icon dark><img src="/images/naver.png" height="24"></v-btn>
              </div>
              -->
            </v-form>
          </v-card>

          <div class="forwardingJoin content-center2 justify-center">
              <p class="bottom-margin-0 bottomFont"><v-icon color="#fff">mdi-ferry</v-icon>&nbsp; 포워딩 회원사 가입은 제휴문의를 통해 가입하실 수 있습니다.</p>
              <v-btn to="/contactus" color="#066ea5" dark elevation="0"><v-icon small>mdi-lightbulb-outline</v-icon>&nbsp;제휴문의 바로가기</v-btn>
          </div>
          <v-card flat>
            <v-dialog v-model="dialog" width="500">
              <!--<template v-slot:activator="{ on, attrs }"> <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on" > Click Me </v-btn> </template>-->
              <v-card>
                <v-card-title class="text-h5 grey lighten-2">{{dialogTitle}}</v-card-title>
                <v-card-text> <v-textarea :value="dialogContent" auto-grow></v-textarea> </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="" text @click="dialog = false"> 닫기 </v-btn>
                  <v-btn color="primary" text @click="dialogAgreeClose"> 동의 </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>

        </v-col>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import AppBar from "../../components/AppBar";
import VerificationPhone from "../../components/VerificationPhone";
import {mapActions} from "vuex";

export default {
  name: "register",
  auth: 'guest',
  layout: 'login',
  components: {AppBar, VerificationPhone},
  computed: {
    disabledSave() {
      return !(this.form.phone && this.form.code);
    }
  },
  data: () => ({
    show1: false,
    show2: false,
    password: 'Password',
    /*rules: {
      required: value => !!value || '비밀번호를 입력해 주세요.',
    },
    rules2: {
      required: value => !!value || '비밀번호를 다시 확인해 주세요.',
    },*/
    dialog: false,
    form: {},
    errors: {},
    dialogTitle: '',
    dialogContent: '',
    terms: ``,
    privacy: ``
  }),
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    dialogAgree(type) {
      if (type === 'terms') {
        this.dialogTitle = '이용약관';
        this.dialogContent = this.terms;
      }
      if (type === 'privacy') {
        this.dialogTitle = '개인정보 취급방침';
        this.dialogContent = this.privacy;
      }
      this.dialog = true;
    },
    dialogAgreeClose() {
      if (this.dialogTitle === '이용약관') {
        this.form.is_agree_terms = true;
      }
      if (this.dialogTitle === '개인정보 취급방침') {
        this.form.is_agree_privacy = true;
      }
      this.dialog = false;
    },
    updateForm(form) {
      //this.form = {...form};
      //this.$set(this, 'form', {...form});
      this.$set(this.form, 'phone', form.phone);
      this.$set(this.form, 'code', form.code);
    },
    async save() {
      try {
        this.errors = {};
        let formData = new FormData();
        for (var key in this.form) {
          formData.append(key, this.form[key]);
        }
        const response = await this.$axios.post('/register', formData, {headers: {'Content-Type': 'multipart/form-data'}});
        //console.log(response.data.result);
        if (response.data.result) {
          this.$router.push('/');
        } else {
          this.showSnackbar({show: true, color: 'error', message: response.data.message});
        }
      } catch (e) {
        this.showSnackbar({ show: true, color: 'error',
          message: 'Error: ' + e.response.status + '(' + e.response.statusText + ')' });
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
.loginTextB {margin-bottom: 2rem;}
.inpBottom {margin-bottom: 16px;}
.settingBox {font-size: 14px; margin-bottom: 28px; display: flex; -webkit-box-align: center; align-items: center; flex-wrap: wrap; -webkit-box-pack: justify; justify-content: space-between;}
.settingBox2 {margin: 28px 0; text-align: center; font-size: 14px; color: rgba(58, 53, 65, 0.68);}
.snsform {flex-shrink: 0; display: flex; white-space: nowrap; text-align: center; border: 0px;  margin: 14px 0;}
.snsform span {display: inline-block; padding-left: calc(0.3rem); padding-right: calc(1rem);}
.snsform::before {position: relative; width: 1%;top: 50%; content: ""; transform: translateY(50%);}
.snsform::after {position: relative;  width: 100%; border-top: thin solid rgba(58, 53, 65, 0.12); top: 50%; content: ""; transform: translateY(50%);}
.snsSetting {display: flex; -webkit-box-align: center; align-items: center; -webkit-box-pack: center; justify-content: center;}
.firstTextTitle img {height: 28px;}
.snsform2 {flex-shrink: 0; display: flex; white-space: nowrap; text-align: center; border: 0px;  margin-bottom: 14px;}
.snsform2 span {display: inline-block; padding-left: calc(0.3rem); padding-right: calc(0.3rem);}
.snsform2::before {position: relative; width: 100%; border-top: thin solid rgba(58, 53, 65, 0.12); top: 50%; content: ""; transform: translateY(50%);}
.snsform2::after {position: relative;  width: 100%; border-top: thin solid rgba(58, 53, 65, 0.12); top: 50%; content: ""; transform: translateY(50%);}
.btnButton {margin-top: 40px;}
.checBox {padding-left: 3px;}
.joinMargin {margin: 20px 0 140px;}
.forwardingJoin {position: fixed; left: 0; right: 0; bottom: 0px; height: 70px; background: #1f8bca;border-top: 4px solid#6ab0d7;}
.bottomFont {color: #fff; font-weight: 600; margin-right: 18px;}
@media (min-width: 600px){
  .vCardLoginBg {
      width: 448px;
  }
}
</style>
