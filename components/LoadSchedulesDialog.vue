<template>
  <v-dialog v-model="dialog" persistent fullscreen>
    <template v-slot:activator="{ on, attrs }">
      <v-btn  v-bind="attrs" v-on="on" elevation="0" color="#f4f5fa"> <v-icon>mdi-playlist-check</v-icon>&nbsp;지난 상품정보 불러오기 </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">지난 상품정보 불러오기</v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="items" disable-pagination hide-default-footer>
          <template v-slot:item.remain_cbm="{item}"> {{ item.remain_cbm }} CBM</template>
          <template v-slot:item.price="{item}"> {{ Number(item.price).toLocaleString()}}원</template>
          <template v-slot:item.actions="{ item }">
            <v-btn small @click="select(item.id)">선택</v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "LoadSchedulesDialog",
  watch: {
    dialog: {
      immediate: true,
      handler(value) {
        if (value) {
          this.init();
        }
      }
    }
  },
  data: () => ({
    dialog: false,
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
    items: [],
  }),
  methods: {
    async init() {
      const response = await this.$axios.get('/forwarding/last-schedules');
      this.items = response.data.data;
    },
    select(id) {
      this.$router.push(`/forwarding/schedules/${id}/?type=create`);
      this.dialog = false;
    }
  }
}
</script>

<style scoped>

</style>
