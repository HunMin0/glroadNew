<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" class="replebtn" elevation="0" title="리뷰답변"><v-icon small>mdi-pencil</v-icon>&nbsp;리뷰답변</v-btn>
      
    </template>
    <v-card class="boxditale">
      <v-card-title class="text-h6 font-weight-bold font-color1"><v-icon color="6c6c6c">mdi-tooltip-text</v-icon>&nbsp; 사용자리뷰 답변하기</v-card-title>
      <v-card-text class="bottom-padding-0">
        <v-textarea :value="form.content" label="사용자리뷰" outlined readonly></v-textarea>
        <v-textarea v-model="form.answer" :error-messages="errors.answer"
                    counter="1000" :rules="[rules.length(1000)]"
                    outlined label="관리자님, 리뷰글에 대한 답변 내용을 입력해주세요." placehoder="답변 내용을 입력하세요."></v-textarea>
      </v-card-text>
      <v-card-actions class="justify-center top-padding-0">

        <v-btn large color="grey darken-1" outlined height="48" elevation="0" @click="dialog = false" width="100">취소</v-btn>
        <v-btn large  color="#3d9cd2" dark height="48" elevation="0" @click="save" width="100">등록</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "ReviewAnswerDialog",
  props: ['id'],
  data: () => ({
    dialog: false,
    form: {},
    errors: {},
    rules: {
      length: len => v => (v || '').length <= len || `문의사항은 ${len}자 이하로 입력하여 주십시오.`,
    }
  }),
  watch: {
    dialog: {
      immediate: true,
      handler(value) {
        if (value) {
          this.init();
        } else {
          this.form = {};
          this.errors = {};
        }
      }
    }
  },
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    async init() {
      const data = (await this.$axios.get('/forwarding/reviews/'+this.id)).data;
      this.form = data;
    },
    save() {
      this.errors = {};
      this.$axios.put('/forwarding/reviews/'+this.id, this.form).then(response => {
        if (response.data.result) {
          this.showSnackbar({show: true, color: 'success', message: '답변이 등록되었습니다.'});
          this.dialog = false
          this.$emit('update');
        } else {
          this.showSnackbar({show: true, color: 'error', message: response.data.message});
        }
      }).catch(error => {
        this.showSnackbar({show: true, color: 'error',
          message: 'Error: ' + error.response.status + '(' + error.response.statusText + ')'
        });
        if (error.response.status === 422) {
          for (let [key, value] of Object.entries(error.response.data.errors)) {
            //console.log(key, value);
            //Vue.set(this.errors, key, true);
            this.$set(this.errors, key, value[0]);
          }
        }
      });
    }
  }
}
</script>

<style scoped>
  .replebtn {background: #f8f8f8!important; border: 1px solid #e7e7e7;padding: 0 10px!important;}
  .boxditale {padding: 18px 10px 22px; border-radius: 10px;}
  .font-color1 {color: #757575;margin-bottom: 10px;}
</style>
