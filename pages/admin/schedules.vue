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
                    <v-icon class="iconMa">mdi-content-duplicate</v-icon> 스케줄관리
                  </v-list-item-title>
                  <v-list-item-subtitle></v-list-item-subtitle>
                </v-list-item-content>
                <v-menu bottom left>
                  <!--template v-slot:activator="{ on, attrs }" >
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list class="vlistTab3 top-padding-0 bottom-padding-0">
                    <v-list-item v-for="(item, i) in moreitems" :key="i">
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list-->
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
                <template v-slot:item.price="{item}">{{ Number(item.price).toLocaleString() }}원</template>
                <template v-slot:item.document_deadline_datetime="{item}">
                  {{ $dayjsFormat(item.document_deadline_date + " " + item.document_deadline_time) }}
                </template>
                <template v-slot:item.warehouse_deadline_datetime="{item}">
                  {{ $dayjsFormat(item.warehouse_deadline_date + " " + item.warehouse_deadline_time) }}
                </template>
                <template v-slot:item.created_at="{item}"> {{ $dayjsFormat(item.created_at) }}</template>
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
  name: "schedules",
  layout: "admin",
  computed: {
    ...mapGetters(['_CONST_']),
  },
  watch: {
    pagination: { handler() { this.searchItem(); }, deep: true },
  },
  data: () => ({
    headers: [
      {align: 'center', sortable: false, text: 'ID', value: 'id'},
      {align: 'center', sortable: false, text: '분류', value: 'transit_type_name'},
      {align: 'center', sortable: false, text: '출발항', value: 'pol'},
      {align: 'center', sortable: false, text: '도착항', value: 'pod'},
      {align: 'center', sortable: false, text: '출발일', value: 'departure_date'},
      {align: 'center', sortable: false, text: '도착일', value: 'arrival_date'},
      {align: 'center', sortable: false, text: '컨테이너', value: 'container_name'},
      {align: 'center', sortable: false, text: '잔여량', value: 'remain_cbm'},
      {align: 'center', sortable: false, text: '인코텀즈', value: 'incoterms_name'},
      {align: 'center', sortable: false, text: '운송금액', value: 'price'},
      {align: 'center', sortable: false, text: '서류마감일시', value: 'document_deadline_datetime'},
      {align: 'center', sortable: false, text: '창고마감일시', value: 'warehouse_deadline_datetime'},
      {align: 'center', sortable: false, text: '진행단계', value: 'contract.status_name'},
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

        var url = '/admin/schedules';
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
    }
  }
}
</script>

<style scoped>

</style>
