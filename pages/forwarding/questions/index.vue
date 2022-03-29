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
                    <v-icon class="iconMa">mdi-content-duplicate</v-icon> 문의 내역
                  </v-list-item-title>
                  <v-list-item-subtitle>상담문의 상태내역을 확인 해주세요.</v-list-item-subtitle>
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
                <v-data-table :headers="headers" :items="items" class="elevation-0 class-on-data-table setting-padding-lr tableset"
                      :options.sync="pagination" :server-items-length="totalItems" :loading="loading"
                      :items-per-page="15" :footer-props="{ itemsPerPageOptions: [15, 30, 35] }"
                      primary-key="index">
                <template v-slot:top>
                  <v-row>
                    <v-col>
                      <!--
                      <v-row>
                        <v-col>
                          <v-card-actions class="left-padding-0 right-padding-0 bottom-margin-16">
                            <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto" >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="date" color="#1976d2" label="조회기간" readonly outlined v-bind="attrs" v-on="on" hide-details="auto" prepend-inner-icon="mdi-calendar-text" ></v-text-field>
                              </template>
                              <v-date-picker v-model="date" @input="menu2 = false" ></v-date-picker> </v-menu>
                              <v-text-field color="#1976d2" outlined label="검색" hide-details="auto" prepend-inner-icon="mdi-magnify" class="setting-margin-lr" ></v-text-field>
                              <v-btn large  color="#3d9cd2" dark height="56" elevation="0" >검색</v-btn>
                          </v-card-actions>
                        </v-col>
                      </v-row>
                      -->
                      <!--<search :search-types="['dates', 'keyword']" @search-item="searchItem"></search>-->
                    </v-col>
                  </v-row>
                </template>
                <template v-slot:item.content="{item}">
                  <div style="max-width: 400px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;"> {{ item.content }} </div>
                </template>
                <template v-slot:item.created_at="{item}"> {{ $dayjsFormat(item.created_at) }}</template>
                <template v-slot:item.actions="{ item }">
                  <question-answer-dialog :id="item.id" @update="searchItem"></question-answer-dialog>
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
import QuestionDialog from "../../../components/QuestionDialog";
import QuestionAnswerDialog from "../../../components/QuestionAnswerDialog";

export default {
  name: "index",
  layout: "forwarding",
  components: {QuestionAnswerDialog, QuestionDialog, Search},
  watch: {
    pagination: { handler() { this.searchItem(); }, deep: true },
  },
  data: () => ({
    headers: [
      {align: 'left', sortable: false, text: '문의내용', value: 'content'},
      {align: 'center', sortable: false, text: '등록일시', value: 'created_at'},
      {align: 'center', sortable: false, text: '상태', value: 'status_text'},
      {align: 'center', sortable: false, text: '관리', value: 'actions'},
    ],
    search: {},
    totalItems: 0,
    items: [],
    loading: true,
    pagination: {},
     moreitems: [
      { title: '문의설정' },
      { title: '글쓰기' },
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

        var url = '/forwarding/questions';
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

<style>
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
