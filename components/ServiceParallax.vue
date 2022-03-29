<template>
  <div class="ServiceParallax">
    <v-parallax dark src='/images/parallax.jpg' height="400">
     <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="10" xs="10" sm="10" md="6" lg="6" xl="6" class="text-center"
          v-for="(item,i) in items"
          :key="i"
        >
          <h1 class="textStyle">{{item.firstTitle}}</h1>
          <h4 class="subheading">{{item.subject}}</h4>
        </v-col>
      </v-row>
     </v-container>
    </v-parallax>
  </div>
</template>

<script>
export default {
  name: 'ServiceParallax',
  data: () => ({
     items: [
      {
        firstTitle: '세상의 물류자원을 움직이는 중심에 글로드가 있습니다.',
        subject: 'GLROAD'
      },
    ],
  }),
}

</script>

<style scoped>
  .textStyle{margin: 10px 0; font-size: 2.2rem; font-weight: 500;}
  .subheading{font-size: 2.3rem; font-weight: 800;}
  @media (min-width: 605px){
    .textStyle{font-size: 2.2rem;}
  }
  @media (max-width: 960px){
    .textStyle{font-size: 1.7rem;}
  }
</style>
