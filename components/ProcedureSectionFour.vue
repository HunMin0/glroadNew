<template>
  <div class="History">
     <v-container fluid>
      <v-row justify="center" align="center" class="rowPadding">
        <v-col cols="10" xs="10" sm="10" md="6" lg="6" xl="6">
          <div class="HistoryTitle">
            <h1>GLROAD는 무료 <span>수출플랫폼</span> 입니다.</h1>
            <p class="titleText">실제 요금은 계약확정 후 진행 시에만 발생됩니다.</p>
            <router-link to="/auth/register"><div class="quickBtn" title="무료회원가입">무료회원가입</div></router-link>
          </div>
        </v-col>
      </v-row>
     </v-container>
  </div>
</template>

<script>
export default {
  name: 'SectionBodyTwo',
  data: () => ({
    
  }),
}
</script>

<style scoped>
  .History{background: #fafafc;}
  .HistoryTitle {width: 100%; text-align: center;}
  .rowPadding {margin-bottom: 100px;}
  .HistoryTitle h1 {font-weight: 700; font-size: 2rem; line-height: 3rem; color: #333; margin-bottom: 12px;}
  .HistoryTitle span {color: #1f8bca;}
  .titleText {font-weight: 400; font-size: 1.1rem; line-height: 2.125rem; color: #6c6c6c; margin-bottom: 34px;}
  .subjectText {font-size: 1rem; line-height: 30px; color: #1c84c5; font-weight: 500;}
  .subjectText i {color: #1c84c5;}
  .quickBtn {width: 160px; margin: 0 auto; padding: 20px; background: #1c84c5; color: #fff;}
  .quickBtn:hover {background: #1f8bca;}
  @media (min-width: 605px){
    .History{padding: 90px 0 40px;}
    .HistoryTitle h1 {font-size: 2rem;}
  }
  @media (max-width: 960px){
    .HistoryTitle {margin-top: 30px;padding-left:0;}
    .HistoryTitle h1 {font-size: 1.7rem;}
  }
</style>
