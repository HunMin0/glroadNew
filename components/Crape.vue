<template>
  <div class="Learn0">
    <div class="PromotionTitle0">
      <h1>글로드 <span>지식재산권</span></h1>
    </div>
     <v-container>
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="10" xs="5" sm="5" md="3" lg="3" xl="3" class="pa-4">
            <div id="sector4">
                <v-img class="imgBox" src="/images/crape01.png" ></v-img>
                <div class="imgTitle">
                <h3>CEO 이영우</h3>
                </div>
            </div>
        </v-col>

        <v-col cols="10" xs="5" sm="5" md="3" lg="3" xl="3" class="pa-4">
            <div id="sector4">
                <v-img class="imgBox" src="/images/crape02.png"  ></v-img>
                <div class="imgTitle">
                <h3>COO 신대은</h3>
                </div>
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
.PromotionTitle0{width: 100%; text-align: center; padding: 0 0 40px;}
.PromotionTitle0 span {color:#1f8bca}
.PromotionTitle0 p {margin-top: 10px;}
.paddingSet {padding: 12px }
.imgTitle {padding: 20px 40px; text-align: center;}
.imgTitle p {margin: 0;}
.Learn {padding: 10px 0 110px;}
.imgBox {height: 524px;}

</style>
