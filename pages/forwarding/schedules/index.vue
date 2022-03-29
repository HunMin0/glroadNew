<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col class="height100vh">
        <div class="vCardBg">
          <v-row>
            <v-col>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h5 mb-0">
                    <v-icon class="iconMa">mdi-clipboard-outline</v-icon> 스케줄관리 내역
                  </v-list-item-title>
                  <v-list-item-subtitle>스케줄 등록된 상태내역을 확인 해주세요.</v-list-item-subtitle>
                </v-list-item-content>

                 <v-btn class="ml-2 writebtn" elevation="0" to="/forwarding/schedules/0">
                  <v-avatar tile size="22">
                    <img src="/images/write.png" alt="write">
                  </v-avatar>
                  &nbsp;스케줄등록</v-btn>

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
                <v-data-table :headers="headers" :items="items" class="elevation-0 class-on-data-table setting-padding-lr tableset"
                      :options.sync="pagination" :server-items-length="totalItems" :loading="loading"
                      :items-per-page="15" :footer-props="{ itemsPerPageOptions: [15, 30, 35] }"
                      primary-key="index">
                <template v-slot:top>
                  <v-row>
                    <v-col>
                      <!--
                      <v-card-actions class="left-padding-0 right-padding-0 bottom-margin-16">
                      <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto" >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field v-model="date" color="#1976d2" label="조회기간" readonly outlined v-bind="attrs" v-on="on" hide-details="auto" prepend-inner-icon="mdi-calendar-text" ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" @input="menu2 = false" ></v-date-picker>
                      </v-menu>
                      <v-text-field color="#1976d2" outlined label="검색" hide-details="auto" prepend-inner-icon="mdi-magnify" class="setting-margin-lr" ></v-text-field>
                      <v-btn large  color="#3d9cd2" dark height="56" elevation="0" >검색</v-btn>
                      </v-card-actions>
                      -->
                      <!--<search :search-types="['dates', 'keyword']" @search-item="searchItem"></search>-->
                    </v-col>
                  </v-row>
                </template>
                <template v-slot:item.remain_cbm="{item}"> {{ item.remain_cbm }} CBM</template>
                <template v-slot:item.price="{item}"> {{ Number(item.price).toLocaleString()}}원</template>
                <template v-slot:item.actions="{ item }">
                  <v-btn small :to="`/forwarding/schedules/${item.id}`" class="replebtn" elevation="0" title="수정"><v-icon small>mdi-pencil-circle-outline</v-icon>&nbsp;수정</v-btn>
                  <v-btn small :to="`/forwarding/schedules/${item.id}/?type=create`" class="replebtn" elevation="0" title="재등록"><v-icon small>mdi-vector-arrange-above</v-icon>&nbsp;재등록</v-btn>
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
import {mapActions} from "vuex";
import Search from "../../../components/Search";
import ScheduleUploadDialog from "../../../components/ScheduleUploadDialog";

export default {
  name: "index",
  layout: "forwarding",
  components: {ScheduleUploadDialog, Search},
  watch: {
    pagination: { handler() { this.searchItem(); }, deep: true },
  },
  data: () => ({
    headers: [
      {align: 'center', sortable: false, text: '분류', value: 'transit_type_name'},
      {align: 'center', sortable: false, text: '출발항', value: 'pol_fullname'},
      {align: 'center', sortable: false, text: '도착항', value: 'pod_fullname'},
      {align: 'center', sortable: false, text: '출발일', value: 'departure_date'},
      {align: 'center', sortable: false, text: '도착일', value: 'arrival_date'},
      {align: 'center', sortable: false, text: '컨데이터', value: 'container_name'},
      {align: 'center', sortable: false, text: '잔여량', value: 'remain_cbm'},
      {align: 'center', sortable: false, text: '금액', value: 'price'},
      {align: 'center', sortable: false, text: '관리', value: 'actions'},
    ],
    search: {},
    totalItems: 0,
    items: [],
    loading: true,
    pagination: {},
    moreitems: [
      { title: '스케줄설정' },
      { title: '스케줄등록' },
      { title: '수정하기' },
      { title: '삭제하기' },
    ],
  }),
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    getDataFromApi() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const { sortBy, sortDesc, page, itemsPerPage } = this.pagination;

        var url = '/forwarding/schedules';
        url += '?page=' + ((page > 0) ? page : 0);
        url += '&itemsPerPage=' + ((itemsPerPage > 0) ? +itemsPerPage : 0);
        if (Object.keys(this.search).length > 0) url += '&search=' + JSON.stringify(this.search);

        this.$axios.get(url).then((response) => {
          let items = response.data.data;
          /*const meta = response.data.meta;
          resolve({items, meta})*/
          const total = response.data.total;
          resolve({items, total})
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
      })
    },
    download() {
      /*let url = _API_URL_ + '/host/bookings/export';
      if (Object.keys(this.search).length > 0) url += '?search=' + JSON.stringify(this.search);
      location.href = url;*/
    }
  }
}
</script>

<style scoped>
.vCardTitle {padding: 0 2px;}
#numBtn {padding: 0!important; min-width: auto !important; font-weight: 800;}
#line-chart {width: 100%;}
.v-menu__content{border-radius: 10px; box-shadow: 0 4px 14px 0 rgb(94 86 105 / 14%);}
.vlistTab3 {width: 130px; text-align: center;}
.vlistTab3 .v-list-item{border-bottom: 1px solid #f1f1f1;}
.vlistTab3 .v-list-item:last-child {border:none;}
.vlistTab3 .v-list-item:hover {background: #f7f7f7;cursor: pointer;}
.replebtn {background: #f8f8f8!important; border: 1px solid #e7e7e7;padding: 0 10px!important;}
</style>
