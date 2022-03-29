<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row justify="center">
      <v-col cols="12" class="tabbg">
        <v-row>
          <v-col>
            <h2 class="iSize"> <v-icon dense>mdi-calendar-text</v-icon> 스케줄조회 </h2>
            <v-radio-group v-model="form.transit_type_id" :error-messages="errors.transit_type_id" row label="운송방식">
              <v-radio v-for="(item, i) in transitTypeItems" :key="i" :label="item.text" :value="item.value"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="6" sm="6" md="4" lg="2" xl="2">
            <p class="formText">출발항(POL)</p>
            <v-autocomplete v-model="form.pol" :items="polItems" :error-messages="errors.pol" solo
                            item-value="value" item-text="text" filled label="출발지 선택" placeholder="선택"
                            class="inpStyle"/>
          </v-col>
          <v-col cols="12" xs="6" sm="6" md="4" lg="2" xl="2">
            <p class="formText">도착항(POD)</p>
            <v-autocomplete v-model="form.pod" :items="podItems" :error-messages="errors.pod" solo
                            item-value="value" item-text="text" filled label="도착지 선택" placeholder="선택"/>
          </v-col>
          <v-col cols="12" xs="6" sm="6" md="4" lg="2" xl="2">
            <p class="formText">출발일자(Departure)</p>
            <v-menu v-model="form.menu_departure_date" :close-on-content-click="false" transition="scale-transition"
                    offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="form.departure_date" :error-messages="errors.departure_date" solo
                              label="날짜선택" readonly filled v-bind="attrs" v-on="on" placeholder="선택"/>
              </template>
              <v-date-picker v-model="form.departure_date" @input="form.menu_departure_date = false"/>
            </v-menu>
          </v-col>
          <v-col cols="12" xs="6" sm="6" md="4" lg="2" xl="2">
            <p class="formText">컨테이너 종류(Container)</p>
            <v-select v-model="form.container" :items="containerItems" :error-messages="errors.container"
                      return-object label="컨테이너구분" filled solo placeholder="선택"/>
          </v-col>
          <v-col cols="12" xs="6" sm="6" md="4" lg="2" xl="2">
            <template v-if="form.transit_type_id === _CONST_.TRANSIT_TYPE_LCL_ID">
              <p class="formText">화물중량(Gross Weight)</p>
              <v-text-field :value="displayCbmKg" filled label="화물중량(Gross Weight)" suffix="CBM/kg" readonly solo
                            @click="$refs.cbmCalculator.dialog = true">
                <template v-slot:append-outer>
                  <cbm-calculator ref="cbmCalculator" :container="form.container" @update-cbm-kg="updateCbmKg" />
                </template>
              </v-text-field>
            </template>
            <template v-if="form.transit_type_id === _CONST_.TRANSIT_TYPE_FCL_ID">
              <p class="formText">컨테이너 개수(Container Num)</p>
              <v-text-field class="inpStyle" v-model="form.continer_counter" type="number" filled label="필요 컨테이너 개수"
                            solo placeholder="입력" />
            </template>
          </v-col>
          <v-col cols="12" xs="6" sm="6" md="4" lg="2" xl="2" class="paddingS">
            <v-btn width="100%" height="56px" @click="search" text class="btnClass">스케줄조회&nbsp;
              <v-icon dense>mdi-arrow-right-bold-circle-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import CbmCalculator from "./CbmCalculator";
export default {
  name: "ScheduleSearch",
  components: {CbmCalculator},
  props: ['type'],
  async fetch() {
    const data = (await this.$axios.get('/schedules/init')).data;
    this.polItems = data['polItems'];
    this.podItems = data['podItems'];
    this.transitTypeItems = data['transitTypeItems'];
    //FORTEST
    //this.form = {cbm: 0, transit_type_id: 1, container: {'value': 1, 'text': 'Dry Container 20ft', 'cbm': 33}}
    this.form = {
      transit_type_id: 1, departure_date: this.$dayjs().format('YYYY-MM-DD'),
      pol: null, pod: null, container: [], cbm: 0, kg: 0,
      continer_counter: 1,
    };
    //this.form.container = this.containerItems[0];
  },
  computed: {
    ...mapGetters(['_CONST_']),
    containerItems() {
      if (this.form.transit_type_id) {
        this.form.container = null;
        return this.transitTypeItems.find(e => e.value === this.form.transit_type_id).containerItems;
      }
      return [];
    },
    displayCbmKg() {
      //console.log(this.form.cbm, this.form.kg);
      if (this.form.cbm && this.form.kg) return `${this.form.cbm} / ${this.form.kg}`;
      return 0;
    }
  },
  data: () => ({
    //date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    polItems: [],
    podItems: [],
    transitTypeItems: {},

    form: {},
    errors: {},
    isProduction: process.env.NODE_ENV === 'production'
  }),
  methods: {
    ...mapActions('schedule', ['setSearch']),
    updateCbmKg(value) {
      //console.log(value);
      this.form.cbm = value.cbm;
      this.form.kg = value.kg;
    },
    search() {
      //console.log('form', this.form);
      this.errors = {};
      if (this.isProduction) {
        if (!(this.form.pol)) { this.$set(this.errors, 'pol', '출발항을 입력하여 주십시오.'); return; }
        if (!(this.form.pod)) { this.$set(this.errors, 'pod', '출발항을 입력하여 주십시오.'); return; }
        if (!(this.form.departure_date)) { this.$set(this.errors, 'departure_date', '출발항을 입력하여 주십시오.'); return; }
        if (!(this.form.container)) { this.$set(this.errors, 'container', '출발항을 입력하여 주십시오.'); return; }
      }

      this.setSearch(this.form);
      if (this.type === 'reload') {
        this.$emit('search');
      } else {
        this.$router.push('/schedules');
      }
    }
  }
}
</script>

<style scoped>
.iSize i {font-size: 26px; color: #333; margin-bottom: 3px;}
.formText {font-size: 0.813rem;}
.btnClass {background: #2394d2; color: #fff;}
.btnClass i {margin-top: 2px;}
.paddingS {padding: 48px 0;}
.tabbg {background-color: rgb(255 255 255 / 95%); padding: 40px 60px; border: 10px solid rgb(35 147 209);}
@media (min-width: 605px){
  .tabbg {padding: 40px 60px;}
  .paddingS {padding: 48px 0;}
}
@media (max-width: 960px){
  .tabbg {padding: 30px 40px 0;}
  .paddingS {padding: 0 10px 50px 10px;}
}
</style>
