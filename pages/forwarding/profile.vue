<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col class="height100vh">
        <v-row>
          <v-col>
              <div class="vCardBg">
                <v-row>
                  <v-col>
                    <v-list-item three-line>
                      <v-list-item-content>
                        <v-list-item-title class="text-h5 mb-0">
                          <v-icon class="iconMa">mdi-account-box-outline</v-icon> 내 정보관리
                        </v-list-item-title>
                        <v-list-item-subtitle>사용자 정보는 항상 최신으로 업데이트 해주세요.</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-card-actions>
                        <v-btn :disabled="disabledSave" @click="save" block color="primary" class="elevation-0"><v-icon small>mdi-download</v-icon>&nbsp;정보수정</v-btn>
                      </v-card-actions>
                    </v-list-item>
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>
          <v-form>
          <v-row justify="center">
            <v-col cols="12" md="6">
              <div class="vCardBg min-h">
                <v-row>
                  <v-col class="bottom-padding-0">
                    <div class="setting-padding-lr colmar"><v-icon class="iconMa">mdi-ticket-account</v-icon> 계정정보</div>
                  <verification-phone v-if="isChangePhone" ref="verificationPhone" type="R" @update="updateForm"></verification-phone>
                    <v-text-field v-else v-model="form.phone" :error-messages="errors.phone" @click:append="isChangePhone = true"
                                  readonly label="휴대폰번호" outlined append-icon="mdi-phone-sync-outline"></v-text-field>

                    <v-text-field v-model="form.email" :error-messages="errors.email" label="이메일(아이디)" outlined />
                    <v-text-field v-model="form.password" :error-messages="errors.password" label="비밀번호" type="password" outlined
                                  autocomplete="new-password" persistent-hint hint="비밀번호는 8자리이상 입력해주세요." />
                    <v-text-field v-model="form.password_confirmation" :error-messages="errors.password_confirmation"
                                  label="비밀번호 확인" type="password" outlined autocomplete="new-password" />

                    <v-text-field v-model="form.name" :error-messages="errors.name" label="이름" outlined />

                    <div class="setting-padding-lr colmar"><v-icon class="iconMa">mdi-bank</v-icon> 은행정보</div>
                                <v-text-field v-model="form.bank_name" :error-messages="errors.bank_name" label="은행명" outlined />
                            <v-text-field v-model="form.bank_account" :error-messages="errors.bank_account" label="계좌" outlined />
                            <v-text-field v-model="form.bank_owner" :error-messages="errors.bank_owner" label="예금주" outlined />
                  </v-col>
                </v-row>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="vCardBg min-h">
                <v-row>
                  <v-col class="bottom-padding-0">
                    <div class="setting-padding-lr colmar"><v-icon class="iconMa">mdi-domain</v-icon> 회사정보</div>
                  <v-text-field v-model="form.company_name" :error-messages="errors.company_name" label="회사명" outlined />
                      <v-text-field v-model="form.company_founding_date" :error-messages="errors.company_founding_date" type="date" label="설립일" outlined />
                      <v-textarea v-model="form.company_desc" :error-messages="errors.company_desc" label="소개글" outlined />
                      <v-text-field v-model="form.telephone" :error-messages="errors.telephone" label="전화번호" outlined />
                      <v-text-field v-model="form.address" :error-messages="errors.address" label="사업장주소" outlined />
                      <v-text-field v-model="form.address_detail" :error-messages="errors.address_detail" label="사업장주소 상세" outlined />
                      <v-text-field v-model="form.business_registration_number" :error-messages="errors.business_registration_number"
                                    label="사업자등록번호" placeholder='"-"없이 숫자만 입력' outlined />
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>
          </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions} from "vuex";
import AppBar from "../../components/AppBar";
import VerificationPhone from "../../components/VerificationPhone";

export default {
  name: "profile",
  layout: "forwarding",
  components: {AppBar, VerificationPhone},
  async asyncData({params, $axios}) {
    const response = await $axios.get('/forwarding/profile');
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
    /*download() {
      window.open(`${this.$config.axios.browserBaseURL}/forwarding/business-registration-file`);
    },
    async removeFile() {
      const response = await this.$axios.delete('/forwarding/business-registration-file');
      if (response.data.result) {
        this.form.business_registration_file_name = null;
      }
    },*/
    async save() {
      try {
        this.errors = {};
        /*let formData = new FormData();
        for (var key in this.form) {
          formData.append(key, this.form[key]);
        }
        const response = await this.$axios.post('/forwarding/profile', formData, {headers: {'Content-Type': 'multipart/form-data'}});*/
        const response = await this.$axios.put('/forwarding/profile', this.form);
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
</script>

<style scoped>
.colmar {margin: 10px 0 25px;}
.min-h {min-height: 840px;}
@media (max-width: 960px){
  .min-h {min-height: auto;}
}
</style>
