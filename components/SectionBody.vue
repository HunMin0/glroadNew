<template>
  <div class="History">
     <v-container fluid>
      <v-row justify="center" align="center" >
        <v-col cols="10" xs="10" sm="10" md="5" lg="5" xl="3" class="text-right">
          <div class="imgBx">
              <v-img src="/images/footImg.PNG"></v-img>
          </div>
        </v-col>

        <v-col cols="10" xs="10" sm="10" md="6" lg="6" xl="3">
          <div class="HistoryTitle">
            <h1>글로드의 간편한 수출을 경험하세요.</h1>
            <p class="titleText">실시간 스케줄 조회 및 견적을 무료로 받아보실 수 있습니다.</p>
            <router-link to="/"><p class="subjectText">더 자세히보기 <v-icon dense>mdi-arrow-right-bold-circle-outline</v-icon></p></router-link>
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
  .HistoryTitle {padding-left: 50px;}
  .HistoryTitle h1 {font-weight: 700; font-size: 2rem; line-height: 4rem; color: #333;}
  .titleText {font-weight: 400; font-size: 1.1rem; line-height: 2.125rem; color: #6c6c6c; margin-bottom: 34px;}
  .subjectText {font-size: 1rem; line-height: 30px; color: #1c84c5; font-weight: 500;}
  .subjectText i {color: #1c84c5;}
  .imgBx {width: 100%; height: 100%; padding: 20px;  position: relative;}
  .imgBx::before {content: ''; width: 740px; height: 200px; background: #e1f4fc; position: absolute; bottom: -30px; right: -20px;}
  @media (min-width: 605px){
    .History{padding: 140px 0 200px;}
    .HistoryTitle h1 {font-size: 2rem;}
  }
  @media (max-width: 960px){
    .History{padding: 80px 0;}
    .HistoryTitle {margin-top: 30px;padding-left:0;}
    .HistoryTitle h1 {font-size: 1.7rem;}
  }
</style>
