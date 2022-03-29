<template>
  <div>
    <Visual />
    <div id="about"></div>
    <v-container fluid>
      <v-row>
        <v-spacer/>
        <v-col cols="12" xs="12" sm="12" md="12" lg="10" xl="8">
          <SectionPol />
        </v-col>
        <v-spacer/>
      </v-row>
    </v-container>

    <v-container fluid class="pa-0">
      <v-row>
        <v-col>
          <ServiceParallax />
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid class="pa-0">
      <v-row>
        <v-col class="pa-0">
          <SectionBody />
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid class="layouts-bottom2">
      <v-row align="center" justify="center">
        <v-col cols="11" xs="11" sm="10" md="8" lg="8" xl="6">
          <div class="question">
            <div class="PromotionTitle">
              <h1>글로드 <span>소식지</span></h1>
              <p class="subTitle">글로드의 최신 소식 및 NEWS를 보실 수 있습니다.</p>
            </div>
          </div>
          <v-data-table :headers="noticeHeaders" :items="noticeItems" disable-pagination hide-default-footer class="layouts-bottom3 axis">
            <template v-slot:item.title="{item}">
              <nuxt-link :to="`/notices/${item.id}`"> {{ item.title }} </nuxt-link>
            </template>
            <template v-slot:item.created_at="{item}"> {{ $dayjsFormat(item.created_at) }}</template>
          </v-data-table>
          <v-card-actions class="justify-center">
            <v-btn color="primary" large to="/notices" elevation="0" class="listBtn">목록으로</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
import ScheduleSearch from "../components/ScheduleSearch";
import Visual from "../components/Visual";
import SectionPol from "../components/SectionPol";
import SectionBody from "../components/SectionBody";
import ServiceParallax from "../components/ServiceParallax";

export default {
  name: 'IndexPage',
  auth: false,
  components: {ScheduleSearch, Visual, SectionPol, ServiceParallax, SectionBody},
  async asyncData({params, $axios}) {
    const response = await $axios.get('/board/1?page=1&itemsPerPage=5');
    //console.log('data', response.data.data)
    const noticeItems = response.data.data;
    return {noticeItems}
  },
  data: () => ({
    noticeHeaders: [
      {align: 'center', sortable: false, width: '10%', text: '번호', value: 'num'},
      {align: 'center', sortable: false, width: '60%', text: '제목', value: 'title'},
      {align: 'center', sortable: false, width: '10%', text: '첨부파일', value: 'datafile'},
      {align: 'center', sortable: false, width: '20%', text: '작성일', value: 'created_at'},
    ],
  })
}
</script>

<style>
.layouts-bottom2 {padding-bottom: 60px; margin-bottom: 60px;}
.layouts-bottom3 {padding-bottom: 0; margin-bottom: 40px;}
.listBtn {padding: 24px!important;}
.axis table td {padding: 20px 0!important;}
.axis table {border-top: 2px solid #1f8bca!important; border-bottom: 1px solid #e8e7ea;}
.axis a {color: #333!important; font-weight: 600;}
</style>
