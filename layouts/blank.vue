<template>
  <v-app dark>
    <progress-circular/>
    <snackbar/>
    <v-main>
      <v-container>
        <v-row class="justify-center">
          <Nuxt />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from "../components/Snackbar";
import ProgressCircular from "../components/ProgressCircular";

export default {
  name: "blank",
  middleware: ['guest_member'],
  components: {Snackbar, ProgressCircular},
}
</script>

<style scoped>

</style>
