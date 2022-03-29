<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col class="height100vh">
        <v-tabs>
          <v-tab to="/admin/payments">결제확인</v-tab>
          <v-tab to="/admin/accounts">입금내역</v-tab>
        </v-tabs>
        <div class="vCardBg">
          <v-row>
            <v-col>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h5 mb-0">
                    <v-icon class="iconMa">mdi-content-duplicate</v-icon> 결제관리
                  </v-list-item-title>
                  <v-list-item-subtitle></v-list-item-subtitle>
                </v-list-item-content>
                <v-menu bottom left>
                  <template v-slot:activator="{ on, attrs }" >
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list class="vlistTab3 top-padding-0 bottom-padding-0">
                    <!--v-list-item v-for="(item, i) in moreitems" :key="i">
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-->
                  </v-list>
                </v-menu>
              </v-list-item>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="setting-padding-lr">
              <v-data-table :headers="headers" :items="items" class="elevation-0 class-on-data-table setting-padding-lr tableset"
                            :options.sync="pagination" :server-items-length="totalItems" :loading="loading"
                            :items-per-page="15" :footer-props="{ itemsPerPageOptions: [15, 30, 35] }"
                            primary-key="index">

                <template v-slot:item.number="{item}">
                  {{ totalItems - (pagination.itemsPerPage * (pagination.page - 1)) - items.indexOf(item) }}
                </template>
                <template v-slot:item.bkinput="{item}">{{ Number(item.bkinput).toLocaleString() }}</template>
                <template v-slot:item.bkoutput="{item}">{{ Number(item.bkoutput).toLocaleString() }}</template>
                <template v-slot:item.bkjango="{item}">{{ Number(item.bkjango).toLocaleString() }}</template>
                <template v-slot:item.memo ="{ item }">
                  <v-menu v-model="item.menu_memo" :close-on-content-click="false" min-width="300px">
                    <template v-slot:activator="{ on: menu, attrs }">
                      <v-tooltip bottom max-width="300">
                        <template v-slot:activator="{ on: tooltip }">
                          <div v-bind="attrs" v-on="{ ...tooltip, ...menu }">
                            <template v-if="item.memo"> {{item.memo.substring(0, 10)}}</template>
                            <template v-else><v-icon small> mdi-clipboard-edit-outline </v-icon></template>
                          </div>
                        </template>
                        <span>{{item.memo}}</span>
                      </v-tooltip>
                    </template>
                    <v-card>
                      <v-card-title>메모 상세내용</v-card-title>
                      <v-divider></v-divider>
                      <v-card-text> <v-textarea v-model="item.memo_new" outlined></v-textarea> </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="item.menu_memo = false"> Cancel </v-btn>
                        <v-btn color="primary" text @click="saveMemo(item)"> Save </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
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
import {mapActions, mapGetters} from "vuex";

export default {
  name: "accounts",
  layout: "admin",
  computed: {
    ...mapGetters(['_CONST_']),
  },
  watch: {
    pagination: { handler() { this.searchItem(); }, deep: true },
  },
  data: () => ({
    headers: [
      {align: 'center', sortable: false, text: '거래일시', value: 'bk_date_time'},
      {align: 'center', sortable: false, text: '입금자명', value: 'bkjukyo'},
      {align: 'center', sortable: false, text: '은행', value: 'bkname'},
      {align: 'center', sortable: false, text: '입금금액', value: 'bkinput'},
      {align: 'center', sortable: false, text: '출금금액', value: 'bkoutput'},
      {align: 'center', sortable: false, text: '잔액', value: 'bkjango'},
      {align: 'center', sortable: false, text: '비고', value: 'memo'},
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

        var url = '/admin/accounts';
        url += '?page=' + ((page > 0) ? page : 0);
        url += '&itemsPerPage=' + ((itemsPerPage > 0) ? +itemsPerPage : 0);
        if (Object.keys(this.search).length > 0) url += '&search=' + JSON.stringify(this.search);

        this.$axios.get(url).then((response) => {
          let items = response.data.data;
          /*const meta = response.data.meta; resolve({items, meta})*/
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
    saveMemo(item) {
      this.$axios.put('/admin/accounts/' + item.id + '/memo', {memo: item.memo_new}).then(response => {
        item.memo = item.memo_new;
      }).catch(error => {
        //console.log(error);
        this.showSnackbar({show: true, message: 'Error: ', color: 'error'});
      }).finally(() => {
        item.menu_memo = false
      });
    }
  }
}
</script>

<style scoped>

</style>
