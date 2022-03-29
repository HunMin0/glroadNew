<template>
  <v-container fluid class="ma-0 pa-0" fill-height>
    <v-row>
      <v-col>
        <Menu ref="menu" />
        <div class="ServiceParallax">
            <v-img src='/images/parallax2.jpg' max-height="480px">
            <v-container fill-height class="animate__animated animate__fadeInDown">
                <v-row align="center" justify="center">
                    <v-col cols="10" xs="10" sm="12" md="10" lg="6" xl="6" class="text-center">
                        <h1 class="textStyle">복잡한 수출절차를 매우 간편하게</h1>
                        <h4 class="subheading">글로드에서는 누구나 쉽게 수출할 수 있습니다.</h4>
                    </v-col>
                </v-row>
            </v-container>
            </v-img>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Visual',

  data: () => ({
    
}),
}
</script>

<style scope>
.ServiceParallax {width: 100%; height: auto;}
.textStyle {color: #f2f2f2; margin-top: 50px; letter-spacing: 2px;}
.subheading{font-size: 1.2rem; color: #f2f2f2; margin-top: 4px; letter-spacing: 2px;}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-100px);
  }
  to {
    opacity: 1;
  }
}
@media (min-width: 605px){
}
@media (max-width: 960px){
    .textStyle {font-size: 20px;}
    .subheading {font-size: 15px;}
}
</style>
