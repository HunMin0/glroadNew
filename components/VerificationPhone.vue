<template>
  <div>
    <!--append-icon="mdi-cellphone-information" @click:append="getCode"-->
    <v-text-field v-model="form.phone" label="휴대폰번호" type="number" outlined placeholder='"-"없이 숫자만 입력'
                  :hint="hint" :readonly="isGetCode || isVerifiedCode" :error-messages="errors.phone" class="vinpuT">
      <template v-slot:append-outer>
        <v-btn large depressed :disabled="isGetCode" @click="getCode" class="phoneBtn" height="56" dark color="#1d89c9">인증요청</v-btn>
      </template>
    </v-text-field>
    <!--append-icon="mdi-send" @click:append="verify"-->
    <v-text-field v-if="isGetCode" v-model="form.code" label="인증번호를 입력해 주세요." type="number" outlined
                  :suffix="displayLimit" :append-icon="(isVerifiedCode) ? 'mdi-close-circle' : ''" @click:append="resetVerify"
                  :readonly="isVerifiedCode" :error-messages="errors.code">
      <template v-slot:append-outer>
        <v-btn x-large depressed @click="verify">인증하기</v-btn>
      </template>
      <small> -인증번호는 통신사에 따라 최대 3분까지 소요 될 수있습니다.</small>
      <small> -인증번호가 도착하지 않을 경우 ‘인증받기'버튼을 다시 눌러주세요.</small>
    </v-text-field>
  </div>
</template>

<script>
import {mapActions, mapMutations} from "vuex";

export default {
  name: "VerificationPhone",
  props: ['type'],
  data: () => ({
    form: {phone: ''},
    errors: {},
    hint: '',
    isGetCode: false,
    displayLimit: '',
    isVerifiedCode: false,
  }),
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    getCode() {
      if (this.isGetCode) return;
      this.errors = {};
      this.$axios.post('/auth/verify-code/' + this.type, this.form).then(response => {
        if (response.data?.result) {
          this.hint = "인증번호를 발송했습니다.";
          this.isGetCode = true;
        } else {
          this.showSnackbar({show: true, color: 'error', message: response.data.message});
        }
      }).catch(error => {
        this.showSnackbar({show: true, color: 'error',
          message: 'Error: ' + error.response.status + '(' + error.response.data.message + ')'});
        if (error.response.status === 422) {
          for (let [key, value] of Object.entries(error.response.data.errors)) {
            //console.log(key, value);
            //Vue.set(this.errors, key, true);
            this.$set(this.errors, key, value[0]);
          }
        }
      });
    },
    verify() {
      if (this.isVerifiedCode) return;
      this.errors = {};
      this.$axios.post('/auth/verify/' + this.type, this.form).then(response => {
        this.showSnackbar({show: true, color: 'success', message: '인증이 완료되었습니다.'});
        this.isVerifiedCode = true;
        this.$emit('update', this.form);
      }).catch(error => {
        this.showSnackbar({show: true, color: 'error',
          message: 'Error: ' + error.response.status + '(' + error.response.data.message + ')'});
        if (error.response.status === 422) {
          for (let [key, value] of Object.entries(error.response.data.errors)) {
            //console.log(key, value);
            //Vue.set(this.errors, key, true);
            this.$set(this.errors, key, value[0]);
          }
        }
      });
    },
    resetVerify() {
      this.isGetCode = false;
      this.isVerifiedCode = false;
      this.errors = {};
      this.form = {}
      this.$emit('update', this.form);
    }
  }
}
</script>

<style scoped>
  ::v-deep .vinpuT .v-label {color: #969696;}
  ::v-deep .vinpuT .v-input__slot {padding: 0 18px!important;}
  ::v-deep .vinpuT .v-input__append-outer {margin-top: 0!important;}
</style>
