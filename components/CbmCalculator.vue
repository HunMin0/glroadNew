<template>
  <v-dialog v-model="dialog" width="700" persistent>
<!--    <template v-slot:activator="{ on, attrs }">
      <v-btn icon x-large v-bind="attrs" v-on="on"><v-icon>mdi-calculator</v-icon></v-btn>
    </template>-->
    <v-card>
      <v-toolbar dark color="primary" >
        <v-toolbar-title>적재중량을 입력해주세요.</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="dialog = false"> <v-icon>mdi-close</v-icon> </v-btn>
<!--        <v-toolbar-items> <v-btn dark text @click="dialog = false" > Save </v-btn> </v-toolbar-items>-->
      </v-toolbar>
<!--      <v-card-title>적재중량을 입력해주세요.</v-card-title>-->
      <v-card-text class="mb-0 pb-0">
        <v-radio-group v-model="input_type" row>
          <v-radio value="manual" label="CBM입력"></v-radio>
          <v-radio value="calculate" label="CBM계산"></v-radio>
        </v-radio-group>
      </v-card-text>
      <template v-if="input_type === 'calculate'">
        <v-divider class="my-3"></v-divider>
        <v-card-text class="mb-0 pb-0">
          <v-row>
            <v-col> <v-text-field v-model="form.width" :error-messages="errors.width" type="number" dense outlined label="가로" suffix="cm"></v-text-field> </v-col>
            <v-col> <v-text-field v-model="form.depth" :error-messages="errors.depth" type="number" dense outlined label="세로" suffix="cm"></v-text-field> </v-col>
            <v-col> <v-text-field v-model="form.height" :error-messages="errors.height" type="number" dense outlined label="높이" suffix="cm"></v-text-field> </v-col>
          </v-row>
          <v-row>
            <v-col> <v-text-field v-model="form.weight" :error-messages="errors.weight" type="number" dense outlined label="무게" suffix="kg"></v-text-field> </v-col>
            <v-col> <v-text-field v-model="form.ea" :error-messages="errors.ea" type="number" dense outlined label="박스개수" suffix="EA"></v-text-field> </v-col>
            <v-col> <v-btn block @click="addCbm">추가</v-btn></v-col>
          </v-row>
        </v-card-text>
        <v-divider class="my-3"></v-divider>
        <v-card-text class="mb-0 pb-0">
          <template v-for="(item, i) in form.cbms">
            <v-input append-icon="mdi-delete" @click:append="removeCbm(i)">
              {{`가로 ${item.width}cm | 세로 ${item.depth}cm | 높이 ${item.height}cm | 무게 ${item.weight}kg  * ${item.ea}EA`}}
            </v-input>
          </template>
        </v-card-text>
      </template>
      <v-divider class="my-3"></v-divider>
      <v-card-text class="mb-0 pb-0">
        <v-row>
          <v-col>
<!--            <v-text-field outlined label="총부피(CBM)"></v-text-field>-->
            <v-currency-field v-model="cbm" :error-messages="errors.cbm"
                              outlined label="총 부피" reverse prefix="CBM" required
                              :auto-decimal-mode="false" :decimal-length="1" :default-value="0"
                              :min="0" :max="maxCbm" :value-as-integer="false" :allow-negative="false" />
          </v-col>
          <v-col>
            <v-currency-field v-model="kg" :error-messages="errors.kg"
                              outlined label="총 중량" prefix="kg" reverse
                              required :decimal-length="0" :auto-decimal-mode="false" :default-value="0" :min="0"
                              :allow-negative="false"/>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="primary" @click="save">입력완료</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>/**
 * 1)입력 된 CBM이 33.2를 초과하는 경우
 * [알럿창]
 * 소화물 (LCL) 물류는 33.2CBM을 초과할 수 없습니다. 단독컨테이너으로 다시 검색해주세요.
 *
 * 2)입력 된 CBM이 1 이하인 경우
 * 반올림하여 1로 표시
 */
import {mapActions} from "vuex";

//import VCurrencyField from 'v-currency-field'
export default {
  name: "CbmCalculator",
  //components: {VCurrencyField},
  props: ['container'],
  computed: {
    maxCbm() {
      return this.container?.cbm ?? 0;
    },
    /*cbm: {
      get: function () {
        //const cbm = Math.round((value.width * value.depth * value.height) / 1000000 * 1000) / 1000;
        let cbm = this.form.cbms.reduce((a, e) => {
          return a + (e.width * e.depth * e.height / 1000000) * e.ea
        }, 0);
        return Math.round(cbm * 1000) / 1000;
      },
      set: function (value) {
        return value;
      }
    },
    kg() {
      return this.form.cbms.reduce((a, e) => a + parseInt(e.weight, 10), 0);
    }*/
  },
  watch: {
    'form.cbms': {
      depp: false,
      handler() {
        let cbm = this.form.cbms.reduce((a, e) => {
          return a + (e.width * e.depth * e.height / 1000000) * e.ea
        }, 0);
        this.cbm = Math.round(cbm * 10) / 10;
        if (this.container.cbm <= this.cbm) {
          this.showSnackbar({show: true, color: 'error', message: `${this.container.text}는 ${this.container.cbm}CBM을 초과할 수 없습니다.`});
        }

        this.kg = this.form.cbms.reduce((a, e) => a + parseInt(e.weight, 10), 0);
      }
    }
  },
  data: () => ({
    dialog: false,
    input_type: 'calculate',
    form: {
      cbms: [
        //{width: 10, depth: 10, height:10, weight: 10, ea: 1}
      ]
    },
    errors: {},
    cbm: 0,
    kg: 0,
  }),
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    addCbm() {
      this.errors = {};
      if (!(this.form.width > 0)) { this.$set(this.errors, 'width', `가로를 입력하여 주십시오.`); return ; }
      if (!(this.form.depth > 0)) { this.$set(this.errors, 'depth', `세로를 입력하여 주십시오.`); return ; }
      if (!(this.form.height > 0)) { this.$set(this.errors, 'height', `높이를 입력하여 주십시오.`); return ; }
      if (!(this.form.weight > 0)) { this.$set(this.errors, 'weight', `무게를 입력하여 주십시오.`); return ; }
      if (!(this.form.ea > 0)) { this.$set(this.errors, 'ea', `박스개수를 입력하여 주십시오.`); return ; }

      this.form.cbms.push({
        width: this.form.width,
        depth: this.form.depth,
        height: this.form.height,
        weight: this.form.weight,
        ea: this.form.ea
      });

      this.form.width = this.form.depth = this.form.height = this.form.weight = this.form.ea = '';
    },
    removeCbm(i) {
      this.form.cbms.splice(i, 1);
    },
    save() {
      this.errors = {};
      if (this.cbm <= 0) {
        this.$set(this.errors, 'cbm', '총 부피를 입력하여주십시오.');
        return ;
      }
      if (this.container.cbm <= this.cbm) {
        this.$set(this.errors, 'cbm', `총 부피는 ${this.container.cbm}CBM을 초과할 수 없습니다.`);
        return;
      }
      this.$emit('update-cbm-kg', {cbm: this.cbm, kg: this.kg});
      this.dialog = false;
    }
  }
}
</script>

<style scoped>
>>> .v-input__append-outer, .v-input__prepend-outer {
  margin-top: 0 !important;
}
</style>
