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

    <v-card-text class="qnatable">
      <v-data-table :headers="headers" :items="items"  :items-per-page="15"
        show-expand >
        <!--template v-slot:item.title="{item}">
          <nuxt-link :to="`/contracts/${item.id}`">
            {{item.schedule.departure_date}} {{item.schedule.pol}} <v-icon x-small>mdi-arrow-right</v-icon> {{item.schedule.pod}}
          </nuxt-link>
        </template-->
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" >
            <v-card flat class="tpadding">

              <v-card flat class="d-flex justify-space-between lpadding text">
                <p class="colorStyle1"><v-icon small>mdi-help-circle-outline</v-icon> {{item.content}}</p>
                <p class="titmeDate">접수일 &nbsp;<span class="lin">I</span>&nbsp; {{$dayjsFormat(item.created_at)}} &nbsp;<span class="lin">I</span>&nbsp; 미답변</p>
              </v-card>

              <v-card-text v-if="item.answered_at">
              <v-card elevation="0" class="qnabox d-flex justify-space-between text2">
                <p class="colorStyle1 bottom-margin-0"><v-icon small>mdi-headset</v-icon> 담당자 답변 </p>
                <p class="colorStyle1 bottom-margin-0">답변일 &nbsp;<span class="lin">I</span>&nbsp; {{$dayjsFormat(item.answered_at)}}</p>
              </v-card>
                <v-card flat class="lpadding lpdd">
                  <v-card-subtitle><v-icon small>mdi-subdirectory-arrow-right</v-icon> {{item.answer}}</v-card-subtitle>
                </v-card>
              </v-card-text>
            </v-card>
          </td>
        </template>
      </v-data-table>
    </v-card-text>

  </div>
</template>

<script>
export default {
  name: "questions",
  async mounted() {
    //console.log('mounted questions');
    const response = await this.$axios.get('/dashboard/questions');
    //console.log('data', response.data.data)
    return this.items = response.data.data.items;
  },
  data: () => ({
    headers: [
      {align: 'center', sortable: false, width: '10%', text: 'No', value: 'number'},
      {align: 'left', sortable: false, width: '60%', text: '문의내용', value: 'content'},
      {align: 'center', sortable: false, width: '10%', text: '접수일자', value: 'date'},
      {align: 'center', sortable: false, width: '10%', text: '상태', value: 'status_text'},
      {align: 'center', sortable: false, width: '10%', text: '답변보기', value: 'data-table-expand' },
    ],
    items: [],
    searchItems: ['전체문의', '접수문의', '답변완료'],
    seviceItem: [
      { title: '전체문의', num: 34},
      { title: '접수문의', num: 24},
      { title: '답변완료', num: 10},
    ],
  })
}
</script>

<style scoped>
  .text p:last-child{color: #898989;}
  .text2 {padding: 20px;}
  .text2 p:last-child {color:#898989; font-weight: 500;}
  .titmeDate {min-width: 250px; text-align: right;}
  .tpadding {padding: 10px 0 40px;}
  .lpadding {padding: 20px 20px 0;}
  .lpdd {background: #eff2f6; padding-bottom: 40px; border-radius: 0; padding-left: 30px; padding-right: 30px;}
  .qnabox {border-top: 2px solid #3d9cd2; border-bottom: 2px solid #fff;border-radius: 0;background: #eff2f6;}
  .lpadding .v-card__subtitle {line-height: 0; padding-bottom: 0; padding-left: 0;}
  .colorStyle1 {font-weight: 600; color: #686868}
  .lin {color: #ddd}
  .cardFirstTxt {padding: 46px 0 20px; font-size: 16px; line-height: 27px; letter-spacing: -0.54px;color: #ababab;}
  .cardLastTxt {font-family: Arial; font-size: 32px; line-height: 38px;color: #ababab;padding-bottom: 46px;}
  .avtiveClassT p {color: #3d9cd2!important;}
  ::v-deep .qnatable .v-data-table > .v-data-table__wrapper tbody tr.v-data-table__expanded__content {box-shadow: none;}
</style>
