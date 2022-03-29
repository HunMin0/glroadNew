<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col>
        <div class="vCardBg">
          <v-row>
            <v-col>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h5 mb-0">
                    <v-icon class="iconMa">mdi-content-duplicate</v-icon> 계약관리 내역
                  </v-list-item-title>
                  <v-list-item-subtitle>계약관리 상세 조회가 필요하실 경우 접수코드를 클릭해주세요.</v-list-item-subtitle>
                </v-list-item-content>
                <v-btn class="ml-2 excelbtn" elevation="0" @click="download">
                  <v-avatar tile size="22">
                    <img src="/images/xls.png" alt="Excel">
                  </v-avatar>
                  &nbsp;Excel 다운로드</v-btn>
                <v-menu bottom left>
                  <template v-slot:activator="{ on, attrs }" >
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list class="vlistTab3 top-padding-0 bottom-padding-0">
                    <v-list-item v-for="(item, i) in moreitems" :key="i">
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="top-padding-0">
               <v-data-table :headers="headers" :items="items" class="elevation-0 class-on-data-table"
                          :options.sync="pagination" :server-items-length="totalItems" :loading="loading"
                          :items-per-page="15" :footer-props="{ itemsPerPageOptions: [15, 30, 35] }"
                          primary-key="index">
              <template v-slot:item.created_at="{item}"> {{$dayjsFormat(item.created_at)}} </template>
              <template v-slot:item.code="{item}">
                <nuxt-link :to="`/forwarding/contracts/${item.id}`" class="tables">{{item.code}}</nuxt-link>
              </template>
            </v-data-table>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LineChart from "../../../components/LineChart";
import {mapActions} from "vuex";
import Search from "../../../components/Search";

export default {
  name: "index",
  layout: "forwarding",
  components: {Search, LineChart},
  watch: {
    pagination: {
      deep: true, handler() {
        this.searchItem();
      }
    }
  },
  data: () => ({
    menu2: '',
    date: '',
    chartData: {},
    lineChartOptions: {
      responsive: true, maintainAspectRatio: false,
      tooltips: {
        enabled: true,
        callbacks: {
          label: ((tooltipItems, data) => {
            //console.log(tooltipItems, data);
            //return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(tooltipItems.yLabel);
            return tooltipItems.yLabel.toLocaleString();
          })
        }
      },
      legend: {display: true}, //dataset labels
      scales: {
        xAxes: [{ticks: {display: true}}],
        yAxes: [{
          ticks: {
            //display: true,
            /*min: Math.min(...this.chartData.datasets[0].data) - 100,
            max: Math.max(...this.chartData.datasets[0].data) + 100,*/
            callback: function (value, index, values) {
              //console.log(value, index, values)
              //return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);
              return value.toLocaleString();
            }
          }
        }]
      }
    },
    moreitems: [
      { title: '계약조회' },
      { title: '계약통계' },
      { title: '계약정보' },
      { title: '문의사항' },
    ],
    statuses: [],
    setsheet: [
      {title: '전체', color: '#16b1ff', icon: 'mdi-content-copy', num: '48'},
      {title: '신규접수', color: '#56ca00', icon: 'mdi-calendar-plus', num: '12'},
      {title: '견적발행', color: '#ffb400', icon: 'mdi-wallet-membership', num: '22'},
      {title: '계약완료', color: '#9155fd', icon: 'mdi-calendar-check', num: '33'},
      {title: '결제완료', color: '#ff4c51', icon: 'mdi-check-circle-outline', num: '22'},
      {title: '창고입고', color: '#8a8d93', icon: 'mdi-forklift', num: '43'},
      {title: '운송시작', color: '#1b4788', icon: 'mdi-bus-double-decker', num: '30'},
      {title: '운송완료', color: '#ff832b', icon: 'mdi-calendar-multiple-check', num: '12'},
      {title: '구매확정', color: '#00bcd4', icon: 'mdi-certificate', num: '39'},
    ],

    headers: [
      {align: 'center', sortable: false, text: '주문일시', value: 'created_at'},
      {align: 'center', sortable: false, text: '접수코드', value: 'code'},
      {align: 'center', sortable: false, text: '업체명', value: 'member.company_name'},
      {align: 'center', sortable: false, text: '컨테이너', value: 'schedule.container_name'},
      {align: 'center', sortable: false, text: '출발항', value: 'schedule.pol_fullname'},
      {align: 'center', sortable: false, text: '도착항', value: 'schedule.pod_fullname'},
      {align: 'center', sortable: false, text: '상태', value: 'status_name'},
    ],
    search: {},
    totalItems: 0,
    items: [],
    loading: true,
    pagination: {},
  }),
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    getDataFromApi() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const {sortBy, sortDesc, page, itemsPerPage} = this.pagination;

        var url = '/forwarding/contracts';
        url += '?page=' + ((page > 0) ? page : 0);
        url += '&itemsPerPage=' + ((itemsPerPage > 0) ? +itemsPerPage : 0);
        if (Object.keys(this.search).length > 0) url += '&search=' + JSON.stringify(this.search);

        this.$axios.get(url).then((response) => {
          let items = response.data.data;
          /*const meta = response.data.meta;
          resolve({items, meta})*/
          const total = response.data.meta.total;
          const chartData = response.data.meta.chartData;
          const statuses = response.data.meta.statuses;
          resolve({items, total, chartData, statuses})
          this.loading = false;
        });
      })
    },
    searchItem(search) {
      if (search) this.search = search;
      this.getDataFromApi().then(data => {
        this.items = data.items;
        /*this.totalItems = data.meta.total;*/
        this.totalItems = data.total;
        this.chartData = data.chartData;
        this.statuses = data.statuses;
      })
    },
    download() {

    }
  }
}
</script>

<style scoped>
.vCardTitle {padding: 0 2px;}
#numBtn {padding: 0!important; min-width: auto !important; font-weight: 800;}
.graph{padding: 0 10px;}
#line-chart {width: 100%;}
.v-menu__content{border-radius: 10px; box-shadow: 0 4px 14px 0 rgb(94 86 105 / 14%);}
.vlistTab3 {width: 130px; text-align: center;}
.vlistTab3 .v-list-item{border-bottom: 1px solid #f1f1f1;}
.vlistTab3 .v-list-item:last-child {border:none;}
.vlistTab3 .v-list-item:hover {background: #f7f7f7;cursor: pointer;}
</style>
