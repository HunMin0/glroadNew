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
                    <v-icon class="iconMa">mdi-content-duplicate</v-icon> 결제확인
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
                  <template v-slot:item.estimated_at="{item}"> {{ $dayjsFormat(item.estimated_at) }}</template>
                  <template v-slot:item.payment_deadline_datetime="{item}">{{ $dayjsFormat(item.payment_deadline_datetime) }}</template>

                  <template v-slot:item.price="{item}"> {{ Number(item.price).toLocaleString() }}원 </template>
                  <template v-slot:item.pickup_price="{item}"> {{ Number(item.pickup_price).toLocaleString() }}원 </template>
                  <template v-slot:item.document_agency_price="{item}"> {{ Number(item.document_agency_price).toLocaleString() }}원</template>
                  <template v-slot:item.total_price="{item}"> {{ Number(item.total_price).toLocaleString() }}원 </template>

                  <template v-slot:item.actions="{item}">
                    <template v-if="item.paymented_at"> {{ $dayjsFormat(item.paymented_at) }} </template>
                    <v-btn v-else small :disabled="disabledSave(item)" @click="save(item)">결제처리</v-btn>
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
  name: "payments",
  layout: "admin",
  computed: {
    ...mapGetters(['_CONST_']),
  },
  watch: {
    pagination: { handler() { this.searchItem(); }, deep: true },
  },
  data: () => ({
    headers: [
      {align: 'center', sortable: false, text: '최종견적일시', value: 'estimated_at'},
      {align: 'center', sortable: false, text: '결제마감일시', value: 'payment_deadline_datetime'},
      {align: 'center', sortable: false, text: '화주', value: 'member.name'},
      {align: 'center', sortable: false, text: '운송비', value: 'price'},
      {align: 'center', sortable: false, text: '픽업비', value: 'pickup_price'},
      {align: 'center', sortable: false, text: '서류대행비', value: 'document_agency_price'},
      {align: 'center', sortable: false, text: '총 결제금액', value: 'total_price'},
      {align: 'center', sortable: false, text: '상태', value: 'status_name'},
      {align: 'center', sortable: false, text: '결제일시', value: 'actions'},
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

        var url = '/admin/payments';
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
    disabledSave(item) {
      return !this._CONST_.PAYMENT_CONFIRM_STATUSES.includes(item.status);
    },
    async save(item) {
      try {
        //if (!confirm("하시겠습니까?")) return false;
        const data = await this.$axios.$put('/admin/payments/'+item.id+'/confirm')
        if (data.result) {
          this.showSnackbar({show: true, color: 'success', message: '상태가 변경되었습니다.'});
          this.searchItem();
        } else {
          this.showSnackbar({show: true, color: 'error', message: data.message});
        }
      } catch (e) {
        //console.log(e);
        this.showSnackbar({show: true, color: 'error', message: ''});
      }
    }
  }
}
</script>

<style scoped>

</style>
