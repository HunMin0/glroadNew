<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col>
        <div class="vCardBg">
          <v-row>
            <v-col>
              <v-col>
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h5 mb-0">
                      <router-link to="/forwarding/schedules">
                        <v-btn icon class="iconMa ma-0">
                          <v-icon>mdi-arrow-left-thick</v-icon>
                        </v-btn>
                      </router-link>
                      스케줄 등록하기 <span class="titleSpan">접수코드에 대한 상세내역 입니다.</span>
                    </v-list-item-title>
                  </v-list-item-content>
                  <load-schedules-dialog></load-schedules-dialog>
                  <v-card-actions>
                    <v-btn color="primary" @click="save" elevation="0">
                      <v-icon small class="iconMar">mdi-border-color</v-icon>&nbsp;스케줄등록
                    </v-btn>
                  </v-card-actions>
                </v-list-item>
                <v-divider></v-divider>
              </v-col>
              <div class="setting-padding-lr colHeight">
                <v-icon class="iconMa">mdi-forklift</v-icon>
                컨테이너 종류
              </div>
              <v-card class="d-flex setting-padding-lr" tile elevation="0">
                <v-card elevation="0">
                  <v-radio-group v-model="form.transit_type_id" :error-messages="errors.transit_type_id" row
                                 label="운송방식">
                    <v-radio v-for="(item, i) in transitTypeItems" :key="i" :label="item.text"
                             :value="item.value"></v-radio>
                  </v-radio-group>
                </v-card>
                <v-card elevation="0">
                  <v-select v-model="form.container" :items="containerItems" :error-messages="errors.container_id"
                            return-object label="컨테이너구분" outlined hide-details="auto"></v-select>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <div class="vCardBg">
          <v-row>
            <v-col>
              <div class="setting-padding-lr colHeight">
                <v-icon class="iconMa">mdi-calendar-clock</v-icon>
                스케줄정보
              </div>
              <v-card tile elevation="0">
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="3">
                      <v-autocomplete v-model="form.pol" :items="polItems" :error-messages="errors.pol"
                                      item-value="value" item-text="text" outlined label="출발지(From)"/>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-autocomplete v-model="form.pod" :items="podItems" :error-messages="errors.pod"
                                      item-value="value" item-text="text" outlined label="도착지(Destination)"/>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="3">
                      <v-text-field v-model="form.departure_date" :error-messages="errors.departure_date" type="date"
                                    outlined label="출발일"></v-text-field>
                      <!--            <v-menu v-model="form.menu_departure_date" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field v-model="form.departure_date" :error-messages="errors.departure_date"
                                                    label="출발일" readonly outlined v-bind="attrs" v-on="on" />
                                    </template>
                                    <v-date-picker v-model="form.departure_date" @input="form.menu_departure_date = false" />
                                  </v-menu>-->
                    </v-col>
                    <!--v-col cols="12" md="3">
                      <v-text-field v-model="form.departure_time" :error-messages="errors.departure_time" type="time" outlined label="출발시간" required></v-text-field>
                    </v-col-->
                    <v-col cols="12" md="3">
                      <v-text-field v-model="form.arrival_date" :error-messages="errors.arrival_date" type="date"
                                    outlined label="예상 도착일"></v-text-field>
                      <!--            <v-menu v-model="form.menu_arrival_date" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field v-model="form.arrival_date" :error-messages="errors.arrival_date"
                                                    label="예상 도착일" readonly outlined v-bind="attrs" v-on="on" />
                                    </template>
                                    <v-date-picker v-model="form.arrival_date" @input="form.menu_arrival_date = false" />
                                  </v-menu>-->
                    </v-col>
                    <!--v-col cols="12" md="3">
                      <v-text-field v-model="form.arrival_time" :error-messages="errors.arrival_time" type="time" outlined label="예상 도착시간"></v-text-field>
                    </v-col-->
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <div class="vCardBg">
          <v-row>
            <v-col>
              <div class="setting-padding-lr colHeight">
                <v-icon class="iconMa">mdi-calendar-text</v-icon>
                계약정보
              </div>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="3">
                    <v-text-field v-model="form.document_deadline_date" :error-messages="errors.document_deadline_date"
                                  type="date" outlined label="서류마감일"></v-text-field>
                    <!--            <v-menu v-model="form.menu_document_deadline_date" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="form.document_deadline_date" :error-messages="errors.document_deadline_date"
                                                  label="서류마감일" readonly outlined v-bind="attrs" v-on="on" />
                                  </template>
                                  <v-date-picker v-model="form.document_deadline_date" @input="form.menu_document_deadline_date = false" />
                                </v-menu>-->
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field v-model="form.document_deadline_time" :error-messages="errors.document_deadline_time"
                                  type="time" outlined label="서류마감시간"></v-text-field>
                    <!--            <v-menu ref="menu_document_deadline_time" v-model="form.menu_document_deadline_time"
                                        :close-on-content-click="false"
                                        :nudge-right="40" :return-value.sync="form.document_deadline_time"
                                        transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="form.document_deadline_time" :error-messages="errors.document_deadline_time"
                                                  outlined label="서류마감시간" readonly v-bind="attrs" v-on="on" style="max-width: 200px"/>
                                  </template>
                                  <v-time-picker v-model="form.document_deadline_time" full-width format="24hr"
                                                @click:minute="$refs.menu_document_deadline_time.save(form.document_deadline_time)"/>
                                </v-menu>-->
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field v-model="form.warehouse_deadline_date"
                                  :error-messages="errors.warehouse_deadline_date" type="date" outlined
                                  label="창고마감일"></v-text-field>
                    <!--            <v-menu v-model="form.menu_warehouse_deadline_date" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="form.warehouse_deadline_date" :error-messages="errors.warehouse_deadline_date"
                                                  label="창고마감일" readonly outlined v-bind="attrs" v-on="on" />
                                  </template>
                                  <v-date-picker v-model="form.warehouse_deadline_date" @input="form.menu_warehouse_deadline_date = false" />
                                </v-menu>-->
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field v-model="form.warehouse_deadline_time"
                                  :error-messages="errors.warehouse_deadline_time" type="time" outlined
                                  label="창고마감시간"></v-text-field>
                    <!--            <v-menu ref="menu_warehouse_deadline_time" v-model="form.menu_warehouse_deadline_time"
                                        :close-on-content-click="false"
                                        :nudge-right="40" :return-value.sync="form.warehouse_deadline_time"
                                        transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="form.warehouse_deadline_time" :error-messages="errors.warehouse_deadline_time"
                                                  outlined label="창고마감시간" readonly v-bind="attrs" v-on="on" style="max-width: 200px"/>
                                  </template>
                                  <v-time-picker v-model="form.warehouse_deadline_time" full-width format="24hr"
                                                @click:minute="$refs.menu_warehouse_deadline_time.save(form.warehouse_deadline_time)"/>
                                </v-menu>-->
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-menu v-model="form.menu_address" :close-on-content-click="false" :nudge-top="90" offset-y>
                      <template v-slot:activator="{ on }">
                        <v-text-field v-model="form.address" :error-messages="errors.address"
                                      v-on="on" label="픽업창고 주소" outlined readonly append-icon="mdi-magnify"
                                      @click:append="form.menu_address = true"></v-text-field>
                      </template>
                      <vue-daum-postcode @complete="setAddress" style="height: 400px; overflow: scroll;"/>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="form.address_detail" :error-messages="errors.address_detail" outlined
                                  label="픽업창고 상세주소입력"></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <template v-if="isTransitTypeLcl">
                <v-card-title>LCL {{ cbmDisplayType === 'remain' ? '잔여' : '사용' }}공간</v-card-title>
                <v-card-subtitle>
                  <v-btn text @click="cbmDisplayType = (cbmDisplayType === 'remain') ? 'use': 'remain'">
                    <v-icon>mdi-swap-horizontal</v-icon>
                    잔여공간을 모르는 경우 사용공간입력하기
                  </v-btn>
                </v-card-subtitle>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="4">
                      <v-currency-field v-model="form.cbm" :error-messages="errors.cbm"
                                        outlined label="총 부피" reverse prefix="CBM" required
                                        :auto-decimal-mode="false" :decimal-length="3" :default-value="0"
                                        :min="0" :max="maxCbm" :value-as-integer="false" :allow-negative="false">
                        <template v-slot:append-outer>
                          <cbm-calculator2 @update="setCbm"></cbm-calculator2>
                        </template>
                      </v-currency-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="2">
                      <v-currency-field v-model="form.kg" :error-messages="errors.kg"
                                        outlined label="총 중량" prefix="kg" reverse
                                        required :decimal-length="0" :auto-decimal-mode="false" :default-value="0"
                                        :min="0"
                                        :allow-negative="false"/>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="4">
                      <v-progress-linear :value="cbmProgressLinear" readonly height="50">
                        <v-card flat class="transparent d-flex justify-space-between" style="width: 100%">
                          <v-card flat dark class="transparent pa-2 font-weight-bold"> 사용공간<br/>{{ useCbm }}CBM</v-card>
                          <v-card flat class="transparent pa-2 font-weight-bold"> 잔여공간<br/>{{ remainCbm }}CBM</v-card>
                        </v-card>
                      </v-progress-linear>
                    </v-col>
                  </v-row>
                </v-card-text>
              </template>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <div class="vCardBg">
          <v-row>
            <v-col>
              <div class="setting-padding-lr colHeight">
                <v-icon class="iconMa">mdi-cash</v-icon>
                가격정보
              </div>
              <v-card tile elevation="0">
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-select v-model="form.incoterms_id" :error-messages="errors.incoterms_id"
                                :items="incotermsItems"
                                item-value="value" item-text="text" label="인코텀즈" outlined></v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-currency-field v-model="form.price" :error-messages="errors.price" label="가격" outlined
                                        prefix="원" reverse
                                        required :decimal-length="0" :auto-decimal-mode="false" :min="0"
                                        :allow-negative="false"/>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field v-if="isTransitTypeLcl" v-model="pricePerCbm" label="1CBM당 가격" prefix="원/CBM"
                                    readonly filled outlined reverse></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppBar from "../../../components/AppBar";
