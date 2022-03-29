<template>
  <div class="Learn">
    <div class="PromotionTitle">
      <h1>글로드 <span>경영진</span></h1>
    </div>
     <v-container>
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="10" xs="5" sm="5" md="3" lg="3" xl="3" class="pa-3">
            <div id="sector4">
                <v-img class="imgBox" src="/images/person01.png" max-height="350px" ></v-img>
                <div class="imgTitle">
                <h3>CEO 이영우</h3>
                </div>
            </div>
        </v-col>

        <v-col cols="10" xs="5" sm="5" md="3" lg="3" xl="3" class="pa-3">
            <div id="sector4">
                <v-img class="imgBox" src="/images/person02.png" max-height="350px" ></v-img>
                <div class="imgTitle">
                <h3>COO 신대은</h3>
                </div>
            </div>
        </v-col>

        <v-col cols="10" xs="5" sm="5" md="3" lg="3" xl="3" class="pa-3">
            <div id="sector4">
                <v-img class="imgBox" src="/images/person03.png" max-height="350px" ></v-img>
                <div class="imgTitle">
                <h3>CGO 조윤성</h3>
                </div>
            </div>
        </v-col>

        <v-col cols="10" xs="5" sm="5" md="3" lg="3" xl="3" class="pa-3">
            <div id="sector4">
                <v-img class="imgBox" src="/images/person04.png" max-height="350px"></v-img>
                <div class="imgTitle">
                <h3>CTO 안우혁</h3>
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
