<template>
  <div class="History">
     <v-container fluid>
      <v-row justify="center" align="center" class="rowPadding">
        <v-col cols="10" xs="10" sm="10" md="5" lg="5" xl="3">
          <div class="HistoryTitle">
            <h1>과거 기록으로<br/><span>새로운 스케줄 자동 검색</span></h1>
            <p class="titleText">과거 진행했던 스케줄 결과를 바탕으로 새로운<br/>운송을 간편하고 빠르게 시작할 수 있습니다.</p>
          </div>
          <div class="imgBx">
              <v-img src="/images/about02.jpg"></v-img>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center" align="center" >
          <v-col cols="10" xs="10" sm="10" md="5" lg="5" xl="3">
          <div class="HistoryTitle">
            <h1>원클릭으로<br/><span>예상 견적과 최종 견적 확인</span></h1>
            <p class="titleText">변동 없는 운송요금과 예상 추가 견적을<br/>투명하게 제공해 드립니다.</p>
          </div>
          <div class="imgBx">
              <v-img src="/images/about03.jpg"></v-img>
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
  .HistoryTitle {width: 100%; text-align: center;}
  .rowPadding {margin-bottom: 100px;}
  .HistoryTitle h1 {font-weight: 700; font-size: 2rem; line-height: 3rem; color: #333; margin-bottom: 12px;}
  .HistoryTitle span {color: #1f8bca;}
  .titleText {font-weight: 400; font-size: 1.1rem; line-height: 2.125rem; color: #6c6c6c; margin-bottom: 34px;}
  .subjectText {font-size: 1rem; line-height: 30px; color: #1c84c5; font-weight: 500;}
  .subjectText i {color: #1c84c5;}
  .imgBx {width: 100%; height: 100%; position: relative;}
  @media (min-width: 605px){
    .History{padding: 140px 0 200px;}
    .HistoryTitle h1 {font-size: 2rem;}
  }
  @media (max-width: 960px){
    .HistoryTitle {margin-top: 30px;padding-left:0;}
    .HistoryTitle h1 {font-size: 1.7rem;}
  }
</style>
