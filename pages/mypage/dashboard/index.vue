<template>
  <div>
    <div class="columLine-bottom bottom-margin-16">
      <v-tabs class="mx-auto" height="150" fixed-tabs>
        <v-tabs-slider color="#3d9cd2"></v-tabs-slider>
        <v-tab v-for="(item, i) in seviceItem" :key="i" elevation="0" class="text-center" active-class="avtiveClassT" :ripple="false">
          <div class="cardSetting">
            <p class="cardFirstTxt">{{item.title}}</p>
            <p class="cardLastTxt">{{item.num}}</p>
           </div>
        </v-tab>
      </v-tabs>
    </div>

    <v-card flat class="setting-margin-tb">
      <v-row class="setting-padding-lr">
        <v-col>
            <v-card-actions class="left-padding-0 right-padding-0">
              <v-autocomplete v-model="value" :items="searchItems" outlined label="상태선택" class="setting-margin-r maxWidth-180" hide-details="auto"></v-autocomplete>
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    class="maxWidth-250"
                    color="#1976d2"
                    label="조회일자"
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
                label="검색어 입력"
                hide-details="auto"
                prepend-inner-icon="mdi-magnify"
                class="setting-margin-lr"
              ></v-text-field>
              <v-btn large  color="#3d9cd2" dark height="56" elevation="0" >검색</v-btn>
            </v-card-actions>
          </v-col>
      </v-row>
      <!-- <search :search-types="['dates']" search-button="dates" justify="justify-center"></search> -->
    </v-card>

    <v-card-text>
      <v-data-table :headers="headers" :items="items" :items-per-page="15" >
        <template v-slot:item.title="{item}">
          <nuxt-link :to="`/contracts/${item.id}`">
            {{item.schedule.departure_date}} {{item.schedule.pol}} <v-icon x-small>mdi-arrow-right</v-icon> {{item.schedule.pod}}
          </nuxt-link>
        </template>
      </v-data-table>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: "schedules",
  async mounted() {
    //console.log('mounted schedules');
    const response = await this.$axios.get('/dashboard/schedules');
    //console.log('data', response.data.data)
    return this.items = response.data.data.items;
  },
  data: () => ({
    headers: [
      {align: 'center', sortable: false, width: '10%', text: 'No', value: 'number'},
      {align: 'center', sortable: false, width: '60%', text: '스케줄정보', value: 'title'},
      {align: 'center', sortable: false, width: '30%', text: '상태', value: 'status_name'},
    ],
    items: [],
    searchItems: ['전체', '신규접수', '계약완료', '구매확정', '견적발행', '취소완료', '운송완료'],
    seviceItem: [
      { title: '전체', num: 164},
      { title: '신규접수', num: 24},
      { title: '계약완료', num: 20},
      { title: '구매확정', num: 23},
      { title: '견적발행', num: 33},
      { title: '취소완료', num: 12},
      { title: '운송완료', num: 52},
    ],
  })
}
</script>

<style scoped>
  .cardFirstTxt {padding: 46px 0 20px; font-size: 16px; line-height: 27px; letter-spacing: -0.54px;color: #ababab;}
  .cardLastTxt {font-family: Arial; font-size: 32px; line-height: 38px;color: #ababab;padding-bottom: 46px;}
  .avtiveClassT p {color: #3d9cd2!important;}
</style>
