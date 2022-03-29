<template>
  <div class="History">
     <v-container fluid>
      <v-row justify="center" align="center" class="rowPadding">
        <v-col cols="10" xs="10" sm="10" md="6" lg="6" xl="6">
          <div class="HistoryTitle">
            <h1>빠른 의사결정과<br/><span>유연한 수출업무 가능</span></h1>
            <p class="titleText">단계별로 필요한 절차를 먼저 확인하고<br/>자동으로 처리할 수 있습니다.</p>
          </div>
          <div class="imgBx">
              <v-img src="/images/procedureImg05.jpg" max-height="600px"></v-img>
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
  .rowPadding {margin-bottom: 10px;}
  .HistoryTitle h1 {font-weight: 700; font-size: 2rem; line-height: 3rem; color: #333; margin-bottom: 12px;}
  .HistoryTitle span {color: #1f8bca;}
  .titleText {font-weight: 400; font-size: 1.1rem; line-height: 2.125rem; color: #6c6c6c; margin-bottom: 34px;}
  .subjectText {font-size: 1rem; line-height: 30px; color: #1c84c5; font-weight: 500;}
  .subjectText i {color: #1c84c5;}
  .imgBx {width: 100%; height: 100%; position: relative;}
  @media (min-width: 605px){
    .History{padding: 90px 0 40px;}
    .HistoryTitle h1 {font-size: 2rem;}
  }
  @media (max-width: 960px){
    .HistoryTitle {margin-top: 30px;padding-left:0;}
    .HistoryTitle h1 {font-size: 1.7rem;}
  }
</style>
