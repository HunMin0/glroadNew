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
          <v-card flat class="layouts-bottom axis">

          <div class="viewTitle d-flex justify-space-between">
            <p>{{item.title}}</p>
            <p>작성일 : {{$dayjsFormat(item.created_at)}}</p>
          </div>
          <div class="viewContent">
            <v-textarea :value="item.content" readonly hide-details="auto" ></v-textarea>
          </div>
          <v-card-actions class="justify-center">
            <v-btn color="primary" large to="/notices" elevation="0" class="listBtn">목록으로</v-btn>
          </v-card-actions>
        </v-card>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
import SubVisual from "../../components/SubVisual";
import ServiceCenterTabs from "../../components/ServiceCenterTabs";

export default {
  name: "noticeView",
  auth: false,
  components: {SubVisual},
  async asyncData({params, $axios}) {
    const response = await $axios.get('/post/'+params.id);
    //console.log('data', response.data)
    const item = response.data;
    return {item}
  },
}
</script>

<style scoped>
.viewTitle {border-bottom: 1px dashed #999; padding: 20px 15px;}
.viewTitle p:first-child {font-size: 19px; font-weight: 600; color:rgb(61, 61, 61);}
.viewTitle p:last-child {font-size: 15px;color: #838383;margin-top: 2px;}
.pagerNum {font-size: 14px; padding: 14px 20px; border: 1px solid #e9e9e9; margin-bottom: 20px; border-radius: 0;}
.numberColor {color: #ce171f; font-weight: 500; margin-left: 4px;}
.cir {font-size: 18px; font-weight: 600;}
.fristp {margin-top: 6px!important;}
.viewContent {padding: 20px 15px;border-bottom: 1px solid #ddd; margin-bottom: 30px;}
::v-deep .fildset .v-input__control {height: 40px!important;}
::v-deep .fildset .v-input__control > .v-input__slot {min-height: 40px!important;}
::v-deep .fildset .v-text-field--outlined .v-label {top: 12px!important;}
::v-deep .fildset .v-label {font-size: 13px;}
::v-deep .fildset .v-input__append-inner {margin-top: 7px!important;}
::v-deep .axis .theme--light.v-text-field > .v-input__control > .v-input__slot:before {display: none;}
::v-deep .axis .v-text-field > .v-input__control > .v-input__slot:after {display: none;}
.axis {border-top: 2px solid #1f8bca; border-radius: 0;}
.listBtn {padding: 24px!important; color: #fff!important;}
.PromotionTitle {padding: 50px 0 20px!important;}
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
