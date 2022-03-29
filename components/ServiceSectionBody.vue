<template>
  <div class="History">
     <v-container fluid>
      <v-row justify="center" align="center" >
        <v-col cols="10" xs="10" sm="10" md="5" lg="3" xl="3">
          <div class="HistoryTitle">
            <h1>실시간 수출 컨테이너<br/><span>최저가 빠른출발 검색</span></h1>
            <p class="titleText">간단한 조건을 입력만으로,<br/>수출 운송 스케줄을 실시간으로 빠르게<br/>검색할 수 있습니다.</p>
          </div>
        </v-col>
        <v-col cols="10" xs="10" sm="10" md="5" lg="5" xl="3" class="text-right">
          <div class="imgBx">
              <v-img src="/images/about01.jpg"></v-img>
          </div>
        </v-col>
      </v-row>
     </v-container>
  </div>
</template>

<script>
export default {
  name: 'SectionBody',
  data: () => ({
    
  }),
}
</script>

<style scoped>
  .History{background: #fafafc;}
  .HistoryTitle h1 {font-weight: 700; font-size: 2rem; line-height: 3rem; color: #333; margin-bottom: 12px;}
  .HistoryTitle span {color: #1f8bca;}
  .titleText {font-weight: 400; font-size: 1.1rem; line-height: 2.125rem; color: #6c6c6c; margin-bottom: 34px;}
  .subjectText {font-size: 1rem; line-height: 30px; color: #1c84c5; font-weight: 500;}
  .subjectText i {color: #1c84c5;}
  .imgBx {width: 100%; height: 100%; padding: 20px;  position: relative;}
  @media (min-width: 605px){
    .History{padding: 80px 0 0;}
    .HistoryTitle h1 {font-size: 2rem;}
     .HistoryTitle {padding-left: 90px;}
  }
  @media (max-width: 960px){
    .History{padding: 80px 0;}
    .HistoryTitle {margin-top: 30px;padding-left:0;}
    .HistoryTitle h1 {font-size: 1.7rem;}
     .HistoryTitle {padding-left: 0px;}
  }
</style>
