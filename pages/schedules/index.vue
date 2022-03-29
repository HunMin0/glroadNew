<template>
  <v-container class="mypageBg layouts-bottom" fluid>
    <v-row class="justify-center">
      <v-col>
        <v-container>
          <v-row class="justify-center">
            <v-col cols="12" xl="9">
              <div class="vCardBg mypageMP">
                <v-card class="mx-auto d-flex" elevation="0">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="text-h5 mb-0">
                        <router-link to="/">
                          <v-btn icon class="iconMa ma-0"> <v-icon>mdi-arrow-left-thick</v-icon> </v-btn>
                        </router-link>
                        스케줄 검색조회 <span class="titleSpan">검색조건에 따른 스케줄 조회결과 입니다.</span>
                      </v-list-item-title>
                    </v-list-item-content>&nbsp;
                    <!--v-btn outlined text :to="localePath({name: 'index'})"-->
                    <v-btn outlined text @click="displayScheduleSearch = !displayScheduleSearch">
                      <v-icon>mdi-format-list-checks</v-icon>&nbsp;검색조건 변경
                    </v-btn>
                  </v-list-item>
                </v-card>
              </div>
            </v-col>
          </v-row>
          <v-row v-show="displayScheduleSearch" class="justify-center">
            <v-col cols="12" xl="9" class="pa-5">
              <schedule-search type="reload" @search="getList"></schedule-search>
            </v-col>
          </v-row>

          <v-row class="justify-center">
            <v-col cols="12" xl="9">
              <div class="vCardBg top-padding-0 left-padding-0 right-padding-0 bottom-padding-0">
                <v-card flat class="cardTitleBox">
                  <v-icon class="iconMa">mdi-television-guide</v-icon>
                  검색조건<p class="tispan bottom-margin-0">입력하신 검색조건을 확인해주세요.</p>
                </v-card>
                <v-card tile elevation="0">
                  <v-card-text>
                    <table id="tableSet">
                      <tr>
                        <th class="thSize">
                          <v-icon class="iconStyle">mdi-ferry</v-icon>
                          <p>출발항(POL)</p></th>
                        <th rowspan="2"> <v-icon>mdi-arrow-right-thick</v-icon> </th>
                        <th class="thSize">
                          <v-icon class="iconStyle">mdi-map-marker</v-icon>
                          <p>도착항(POD)</p></th>
                        <th rowspan="2"> <v-icon color="#ddd">mdi-ray-vertex</v-icon> </th>
                        <th class="thSize">
                          <v-icon class="iconStyle">mdi-calendar-clock</v-icon>
                          <p>출발일</p></th>
                        <th rowspan="2"> <v-icon color="#ddd">mdi-ray-vertex</v-icon> </th>
                        <th class="thSize">
                          <v-icon class="iconStyle">mdi-forklift</v-icon>
                          <p>컨테이너종류</p></th>
                        <th rowspan="2"> <v-icon color="#ddd">mdi-ray-vertex</v-icon> </th>
                        <th class="thSize">
                          <v-icon class="iconStyle">mdi-scale</v-icon>
                          <p>화물중량</p></th>
                      </tr>
                      <tr>
                        <td>[{{ (search.pol) ? search.pol : '미설정' }}]</td>
                        <td>[{{ (search.pod) ? search.pod : '미설정' }}]</td>
                        <td>[{{ (search.departure_date) ? search.departure_date : '미설정' }}]</td>
                        <td>[{{ (search.container) ? search.container.text : '조건없음' }}]</td>
                        <td>[{{ (search.cbm && search.kg) ? `${search.cbm}CBM / ${search.kg}kg 이상` : '조건없음' }}]</td>
                      </tr>
                    </table>
                  </v-card-text>
                </v-card>
              </div>
            </v-col>
          </v-row>

          <v-row class="justify-center">
            <v-col cols="12" xl="9">
              <div class="vCardBg top-padding-0 left-padding-0 right-padding-0 ">
                <v-card flat class="cardTitleBox">
                  <v-icon class="iconMa">mdi-format-rotate-90</v-icon>
                  검색결과 <span class="secColor">({{ meta.total }})</span>
                  <p class="tispan bottom-margin-0">해상운송비용 기준 (픽업옵션비용 제외)</p>
                </v-card>
                <v-card flat class="setting-padding-lr-40">
                  <v-tabs class="mx-auto ma" height="120" fixed-tabs>
                    <v-tabs-slider color="#3d9cd2"></v-tabs-slider>
                    <v-tab @click="sortBy = 'price'" active-class="avtiveClassT" class="tabBoarder" :ripple="false">
                      <div class="cardSetting">
                        <p class="cardFirstTxt">최저가</p>
                        <p class="cardLastTxt">{{ Number(meta.lowest_price).toLocaleString() }} KRW</p>
                      </div>
                    </v-tab>
                    <v-tab @click="sortBy = 'arrival_date'" elevation="0" class="text-center tabBoarder"
                           active-class="avtiveClassT" :ripple="false">
                      <div class="cardSetting">
                        <p class="cardFirstTxt">빠른도착</p>
                        <p class="cardLastTxt"> {{ $dayjsFormat(meta.fast_arrival) }}</p>
                      </div>
                    </v-tab>
                    <v-tab @click="sortBy = 'departure_date'" elevation="0" class="text-center tabBoarder"
                           active-class="avtiveClassT" :ripple="false">
                      <div class="cardSetting">
                        <p class="cardFirstTxt">빠른출발</p>
                        <p class="cardLastTxt">{{ $dayjsFormat(meta.quick_departure) }}</p>
                      </div>
                    </v-tab>
                  </v-tabs>

                  <table id="tableSet2">
                    <tr>
                      <th>스케줄</th>
                      <th>소요시간</th>
                      <th v-if="!transitTypeFcm">조건</th>
                      <th>해상운임</th>
                      <th>상태</th>
                    </tr>
                    <template v-if="schedules.length < 1">
                      <tr> <td :colspan="!transitTypeFcm ? 5: 4" class="text-center"> 검색된 스케줄이 없습니다. </td> </tr>
                    </template>
                    <tr v-for="(item, index) in schedules" :key="item.title">
                      <td>
                        <v-list-item-title>
                          <!--v-html='`${$dayjsFormat(item.departure_date/* +" "+ item.departure_time*/)} ~ ${$dayjsFormat(item.arrival_date/* +" "+ item.arrival_time*/)}`'-->
                          {{ $dayjsFormat(item.departure_date/* +" "+ item.departure_time*/, 'YYYY-MM-DD') }} ~
                          {{ $dayjsFormat(item.arrival_date/* +" "+ item.arrival_time*/, 'YYYY-MM-DD') }}
                        </v-list-item-title>
                      </td>
                      <td>{{ item.expected_delivery_days_text }}</td>
                      <td v-if="!transitTypeFcm">{{ `${item.incoterms_name} | 잔여 ${item.remain_cbm}CBM` }}</td>
                      <td>{{ Number(item.price).toLocaleString() }} KRW</td>
                      <td class="lastTd">
                        <question-dialog type="schedule" :id="item.id"></question-dialog>
                        <template v-if="item.contract_id > 0">
                          <v-btn color="#3d9cd2" dark elevation="0">
                            <v-icon small class="bmt">mdi-calendar-check</v-icon>&nbsp;예약중
                          </v-btn>
                        </template>
                        <template v-else>
                          <v-btn color="#3d9cd2" :to="`/schedules/${item.id}`" dark elevation="0">
                            <v-icon small class="bmt">mdi-calendar-check</v-icon>&nbsp;스케줄 접수
                          </v-btn>
                        </template>
                      </td>
                    </tr>
                  </table>
                  <v-card-actions class="justify-center vBtfoot">
                    <v-btn text @click="page++" width="100%" outlined min-height="60">
                      <v-icon>mdi-plus</v-icon> 더 보기
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </div>
            </v-col>
          </v-row>
          <!--v-list-item-subtitle> {{ `${item.container_name} | 잔여 ${item.remain_cbm}CBM` }}</v-list-item-subtitle-->
          <!--v-list-item-action>
            <v-btn icon :to="`/schedules/${item.id}`"> <v-icon> mdi-chevron-right</v-icon> </v-btn>
          </v-list-item-action-->
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";
import AppBar from "../../components/AppBar";
import QuestionDialog from "../../components/QuestionDialog";
import ScheduleSearch from "../../components/ScheduleSearch";
export default {
  name: "index.vue",
  components: {AppBar, ScheduleSearch, QuestionDialog},
  mounted() {
    this.getList();
  },
  /*async asyncData({params, $axios, store}) {
    const data = await $axios.$get('/schedules/1', {params: store.state.schedule.search});
    console.log(data)
    return {...data}
  },*/
  computed: {
    ...mapGetters(['_CONST_']),
    ...mapGetters('schedule', ['search']),
    transitTypeFcm() {
      return this.search.transit_type_id === this._CONST_.TRANSIT_TYPE_FCL_ID;
    }
  },
  watch: {
    page() {
      this.getList();
    },
    sortBy() {
      this.page = 1;
      this.getList();
    }
  },
  data: () => ({
    page: 1, sortBy: 'price', schedules: [], meta: {},
    displayScheduleSearch: false,
  }),
  methods: {
    async getList() {
      const data = await this.$axios.$get('/schedules', {
        params: {
          page: this.page,
          search: JSON.stringify(this.search),
          sortBy: this.sortBy, sortDesc: false
        }
      });
      if (this.page === 1) {
        this.schedules = data.schedules;
      } else {
        this.schedules.push(...data.schedules);
      }
      this.meta = data.meta;
    }
  }
}
</script>

