<template>
  <div class="History">
    <v-img src='/images/parallax3.jpg' max-height="800px">
     <v-container fluid>
      <v-row justify="center" align="center" class="rowPadding">
        <v-col cols="10" xs="10" sm="10" md="6" lg="6" xl="6">
          <div class="HistoryTitle">
            <h1>수출업무는 <span>GLROAD</span> 하세요.</h1>
            <p class="titleText">아직도 직접 포워딩업체를 컨텍하고 계신가요?<br/>다음 수출업무는 더욱 더 편리해집니다.</p>
          </div>
          <div class="imgBx">
              <v-img src="/images/procedureImg03.jpg"></v-img>
          </div>
        </v-col>
      </v-row>
     </v-container>
    </v-img>
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
  .History{background: #fafafc; height: 800px; overflow: hidden;}
  .HistoryTitle {width: 100%; text-align: center; margin: 90px 0 70px;}
  .rowPadding {margin-bottom: 100px;}
  .HistoryTitle h1 {font-weight: 700; font-size: 2rem; line-height: 3rem; color: #fff; margin-bottom: 12px;}
  .HistoryTitle span {color: #1f8bca;}
  .titleText {font-weight: 400; font-size: 1.1rem; line-height: 2.125rem; color: #cfcfcf; margin-bottom: 34px;}
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
