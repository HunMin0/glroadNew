<template>
  <div class="Learn0">
    <div class="PromotionTitle0">
      <h1>글로드 <span>주요파트너</span></h1>
    </div>
     <v-container>
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="10" xs="5" sm="5" md="3" lg="3" xl="3">
            <div id="sector4">
                <v-img class="imgBox" src="/images/p_logo01.png" contain max-height="100px"></v-img>
            </div>
        </v-col>
        <v-col cols="10" xs="5" sm="5" md="3" lg="3" xl="3">
            <div id="sector4">
                <v-img class="imgBox" src="/images/p_logo02.png" contain max-height="100px"></v-img>
            </div>
        </v-col>
        <v-col cols="10" xs="5" sm="5" md="3" lg="3" xl="3">
            <div id="sector4">
                <v-img class="imgBox" src="/images/p_logo03.png" contain max-height="100px"></v-img>
            </div>
        </v-col>
      </v-row>
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="10" xs="5" sm="5" md="3" lg="3" xl="3">
            <div id="sector4">
                <v-img class="imgBox" src="/images/p_logo04.png" contain max-height="100px"></v-img>
            </div>
        </v-col>
        <v-col cols="10" xs="5" sm="5" md="3" lg="3" xl="3">
            <div id="sector4">
                <v-img class="imgBox" src="/images/p_logo05.png" contain max-height="100px"></v-img>
            </div>
        </v-col>
        <v-col cols="10" xs="5" sm="5" md="3" lg="3" xl="3">
            <div id="sector4">
                <v-img class="imgBox" src="/images/p_logo06.png" contain max-height="100px"></v-img>
            </div>
        </v-col>
      </v-row>
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="10" xs="5" sm="5" md="3" lg="3" xl="3">
            <div id="sector4">
                <v-img class="imgBox" src="/images/p_logo07.png" contain max-height="100px"></v-img>
            </div>
        </v-col>
      </v-row>
     </v-container>
  </div>
</template>

<script>
export default {
  name: 'Operation',
  data: () => ({

  }),
}
</script>

<style scoped>
.Learn0 {padding: 160px 0 140px;}
.PromotionTitle0{width: 100%; text-align: center; padding: 0 0 40px;}
.PromotionTitle0 span {color:#1f8bca}
.PromotionTitle0 p {margin-top: 10px;}
.paddingSet {padding: 12px }
.imgTitle {padding: 20px 40px; text-align: center;}
.imgTitle p {margin: 0;}
.Learn {padding: 10px 0 110px;}
.imgBox {height: 524px;}

@media (max-width: 960px){
.Learn0 {padding: 60px 0}
}

</style>