<style scoped>
  .mypageMP {margin: 50px 0 10px;}
  #tableSet {width: 100%; text-align: center; margin: 40px 0;}
  #tableSet td {color: #111;}
  .iconStyle {background: #f1f1f1; border-radius: 50%; padding: 14px; margin-bottom: 10px;}
  .thSize {width: 20%;}
  #tableSet2  {width: 100%; text-align: left; border-radius: 10px;  border-collapse: collapse; margin: 50px 0 40px;}
  #tableSet2 th {color: #5e5669de; font-size: 12px; background: #fafafa; text-align: center; padding: 14px 0; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd;}
  #tableSet2 td {font-size: 14px; padding: 18px; border-bottom: 1px solid #e0e0e0;}
  #tableSet2 td:first-child {width: 154px;}
  #tableSet2 td:last-child {font-weight: 800;}
  #tableSet2 tr:last-child td {border-bottom: none;}
  .colHeight {padding-top: 20px; margin-bottom: 10px;}
  .colPadding {padding-top: 2px;}
  .minHeight {min-height: 420px;}
  .btnStyle2 {width: 100%; background: #fff!important; border: 1px solid #ddd; padding: 28px 0!important;}
  .tabBoarder {border: 1px solid #ddd;}
  .cardFirstTxt {font-size: 15px; color: #ababab;}
  .cardLastTxt {font-family: Arial; font-size: 30px; line-height: 18px; color: #ababab;}
  .avtiveClassT p {color: #3d9cd2!important;}
  .avtiveClassT {border: 1px solid #3d9cd2;}
  .ma {margin-top: 40px;}
  .cardTitleBox {background: #fafafa; position: relative; padding: 20px 44px; color: #333; font-weight: 500; border-bottom: 4px solid #f0f0f0;}
  .tispan {color: #999; font-size: 12px; position: absolute; right: 48px; top: 25px;}
  .secColor {color: #dd7070;}
  .lastTd {width: 27%;}
  .vBtfoot {margin-bottom: 14px;}
  @media (max-width: 960px) {
    #tableSet { margin-bottom: 0; }
    .dFlex { display: unset !important; }
    .setLeft { width: 100%; }
    .thSize { width: auto !important; }
  }
  @media (max-width: 590px) {
    #tableSet { display: grid; }
  }
</style>
