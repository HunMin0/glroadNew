<template>
  <div>
    <SubVisual />

   <v-container fluid>
      <v-row>
        <v-spacer/>
         <v-col cols="12" xs="12" sm="10" md="8" lg="8" xl="6">
          <ul class="subNav">
            <li title="공지사항" class="activeLi"><router-link to="/notices">공지사항</router-link></li><!--
            --><li title="자주묻는 질문"><router-link to="/faqs">자주묻는 질문</router-link></li><!--
            --><li title="제휴/문의"><router-link to="/questions">제휴/문의</router-link></li>
          </ul>
        </v-col>
        <v-spacer/>
      </v-row>
    </v-container>

    <v-container fluid class="pa-0">
      <v-row>
        <v-col>
          <div class="question">
            <div class="PromotionTitle">
              <h1>글로드<span> 공지사항</span></h1>
              <p class="subTitle">글로드의 다양한 소식 및 정보를 보실 수 있습니다.</p>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="11" xs="11" sm="10" md="8" lg="8" xl="7">
          <v-card flat class="pagerNum d-flex justify-space-between">
            <p class="fristp"><span class="cir">·</span> 총게시물 <span class="numberColor">2</span> &nbsp;페이지 <span class="numberColor">1</span>/1</p>
            <v-card class="d-flex fildset" elevation="0">
              <p><v-select :items="noticeitems" label="카테고리" outlined hide-details="auto" ></v-select></p>&nbsp;
              <p><v-text-field label="검색어를 입력해주세요" outlined hide-details="auto"></v-text-field></p>&nbsp;
              <p><v-btn depressed color="primary" height="40">검색</v-btn></p>
            </v-card>
          </v-card>
          <v-data-table :headers="headers" :items="items" class="layouts-bottom axis"
                        :options.sync="pagination" :server-items-length="totalItems" :loading="loading"
                        :items-per-page="15" :footer-props="{ itemsPerPageOptions: [15, 30, 35] }"
                        primary-key="index">
            <template v-slot:item.title="{item}">
              <nuxt-link :to="`/notices/${item.id}`"> {{ item.title }} </nuxt-link>
            </template>
            <template v-slot:item.created_at="{item}"> {{ $dayjsFormat(item.created_at) }}</template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import SubVisual from "../../components/SubVisual";
import ServiceCenterTabs from "../../components/ServiceCenterTabs";

export default {
  name: "notices",
  auth: false,
  components: {SubVisual, ServiceCenterTabs},
  watch: {
    pagination: {
      deep: true, handler() {
        this.searchItem();
      }
    }
  },
  data: () => ({
    noticeitems: ['전체', '공지', '공고', '뉴스'],
    headers: [
      {align: 'center', sortable: false, width: '10%', text: '번호', value: 'num'},
      {align: 'center', sortable: false, width: '60%', text: '제목', value: 'title'},
      {align: 'center', sortable: false, width: '10%', text: '첨부파일', value: 'datafile'},
      {align: 'center', sortable: false, width: '20%', text: '작성일', value: 'created_at'},
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

        var url = '/board/1';
        url += '?page=' + ((page > 0) ? page : 0);
        url += '&itemsPerPage=' + ((itemsPerPage > 0) ? +itemsPerPage : 0);
        if (Object.keys(this.search).length > 0) url += '&search=' + JSON.stringify(this.search);

        this.$axios.get(url).then((response) => {
          /*let items = response.data.data;
          const meta = response.data.meta;
          resolve({items, meta})*/
          let items = response.data.data;
          const total = response.data.total;
          resolve({items, total})
          this.loading = false;
        });
      })
    },
    searchItem(search) {
      if (search) this.search = search;
      this.getDataFromApi().then(data => {
        /*this.totalItems = data.meta.total;*/
        this.totalItems = data.total;
        this.items = data.items;
      })
    }
  }
}
</script>


<style scoped>
.pagerNum {font-size: 14px; padding: 14px 20px; border: 1px solid #e9e9e9; margin-bottom: 20px; border-radius: 0;}
.numberColor {color: #ce171f; font-weight: 500; margin-left: 4px;}
.cir {font-size: 18px; font-weight: 600;}
.fristp {margin-top: 6px!important;}
::v-deep .axis table td {padding: 20px 0!important;}
::v-deep .fildset .v-input__control {height: 40px!important;}
::v-deep .fildset .v-input__control > .v-input__slot {min-height: 40px!important;}
::v-deep .fildset .v-text-field--outlined .v-label {top: 12px!important;}
::v-deep .fildset .v-label {font-size: 13px;}
::v-deep .fildset .v-input__append-inner {margin-top: 7px!important;}

::v-deep .axis table {border-top: 2px solid #1f8bca;}
::v-deep .axis a {color: #333!important; font-weight: 600;}
.PromotionTitle {padding: 50px 0 0!important;}
.v-application p {margin: 0;}
.subTitle {margin: 16px 0 10px!important; padding: 0 30px;}
.textSetting p {font-size: 0.875rem; margin-bottom: 10px; font-weight: 600;}
.textSetting p span {color: #ff5c48}
.questionTitle{font-weight: 700; font-size: 1.5rem}
.qnaSet{box-shadow: 0 4px 44px rgb(0 18 47 / 8%)!important; padding: 58px; border-radius: 30px;}
.inputStyle {border: 1px solid #ddd;}
.inputStyle2 {margin: 14px 0 24px;}
.btnStyle {width: 200px; font-weight: 600; color: #878787;}
.btnStyle:hover{color: #fff; background: #a1a1a1;}

  .subNav {margin-top: 70px; padding: 0; text-align: center;}
  .subNav li {display: inline-block; list-style: none; border: 1px solid #ddd; padding: 20px 40px; }
  .activeLi {background: #1f8bca; border: 1px solid #1f8bca;}
  .activeLi a {color: #fff!important;}
  .subNav li a {text-decoration: none; color: #333;}
  @media (max-width: 960px){
    .subNav {margin-top: 30px;}
    .subNav li {padding: 18px}
    .qnaSet{padding: 30px 28px;}
  }

@media (min-width: 605px){
  .qnaSet{padding: 58px;}
}
</style>
