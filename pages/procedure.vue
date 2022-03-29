<template>
  <div>
    <SubVisual />
    <v-container fluid>
      <v-row>
        <v-spacer/>
         <v-col cols="11" xs="11" sm="10" md="8" lg="8" xl="6">
          <ul class="subNav">
            <li title="스케줄 조회" class="activeLi"><router-link to="/procedure">스케줄 조회</router-link></li><!--
            --><li title="수출진행"><router-link to="/export">수출진행</router-link></li>
          </ul>
        </v-col>
        <v-spacer/>
      </v-row>
    </v-container>

    <v-container fluid class="pa-0">
      <v-row>
        <v-col>
          <ProcedureSectionBody />
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid class="pa-0">
      <v-row>
        <v-col class="pa-0">
          <ProcedureSectionTwo />
        </v-col>
      </v-row>
    </v-container>

     <v-container fluid class="pa-0">
      <v-row>
        <v-col class="pa-0">
          <ProcedureSectionThree />
        </v-col>
      </v-row>
    </v-container>

     <v-container fluid class="pa-0">
      <v-row>
        <v-col class="pa-0">
          <ProcedureSectionFour />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  auth: false,
  name: 'procedure',
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