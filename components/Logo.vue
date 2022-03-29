<template>
  <div class="logo" v-bind:title="logoName">
    <nuxt-link to="/">
      <v-img height="54px" src="/images/logo2.png" contain></v-img>
    </NUXT-LINK>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  data: () => ({
    logoName:'GLROAD HOME',
  }),
}
</script>

<style scoped>
.nuxt-logo {height: 30px;}
.logo span {color:#fff; padding-left: 10px;}
</style>