import CbmCalculator2 from "../../../components/CbmCalculator2";
import {VueDaumPostcode} from "vue-daum-postcode";
import {mapGetters, mapActions} from "vuex";
import LoadSchedulesDialog from "../../../components/LoadSchedulesDialog";

export default {
  name: "ForwardingSchedulesForm",
  components: {LoadSchedulesDialog, AppBar, CbmCalculator2, VueDaumPostcode},
  layout: "forwarding",
  async asyncData({params, route, $axios}) {
    const data = await $axios.$get('/forwarding/schedules/init/' + params.id);
    /*const polItems = data['polItems'];
    const podItems = data['podItems'];
    const transitTypeItems = data['transitTypeItems'];*/
    if (route.query?.type === 'create') {
      data.form.departure_date = '';
      data.form.departure_time = '';
      data.form.arrival_date = '';
      data.form.arrival_time = '';
    }
    return {...data}
  },
  mounted() {
    /*console.log(this.warehouseAddress)
    this.form.address = this.warehouseAddress.address;
    this.form.address_detail = this.warehouseAddress.address_detail;*/
    /*this.$set(this.form, 'address', this.warehouseAddress.address);
    this.$set(this.form, 'address_detail', this.warehouseAddress.address_detail);*/
    //this.form = {...this.warehouseAddress};
    //console.log('param', this.$route.query.type);
  },
  computed: {
    ...mapGetters(['_CONST_']),
    isTransitTypeLcl() {
      return this.form.transit_type_id === this._CONST_.TRANSIT_TYPE_LCL_ID;
    },
    isTransitTypeFcl() {
      return this.form.transit_type_id === this._CONST_.TRANSIT_TYPE_FCL_ID;
    },
    containerItems() {
      if (this.form.transit_type_id) {
        return this.transitTypeItems.find(e => e.value === this.form.transit_type_id).containerItems;
      }
      return [];
    },
    maxCbm() {
      return this.form.container?.cbm ?? 0;
    },
    cbmProgressLinear() {
      if (this.form.container?.cbm) {
        //console.log(this.form.cbm, this.form.container.cbm);
        if (this.cbmDisplayType === 'remain') {
          return 100 - this.form.cbm / this.form.container.cbm * 100;
        }
        if (this.cbmDisplayType === 'use') {
          return this.form.cbm / this.form.container.cbm * 100;
        }
      }
      return 0;
    },
    remainCbm() {
      if (this.isTransitTypeFcl) {
        return this.form.container?.cbm;
      }

      if (this.form.container?.cbm) {
        if (this.cbmDisplayType === 'remain') {
          return this.form.cbm;
        }
        if (this.cbmDisplayType === 'use') {
          return this.form.container.cbm - this.form.cbm;
        }
      }
      return 0;
    },
    useCbm() {
      if (this.form.container?.cbm) {
        return Math.round((this.form.container.cbm - this.remainCbm) * 1000) / 1000;
      }
      return 0;
    },
    pricePerCbm() {
      if (this.form.remain_cbm) {
        return Math.round(this.form.price / this.form.remain_cbm).toLocaleString();
      }
      return 0;
    },
    isTypeCreate() {
      return this.$route.query?.type === 'create';
    },
    isModify() {
      if (this.isTypeCreate()) return false;
      return this.form.id > 0;
    }
  },
  watch: {
    remainCbm(newValue) {
      this.form.remain_cbm = newValue;
    }
  },
  data: () => ({
    /*form: { /!*transit_type_id: 1, cbm: 0 container: {value: 1, text: 'Dry Container 20ft', cbm: 33},*!/ },*/
    errors: {},
    cbmDisplayType: 'remain',
  }),
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    setAddress(e) {
      //console.log(e); zonecode: "34190"
      this.form.address = e.address;
      this.form.menu_address = false;
    },
    setCbm(e) {
      //console.log('setcbm', e);
      //this.form.cbm = e
      this.$set(this.form, 'cbm', e)
    },
    async save() {
      try {
        this.errors = {};
        const data = (this.isModify) ? await this.$axios.$put('/forwarding/schedules/' + this.form.id, this.form)
          : await this.$axios.$post('/forwarding/schedules', this.form);

        if (data.result) {
          this.showSnackbar({show: true, color: 'success', message: '스케줄이 저장되었습니다.'});
          this.$router.push('/forwarding/schedules');
        } else {
          this.showSnackbar({show: true, color: 'error', message: data.message});
        }
      } catch (e) {
        //console.log(e);
        this.showSnackbar({
          show: true,
          color: 'error',
          message: 'Error: ' + e.response.status + '(' + e.response.statusText + ')'
        });
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
>>> .v-text-field--filled:not(.v-text-field--single-line) input {
  margin-top: initial !important;
}

>>> .v-text-field--filled .v-text-field__prefix, >>> .v-text-field--filled .v-text-field__suffix {
  margin-top: initial !important;
}

>>> .v-text-field--outlined .v-input__prepend-outer, >>> .v-text-field--outlined .v-input__append-outer {
  margin-top: initial !important;
}

.iconMar { padding-top: 4px }

.colHeight { padding-top: 20px; margin-bottom: 10px; }

>>> input[type="date"]::-webkit-calendar-picker-indicator {
  background: transparent; bottom: 0; color: transparent; cursor: pointer; height: auto; left: 0; position: absolute; right: 0; top: 0; width: auto;
}

>>> input[type="time"]::-webkit-calendar-picker-indicator {
  background: transparent; bottom: 0; color: transparent; cursor: pointer; height: auto; left: 0; position: absolute; right: 0; top: 0; width: auto;
}
</style>
