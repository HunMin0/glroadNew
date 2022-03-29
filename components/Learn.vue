<template>
  <div class="Learn">
    <div class="PromotionTitle">
      <h1>글로드 <span>미션</span></h1>
      <p>세계의 자원을 부한 곳에서 낮은 곳으로 이동함으로 빈곤의 문제를<br/>해결하고 물류로 새로운 경제를 창출 하여 많은 사람들에게 새로운 기회를 제공하며 사람 들을 생명을 살린다</p>
    </div>
     <v-container>
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="10" xs="10" sm="10" md="5" lg="5" xl="4" class="colPosition" title="서비스소개">
          <v-row no-gutters>
            <v-col>
              <div id="sector4">
                  <v-img class="imgBox" src="/images/abt01.jpg"></v-img>
                  <div class="imgTitle2 pas">
                    <h3>글로드 비전</h3>
                    <p>한국의 물류 시스템이 세계를 주도하는 물류 중심 국가가 되도록 한다.</p>
                  </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="10" xs="10" sm="10" md="5" lg="5" xl="4" class="colPosition" title="서비스소개">
          <v-row no-gutters>
            <v-col>
              <div id="sector4">
                  <v-img class="imgBox" src="/images/abt02.jpg"></v-img>
                  <div class="imgTitle2">
                    <p>2030 vision<br/>
                    1) 10개국 글로드 물류 시스템 구축<br/>
                    2) 포워딩 글로벌 네트워크 8만개<br/>
                    3) 전세계 최적화 물류정보 자동화 시스템 구축</p>
                  </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
     </v-container>
  </div>
</template>

<script>
export default {
  name: 'Learn',
  data: () => ({

  }),
}
</script>

<style scoped>

.paddingSet {padding: 12px }
.colPosition {position: relative; overflow: hidden;}
.colPosition .imgBox {transition: all 0.5s;}
.colPosition:hover .imgBox {transform: scale(1.6); transition: all 1s;}
.colPosition a {color: #333;}
.imgTitle2 {width: 100%; background: rgb(255 255 255 / 93%); position: absolute; right: 0; bottom: 0; padding: 40px; min-height: 200px;}
.pas {padding: 70px 40px!important;}
.imgTitle2 p {margin: 0; line-height: 30px;}
.Learn {padding: 10px 0 110px;}
.imgBox {height: 524px;}

#sector1{width: 856px; height: 250px; overflow: hidden; margin: 12px; position: relative;}
#sector2{width: 416px; height: 250px; overflow: hidden; margin: 12px; position: relative;}
#sector3{width: 416px; height: 250px; overflow: hidden; margin: 12px; position: relative;}
#sector4{width: 565px; height: 524px; overflow: hidden; margin: 12px; position: relative;}

@media (min-width: 1904px){
  #sector1{width: 856px;}
  #sector2{width: 416px;}
  #sector3{width: 416px;}
  #sector4{width: 565px;}
}
@media (min-width: 1261px){
  #sector1{width: 100%;}
  #sector2{width: 100%;}
  #sector3{width: 100%;}
  #sector4{width: 100%;}
  .imgBox{height: 524px;}
  .Learn {padding: 10px 0 110px;}
  .imgTitle {padding: 20px; left: unset;}
}
@media (max-width: 1260px){
  #sector1{width: 100%;}
  #sector2{width: 100%;}
  #sector3{width: 100%;}
  #sector4{width: 100%;}
  .imgBox{height: 524px;}
  .Learn {padding: 10px 0 110px;}
  .imgTitle {padding: 20px; left: 0;}
  .imgTitle h3 {font-size: 18px;}
  .imgTitle p {font-size: 14px;}
}
@media (max-width: 960px){
  #sector1{width: 100%;}
  #sector2{width: 100%;}
  #sector3{width: 100%;}
  #sector4{width:100%; height: 250px;}
  .imgBox{height: 250px;}
  .imgTitle{width: 100%;}
  .Learn {padding: 10px 0 30px;}
}
</style>
