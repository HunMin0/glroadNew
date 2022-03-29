<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on"> 운송완료 </v-btn>
    </template>
    <v-card>
      <v-card-title> 운송완료 </v-card-title>
      <v-card-subtitle>
        - 운송완료일을 입력하지 않으면 현재 시간으로 입력 됩니다.
      </v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field v-model="form.arrived_date" :error-messages="errors.arrived_date" type="date" outlined label="운송완료일"></v-text-field>
<!--            <v-menu v-model="form.menu_arrived_date" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="form.arrived_date" :error-messages="errors.arrived_date"
                              label="운송완료일" readonly outlined v-bind="attrs" v-on="on" />
              </template>
              <v-date-picker v-model="form.arrived_date" @input="form.menu_arrived_date = false" />
            </v-menu>-->
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="form.arrived_time" :error-messages="errors.arrived_time" type="time" outlined label="운송완료시간"></v-text-field>
<!--            <v-menu ref="menu_arrived_time" v-model="form.menu_arrived_time" :close-on-content-click="false"
                    :nudge-right="40" :return-value.sync="form.arrived_time"
                    transition="scale-transition" offset-y max-width="290px" min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="form.arrived_time" :error-messages="errors.arrived_time"
                              outlined label="운송완료시간" readonly v-bind="attrs" v-on="on" style="max-width: 200px" />
              </template>
              <v-time-picker v-model="form.arrived_time" full-width format="24hr"
                             @click:minute="$refs.menu_arrived_time.save(form.arrived_time)"/>
            </v-menu>-->
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false">취소</v-btn>
        <v-btn color="primary" @click="save">저장</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "TransportCompleteForm",
  props: ['contract'],
  mounted() {
    //this.dialog = true;FORTEST
  },
  watch: {
    dialog(value) {
      if (value) {
      } else {
        this.form = {menu_arrived_date: false, arrived_date: '', menu_arrived_time: false, arrived_time: ''};
      }
    }
  },
  data: () => ({
    dialog: false,
    form: {menu_arrived_date: false, arrived_date: '', menu_arrived_time: false, arrived_time: ''},
    errors: {},
  }),
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    async save() {
      try {
        this.errors = {};
        const data = await this.$axios.$put('/forwarding/contracts/'+this.contract.id+'/arrived', this.form)
        if (data.result) {
          this.showSnackbar({show: true, color: 'success', message: '결제가 확인되었습니다.'});
          this.dialog = false;
          this.$emit('update');
        } else {
          this.showSnackbar({show: true, color: 'error', message: data.message});
        }
      } catch (e) {
        //console.log(e);
        this.showSnackbar({show: true, color: 'error', message: 'Error: ' + e.response.status + '(' + e.response.statusText + ')'});
        if (e.response.status === 422) {
          for (let [key, value] of Object.entries(e.response.data.errors)) {
            /*console.log(key, value);
            this.$set(this.errors, key, true);*/
            var keys = key.split('.');
            //console.log(keys, value[0]);
            if (keys[1]) {
              //this.$set(this.errors[keys[0]], keys[1], value[0]);
              this.$set(this.errors, keys[0], value[0]);
            } else {
              this.$set(this.errors, keys[0], value[0]);
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
