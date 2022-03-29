<template>
  <div>
    <SubVisual />
    <v-container fluid>
      <v-row>
        <v-spacer/>
         <v-col cols="12" xs="12" sm="10" md="8" lg="8" xl="6">
          <ul class="subNav">
            <li title="공지사항"><router-link to="/notices">공지사항</router-link></li><!--
            --><li title="자주묻는 질문"><router-link to="/faqs">자주묻는 질문</router-link></li><!--
            --><li title="제휴/문의" class="activeLi"><router-link to="/questions">제휴/문의</router-link></li>
          </ul>
        </v-col>
        <v-spacer/>
      </v-row>
    </v-container>

    <v-container fluid class="pa-0">
      <v-row>
        <v-col>
          <Question />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ServiceCenterTabs from "../components/ServiceCenterTabs";
import SubVisual from "../components/SubVisual";
import Question from "../components/Question";

export default {
  auth: false,
  name: 'questions',
  components: {ServiceCenterTabs, SubVisual, Question},
  async asyncData(context) {
    //console.log(111);
  },
}
</script>

<style scoped>
  .subNav {margin-top: 70px; padding: 0; text-align: center;}
  .subNav li {display: inline-block; list-style: none; border: 1px solid #ddd; padding: 20px 40px; }
  .activeLi {background: #1f8bca; border: 1px solid #1f8bca;}
  .activeLi a {color: #fff!important;}
  .subNav li a {text-decoration: none; color: #333;}
  @media (max-width: 960px){
    .subNav {margin-top: 30px;}
    .subNav li {padding: 18px}
  }
</style>
