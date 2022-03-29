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
                    <v-icon class="iconMa">mdi-monitor-multiple</v-icon> 계약관리 검색조회
                  </v-list-item-title>
                  <v-list-item-subtitle>계약 상세조회가 필요하실 경우 검색조회를 이용해주세요.</v-list-item-subtitle>
                </v-list-item-content>

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
              <v-row class="setting-padding-lr">
                <v-col>
                  <v-card-actions class="left-padding-0 right-padding-0">
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          color="#1976d2"
                          label="조회기간"
                          readonly
                          outlined
                          v-bind="attrs"
                          v-on="on" hide-details="auto"
                          prepend-inner-icon="mdi-calendar-text"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        @input="menu2 = false"
                      ></v-date-picker>
                    </v-menu>

                    <v-text-field
                      color="#1976d2"
                      outlined
                      label="검색"
                      hide-details="auto"
                      prepend-inner-icon="mdi-magnify"
                      class="setting-margin-lr"
                    ></v-text-field>
                    <v-btn large  color="#3d9cd2" dark height="56" elevation="0" >검색</v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
              <!--<search :search-types="['dates', 'keyword']" @search-item="searchItem"></search>-->
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <div class="vCardBg">
          <v-row>
            <v-col class="bottom-padding-0">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h5 mb-0">
                    <v-icon class="iconMa">mdi-chart-line</v-icon> 계약관리 전체통계
                  </v-list-item-title>
                  <v-list-item-subtitle>조회된 계약 상태들의 통계치를 확인 합니다.</v-list-item-subtitle>
                </v-list-item-content>
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
              <line-chart :chart-data="chartData" :options="lineChartOptions" style="height: 300px;" class="graph"></line-chart>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(item, i) in setsheet" :key="i" cols="12" sm="6" md="4" lg="3" xl="3">
        <div class="vCardBg">
          <v-list-item three-line>
            <v-list-item-content class="pa-0">
              <v-list-item-subtitle>
                <div class="text-overline">
                  <span class="vCardTitle">GLROAD</span>
                </div>
              </v-list-item-subtitle>
              <v-list-item-title class="text-h5 mb-1">
                {{item.title}}
              </v-list-item-title>
              <v-list-item-subtitle> <v-btn text :color="item.color" id="numBtn">{{item.num}}건</v-btn></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar :color="item.color" size="54" >
              <v-icon dark> {{item.icon}} </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Search from "../../components/Search";
import LineChart from "../../components/LineChart";

export default {
  name: "dashboard",
  layout: 'forwarding',
  components: {Search, LineChart},
  async asyncData({$axios}) {
    var url = '/forwarding/dashboard';
    const response = await $axios.get(url);
    let chartData = response.data.chartData;
    let statuses = response.data.statuses;
    return {chartData, statuses};
  },
  data: () => ({
    menu2: '',
    date: '',
    //chartData: {},
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
    //statuses: [],
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
  })
}
</script>

<style scoped>
.vCardTitle { padding: 0 2px; }
#numBtn { padding: 0 !important; min-width: auto !important; font-weight: 800; }
.graph { padding: 0 10px; }
#line-chart {width: 100%;}
.v-menu__content{border-radius: 10px; box-shadow: 0 4px 14px 0 rgb(94 86 105 / 14%);}
.vlistTab3 {width: 130px; text-align: center;}
.vlistTab3 .v-list-item{border-bottom: 1px solid #f1f1f1;}
.vlistTab3 .v-list-item:last-child {border:none;}
.vlistTab3 .v-list-item:hover {background: #f7f7f7;cursor: pointer;}
</style>
