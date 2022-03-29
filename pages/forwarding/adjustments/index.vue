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
                    <v-icon class="iconMa">mdi-content-duplicate</v-icon> 정산관리
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    -정산내역은 화주 구매확정 이후에 확인하실 수 있습니다.<br/>
                    -정산예정일은 [구매확정일 +1일영업일] 기준으로 책정됩니다. 실제 정산일과 다를 수 있습니다.
                  </v-list-item-subtitle>
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
                  <template v-slot:top>
                    <search :search-types="['dates']" search-button="dates" justify="justify-end" @search-item="searchItem"></search>
                  </template>
                  <template v-slot:item.code="{item}">
                    <adjustment-dialog :item="item"></adjustment-dialog>
                  </template>
                  <template v-slot:item.purchase_confirmed_at="{item}"> {{ $dayjsFormat(item.purchase_confirmed_at, 'YYYY-MM-DD') }} </template>
                  <template v-slot:item.total_price="{item}"> {{ Number(item.total_price).toLocaleString() }}원 </template>
                  <template v-slot:item.fee="{item}"> {{ Number(item.fee).toLocaleString() }}원</template>
                  <template v-slot:item.adjustment_price="{item}"> {{ Number(item.adjustment_price).toLocaleString() }}원 </template>
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
import AdjustmentDialog from "../../../components/AdjustmentDialog";
import Search from "../../../components/Search";

export default {
  name: "index",
  components: {AdjustmentDialog, Search},
  layout: "forwarding",
  watch: {
    pagination: { handler() { this.searchItem(); }, deep: true },
  },
  data: () => ({
    headers: [
      {align: 'center', sortable: false, text: '접수코드', value: 'code'},
      {align: 'center', sortable: false, text: '구매확정일', value: 'purchase_confirmed_at'},
      {align: 'center', sortable: false, text: '결제금액', value: 'total_price'},
      {align: 'center', sortable: false, text: '수수료', value: 'fee'},
      {align: 'center', sortable: false, text: '정산금액', value: 'adjustment_price'},
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

        var url = '/forwarding/adjustments';
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
  }
}
</script>

<style scoped>

</style>
