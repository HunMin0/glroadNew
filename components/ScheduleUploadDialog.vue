<template>
  <!-- eager persistent fullscreen -->
  <v-dialog v-model="dialog" fullscreen persistent eager>
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on">엑셀등록</v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">엑셀등록</v-card-title>
      <v-card-actions>
        <v-btn text>엑셀양식 다운로드</v-btn>
        <v-btn text>엑셀파일 불러오기</v-btn>
      </v-card-actions>
      <v-card-text>
        <!--<v-file-input label="엑셀파일" outlined append-outer-icon=""></v-file-input>-->
        <hot-table ref="hot" :settings="hotSettings"/>
        <!--<hot-table :data="data" :rowHeaders="true" :colHeaders="true" licenseKey="non-commercial-and-evaluation" />-->
      </v-card-text>
      <v-card-subtitle>
      </v-card-subtitle>
      <v-card-actions>
        <v-btn color="grey darken-1" text @click="dialog = false">취소</v-btn>
        <v-btn color="blue darken-1" text>등록</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {HotTable} from '@handsontable/vue';
import {registerAllModules} from 'handsontable/registry';

registerAllModules();

//import HotTable from '~/plugins/vue-handsontable'

export default {
  name: "ScheduleUploadDialog",
  components: {HotTable},
  mounted() {
    //this.dialog = true;
  },
  watch: {
    dialog: {
      immediate: true,//즉시 실행
      handler() {
        setTimeout(() => {
          //console.log('watch hot', this.$refs.hot.hotInstance);
          this.$refs.hot.hotInstance.render();
        }, 1000)
      }
    }
  },
  data: () => ({
    dialog: false,
    hotRef: null,
    hotSettings: {
      data: [
        {
          checkbox: '', pol: 'KRPUS', pod: 'DKAAR',
          departure_date: '2020-03-11', /*departure_time: '12:00',*/
          arrival_date: '2020-03-11', /*arrival_time: '12:00',*/
          document_deadline_date: '2020-03-11', document_deadline_time: '12:00',
          warehouse_deadline_date: '2020-03-11', warehouse_deadline_time: '12:00',
          address: '대한민국 인천광역시 서구 인천항로 131길', address_detail: '글로드물류센터',
          remain_cbm: '20', kg: '10', incoterms: 'CIF', price: '100123',
        },
        {
          checkbox: '', pol: 'KRPUS', pod: 'DKAAR',
          departure_date: '2020-03-11', /*departure_time: '12:00',*/
          arrival_date: '2020-03-11', /*arrival_time: '12:00',*/
          document_deadline_date: '2020-03-11', document_deadline_time: '12:00',
          warehouse_deadline_date: '2020-03-11', warehouse_deadline_time: '12:00',
          address: '대한민국 인천광역시 서구 인천항로 131길', address_detail: '글로드물류센터',
          remain_cbm: '20', kg: '10', incoterms: 'CIF', price: '100123',
        },
        {
          checkbox: '', pol: 'KRPUS', pod: 'DKAAR',
          departure_date: '2020-03-11', /*departure_time: '12:00',*/
          arrival_date: '2020-03-11', /*arrival_time: '12:00',*/
          document_deadline_date: '2020-03-11', document_deadline_time: '12:00',
          warehouse_deadline_date: '2020-03-11', warehouse_deadline_time: '12:00',
          address: '대한민국 인천광역시 서구 인천항로 131길', address_detail: '글로드물류센터',
          remain_cbm: '20', kg: '10', incoterms: 'CIF', price: '100123',
        }
      ],
      /*width: 500,
      height: 300,*/
      width: 'auto',
      height: 'auto',
      colHeaders: ["", "출발지", "도착지",
        "출발일", /*"출발시간",*/
        "예상도착일", /*"예상도착시간",*/
        "서류마감일", "서류마감시간",
        "픽업마감일", "픽업마감시간",
        "픽업창고주소", "픽업창고주소상세",
        /*"컨테이너종류", "컨테이너규격", "컨테이너코드", "H/S코드",*/
        "잔여공간 - 면적", "잔여공간 - 무게", "가격단위", "가격"
      ],
      //colHeaders: ["", "출발지", "도착지"],
      rowHeaders: false,
      columns: [
        {data: 'checkbox', type: 'checkbox', checkedTemplate: 'yes', uncheckedTemplate: 'no'},
        {data: 'pol',
          type: 'autocomplete', strict: false,
          source: ['KRPUS ', 'KRKAN ', 'KRINC ', 'KRKWA ', 'KRMIP ', 'KRKPO ', 'KRPTK ', 'KRUSN'],
          /*editor: 'select', selectOptions: ['KRPUS ', 'KRKAN ', 'KRINC ', 'KRKWA ', 'KRMIP ', 'KRKPO ', 'KRPTK ', 'KRUSN']*/
        },
        {data: 'pod',
          type: 'autocomplete', strict: false,
          source: ['DKAAR', 'AEAUH', 'AUADL', 'AEAJM', 'JPAXT', 'TRAMB', 'CNAQG', 'BEANR', 'ILASH'],
          /*editor: 'select', selectOptions: ['DKAAR', 'AEAUH', 'AUADL', 'AEAJM', 'JPAXT', 'TRAMB', 'CNAQG', 'BEANR', 'ILASH']*/
        },
        {data: 'departure_date', type: 'date', dateFormat: 'YYYY-MM-DD', correctFormat: true},
        /*{data: 'departure_time', type: 'time', timeFormat: 'HH:mm', correctFormat: true},*/
        {data: 'arrival_date', type: 'date', dateFormat: 'YYYY-MM-DD', correctFormat: true},
        /*{data: 'arrival_time', type: 'time', timeFormat: 'HH:mm', correctFormat: true},*/
        {data: 'document_deadline_date', type: 'date', dateFormat: 'YYYY-MM-DD', correctFormat: true},
        {data: 'document_deadline_time', type: 'time', timeFormat: 'HH:mm', correctFormat: true},
        {data: 'warehouse_deadline_date', type: 'date', dateFormat: 'YYYY-MM-DD', correctFormat: true},
        {data: 'warehouse_deadline_time', type: 'time', timeFormat: 'HH:mm', correctFormat: true},
        {data: 'address'}, {data: 'address_detail'},
        {data: 'remain_cbm'}, {data: 'kg'},
        {data: 'incoterms', editor: 'select', selectOptions: ['CIF']},
        {data: 'price', type: 'numeric', numericFormat: {pattern: '0,0', culture: 'ko-KR'}},
        // more cultures available on http://numbrojs.com/languages.html
      ],
      colWidths: 100,
      manualColumnResize: true,
      /*afterChange: () => {
        if (this.hotRef) {
          this.$store.commit('updateData', this.hotRef.getSourceData());
        }
      },*/
      licenseKey: 'non-commercial-and-evaluation'
    }
  }),
  methods: {}
}
</script>

<style src="../node_modules/handsontable/dist/handsontable.full.css"></style>
<style scoped>

</style>
