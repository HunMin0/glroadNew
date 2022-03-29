<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" elevation="0" outlined color="#818181"><v-icon small class="bmt">mdi-relative-scale</v-icon>&nbsp;서류추가</v-btn>
    </template>
    <v-card class="boxditale">
      <v-card-title class="text-h6 font-weight-bold font-color1">
        <v-icon color="6c6c6c">mdi-tooltip-text</v-icon>&nbsp;서류추가
      </v-card-title>
      <v-card-subtitle>
        -첨부서류가 증빙내역에 없는 경우, ‘기타서류'로 등록해주세요.<br/>
        -추가버튼을 클릭하여 여러서류를 한번에 등록하실 수 있습니다.
      </v-card-subtitle>
      <v-card-text class="bottom-padding-0">
        <template v-for="(item, i) in form.files">
        <v-input hide-details>
          <template v-slot:prepend><v-select v-model="form.files[i].type" :error-messages="errors.files[i].type" :items="typeItems" label="서류종류" outlined /> </template>
          <v-file-input prepend-icon=""
            v-model="form.files[i].file" :error-messages="errors.files[i].file"
            outlined accept="image/*,.pdf" label="서류추가"
            :append-outer-icon="i === 0 ? `mdi-plus`: `mdi-minus`" @click:append-outer="addFileInput(i)"/>
        </v-input>
        </template>
      </v-card-text>
      <v-card-actions class="justify-center top-padding-0">
        <v-btn large color="grey darken-1" outlined height="48" elevation="0" @click="dialog = false" width="100">취소</v-btn>
        <v-btn large color="#3d9cd2" dark height="48" elevation="0" @click="save" width="100">등록</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "ContractFileDialog",
  async fetch() {
    const data = (await this.$axios.get('/contract-files/init')).data;
    this.typeItems = data.typeItems;
  },
  props: {
    type: {type: String, default: 'contract'},
    id: {type: Number,}
  },
  data: () => ({
    dialog: false,
    form: {files: [{type: '', file: null}]},
    errors: {files: [{type: '', file: ''}]},
    typeItems: [],
  }),
  watch: {
    dialog() {
      this.form = {files: [{type: '', file: null}]};
      this.errors = {files: [{type: '', file: ''}]};
    }
  },
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    addFileInput(i) {
      if (i === 0) {
        this.form.files.push({type: '', file: null});
        this.errors.files.push({type: '', file: ''});
      } else {
        this.form.files.splice(i, 1);
        this.errors.files.splice(i, 1);
      }
    },
    async save() {
      try {
        this.errors.files = this.errors.files.map(e => ({type: '', file: ''}));
        let formData = new FormData();
        formData.append('id', this.id);
        for (const key in this.form) {
          //console.log(key);
          if (key === 'files') {
            for (const [i, f] of this.form.files.entries()) {
              formData.append(`files[${i}][type]`, f.type);
              formData.append(`files[${i}][file]`, f.file);
            }
          } else {
            formData.append(key, this.form[key]);
          }
        }

        const response = await this.$axios.post('/contract-files', formData, {headers: {'Content-Type': 'multipart/form-data'}});
        //console.log(response.data.result);
        if (!response.data.result) {
          this.showSnackbar({show: true, color: 'error', message: response.data.message});
        }
        this.$emit('update');
        this.dialog = false
      } catch (e) {
        //console.log(e)
        //this.showSnackbar({ show: true, color: 'error', message: 'Error: ' + e.response.status + '(' + e.response.statusText + ')' });
        if (e.response.status === 422) {
          for (let [key, value] of Object.entries(e.response.data.errors)) {
            const keys = key.split('.');
            //console.log(keys, value[0]);
            if (keys[2]) {
              this.$set(this.errors[keys[0]][keys[1]], keys[2], value[0]);
            }
            /*else if (keys[1]) {
              this.$set(this.errors[keys[0]], keys[1], value[0]);
            }
            else {
              this.$set(this.errors, keys[0], value[0]);
            }*/
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.replebtn { background: #f8f8f8 !important; border: 1px solid #e7e7e7; padding: 0 10px !important; }
.boxditale { padding: 18px 10px 22px; border-radius: 10px; }
.font-color1 { color: #757575; margin-bottom: 10px; }
>>> .v-input__prepend-outer {
  margin-top: 0;
}
</style>
