<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" elevation="0" outlined color="#818181"><v-icon small class="bmt">mdi-relative-scale</v-icon>&nbsp;문의하기</v-btn>
    </template>
    <v-card class="boxditale">
       <v-card-title class="text-h6 font-weight-bold font-color1"><v-icon color="6c6c6c">mdi-tooltip-text</v-icon>&nbsp; 문의하기</v-card-title>
       <v-card-text class="bottom-padding-0">
        <v-textarea v-model="form.content" :error-messages="errors.content"
                    counter="1000" :rules="[rules.length(1000)]"
                    outlined placehoder="문의하실 내용을 입력하세요."></v-textarea>
      </v-card-text>
      <v-card-subtitle>
        -문의하신 내용에 대한 답변은 마이페이지>문의내역에서 확인 하실 수 있습니다.<br/>
        -글로드 서비스 이용과 관련없는 (광고,비방,욕설 등) 내용을 문의 게시글로 남길 시 별도의 통보없이 이용제한 및 게시글이 삭제 조치 될 수 있습니다.<br/>
      </v-card-subtitle>
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
  name: "QuestionDialog",
  props: {
    type: {
      type: String,
      default: 'contract',
      validator: function (value) {
        return ['contract', 'schedule', 'forwarding'].indexOf(value) !== -1
      }
    },
    id: {
      type: Number,
    }
  },
  data: () => ({
    dialog: false,
    form: {},
    errors: {},
    rules: {
      length: len => v => (v || '').length <= len || `문의사항은 ${len}자 이하로 입력하여 주십시오.`,
    }
  }),
  watch: {
    dialog() {
      this.form = {};
      this.errors = {};
    }
  },
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    save() {
      this.form['type'] = this.type;
      this.form['questionable_id'] = this.id;
      this.errors = {};
      this.$axios.post('/questions', this.form).then(response => {
        if (response.data.result) {
          this.showSnackbar({show: true, color: 'success', message: '문의사항이 등록되었습니다.'});
          this.$emit('update');
          this.dialog = false
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
