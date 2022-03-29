<template>
  <div class="ServiceParallax">
    <v-parallax dark src='/images/parallax.jpg' height="500">
     <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="10" xs="10" sm="10" md="6" lg="6" xl="6" class="text-center"
          v-for="(item,i) in items"
          :key="i"
        >
          <h1 class="textStyle">{{item.firstTitle}}</h1>
          <h4 class="subheading">{{item.subject}}</h4>
          <h4 class="subheading">{{item.subject2}}</h4>
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
        firstTitle: '모바일 업무환경 지원',
        subject: '글로드는 주요 수출 프로세스에 모바일 환경을 제공 합니다.',
        subject2: 'PC없이도 수출 진행결과를 확인하고 관리하실 수 있습니다.'
      },
    ],
  }),
}

</script>

<style scoped>
  .textStyle{margin: 10px 0; font-size: 2.2rem; font-weight: 800;}
  .subheading{font-size: 1.2rem; font-weight: 400;}
  @media (min-width: 605px){
    .textStyle{font-size: 2.2rem;}
  }
  @media (max-width: 960px){
    .textStyle{font-size: 1.7rem;}
  }
</style>
