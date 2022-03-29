<template>
  <div>
    <SubVisual />
    <v-container fluid>
      <v-row>
        <v-spacer/>
        <v-col cols="12" xs="12" sm="12" md="12" lg="10" xl="8">
          <AboutSlid />
        </v-col>
        <v-spacer/>
      </v-row>
    </v-container>

    <v-container fluid class="pa-0">
      <v-row>
        <v-col>
          <ServiceSectionBody />
        </v-col>
      </v-row>
    </v-container>

    
     <v-container fluid class="pa-0">
      <v-row>
        <v-col class="pa-0">
          <Promotion />
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid class="pa-0">
      <v-row>
        <v-col class="pa-0">
          <ServiceSectionTwo />
        </v-col>
      </v-row>
    </v-container>

     <v-container fluid class="pa-0">
      <v-row>
        <v-col class="pa-0">
          <ServiceSectionThree />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  auth: false,
  name: 'service',
  async asyncData(context) {
    //console.log(111);
  },
}
</script>

<style>

</style>