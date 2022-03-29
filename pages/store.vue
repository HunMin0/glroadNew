<template>
  <div>
    <SubVisual />
    <v-container fluid class="pa-0">
      <v-row>
        <v-col>
          <Store />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  auth: false,
  name: 'store',
  async asyncData(context) {
    //console.log(111);
  },
}
</script>

<style scoped>
  .subNav {margin-top: 70px; padding: 0; text-align: center;}
  .subNav li {display: inline-block; list-style: none; border: 1px solid #ddd; padding: 20px 40px; }
  .activeLi {background: #1f8bca; border: 1px solid #1f8bca;}
  .activeLi a {color: #fff!important;}
  .subNav li a {text-decoration: none; color: #333;}
  @media (max-width: 960px){
    .subNav {margin-top: 30px;}
    .subNav li {padding: 18px}
  }
</style>