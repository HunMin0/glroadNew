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
      <v-data-table :headers="headers" :items="items"  :items-per-page="15">
        <template v-slot:item.title="{item}">
          <nuxt-link :to="`/contracts/${item.id}`">
            {{item.schedule.departure_date}} {{item.schedule.pol}} <v-icon x-small>mdi-arrow-right</v-icon> {{item.schedule.pod}}
          </nuxt-link>
        </template>
        <template v-slot:item.review_status="{item}">

          <v-dialog v-model="item.dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" text> {{ (item.review && item.review.created_at) ? '리뷰보기' : '작성하기' }} </v-btn>
            </template>
            <v-card>
              <v-card-text>
                <review-form :contract="item" @saved="init" @close="item.dialog = false"></review-form>
              </v-card-text>
            </v-card>
          </v-dialog>

        </template>
      </v-data-table>
    </v-card-text>
  </div>
</template>

<script>
import ReviewForm from "../../../components/ReviewForm";
export default {
  name: "reviews",
  components: {ReviewForm},
  mounted() {
    //console.log('mounted reviews');
    this.init();
  },
  data: () => ({
    headers: [
      {align: 'center', sortable: false, width: '10%', text: 'No', value: 'number'},
      {align: 'center', sortable: false, width: '60%', text: '거래내역', value: 'title'},
      {align: 'center', sortable: false, width: '10%', text: '완료일자', value: 'date'},
      {align: 'center', sortable: false, width: '10%', text: '리뷰상태', value: 'date'},
      {align: 'center', sortable: false, width: '10%', text: '리뷰보기', value: 'review_status'},
    ],
    items: [],
    searchItems: ['완료내역', '등록 리뷰', '미등록 리뷰'],
    seviceItem: [
      { title: '완료내역', num: 34},
      { title: '등록 리뷰', num: 24},
      { title: '미등록 리뷰', num: 10},
    ],
  }),
  methods: {
    async init() {
      const response = await this.$axios.get('/dashboard/reviews');
      this.items = response.data.data.items;
    }
  }
}
</script>

<style scoped>
  .cardFirstTxt {padding: 46px 0 20px; font-size: 16px; line-height: 27px; letter-spacing: -0.54px;color: #ababab;}
  .cardLastTxt {font-family: Arial; font-size: 32px; line-height: 38px;color: #ababab;padding-bottom: 46px;}
  .avtiveClassT p {color: #3d9cd2!important;}
</style>
