<template>
  <div class="Learn">
    <div class="PromotionTitle">
      <h1>글로드 <span>사외이사 및 자문</span></h1>
    </div>
     <v-container>
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="10" xs="5" sm="5" md="3" lg="3" xl="3" class="pa-3">
            <div id="sector4">
                <v-img class="imgBox" src="/images/person05.png" max-height="350px" ></v-img>
                <div class="imgTitle">
                <h3>사외이사 이상하</h3>
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

.paddingSet {padding: 12px }
.imgTitle {padding: 20px 40px; text-align: center;}
.imgTitle p {margin: 0;}
.Learn {padding: 10px 0 110px;}
.imgBox {height: 524px;}

</style>
