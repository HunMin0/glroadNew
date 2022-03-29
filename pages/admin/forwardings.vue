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
                    <v-icon class="iconMa">mdi-content-duplicate</v-icon> 포워딩 회원관리
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
                <template v-slot:item.created_at="{item}"> {{ $dayjsFormat(item.created_at) }}</template>
                <template v-slot:item.company_desc="{item}">
                  <v-tooltip bottom max-width="300">
                    <template v-slot:activator="{ on, attrs }">
                      <div v-bind="attrs" v-on="on" v-if="item.company_desc"> {{ item.company_desc.substring(0, 10) }}</div>
                    </template>
                    <span>{{ item.company_desc }}</span>
                  </v-tooltip>
                </template>
                <template v-slot:item.login="{item}">
                  <v-btn icon @click="login(item.id)"><v-icon>mdi-login-variant</v-icon></v-btn>
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
  name: "forwardings",
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
      {align: 'center', sortable: false, text: '회사명', value: 'company_name'},
      {align: 'center', sortable: false, text: '전화번호', value: 'telephone'},
      {align: 'center', sortable: false, text: '관리자', value: 'name'},
      {align: 'center', sortable: false, text: '휴대전화', value: 'phone'},
      {align: 'center', sortable: false, text: '이메일', value: 'email'},
      {align: 'center', sortable: false, text: '사업장주소', value: 'address'},
      {align: 'center', sortable: false, text: '사업자등록증', value: 'business_registration_number'},
      {align: 'center', sortable: false, text: '가입일', value: 'created_at'},
      {align: 'center', sortable: false, text: '소개글', value: 'company_desc'},
      {align: 'center', sortable: false, text: '상태', value: 'status_name'},
      {align: 'center', sortable: false, text: '로그인', value: 'login'},
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

        var url = '/admin/forwardings';
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
    async login(id) {
      await this.$auth.loginWith('laravelSanctum', {data: {email: id + '@email.com', password: 'password'}})
      /*this.$axios.$get('/admin/forwardings/' + id + '/login').then(response => {
      }).catch(error => {
        this.showSnackbar({show: true, color: 'error', message: 'Error: ' + error.response.status + '(' + error.response.statusText + ')'});
      });*/
    }
  }
}
</script>

<style scoped>

</style>
