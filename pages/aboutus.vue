<template>
  <div>
    <SubVisual/>

    <v-container fluid class="pa-0">
      <v-row>
        <v-col>
          <Learn/>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid class="pa-0">
      <v-row>
        <v-col>
          <History/>
        </v-col>
      </v-row>
    </v-container>

    <!--
    <v-container fluid class="pa-0">
      <v-row> <v-col> <Operation/> </v-col> </v-row>
    </v-container>
    <v-container fluid class="pa-0">
      <v-row> <v-col> <Crape/> </v-col> </v-row>
    </v-container>
    <v-container fluid class="pa-0">
      <v-row> <v-col> <Partner/> </v-col> </v-row>
    </v-container>
    <v-container fluid class="pa-0">
      <v-row> <v-col> <Operation2/> </v-col> </v-row>
    </v-container>
    -->
  </div>
</template>

<script>
import ScheduleSearch from "../components/ScheduleSearch";

export default {
  auth: false,
  name: 'aboutus',
  components: {ScheduleSearch},
  async asyncData(context) {
    //console.log(111);
  },
}
</script>

<style>

</style>
