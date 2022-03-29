<template>
  <v-app>
    <MenuClone :persistent-menu="persistentMenu"/>
    <snackbar/>
    <v-main>
      <v-container v-if="persistentMenu" fluid class="pa-0">
        <v-row class="justify-center">
          <nuxt v-if="!$slots.default" />
          <slot />
        </v-row>
      </v-container>
      <nuxt v-else />
    </v-main>
    <v-footer width="100%">
      <v-container fluid class="pa-0">
        <v-row>
          <v-col class="pa-0">
            <Footer/>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import Snackbar from "../components/Snackbar";
import MenuClone from "../components/MenuClone";
import Footer from "../components/Footer";

export default {
  name: 'DefaultLayout',
  components: {Snackbar, MenuClone, Footer},
  middleware: ['guest_member'],
  computed: {
    persistentMenu() {
      return ['/schedules', '/contracts', '/mypage', '/forwardings'].some(e => this.$route.path.startsWith(e));
    }
  },
  methods: {}
}
</script>

<style scoped>
.v-footer {
  padding: 6px 0;
}
</style>
