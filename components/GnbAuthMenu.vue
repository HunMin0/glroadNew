<template>
  <v-toolbar-title :class="`${className}login_text`">
<!--<template v-if="$auth.loggedIn">
      <a href="#"><v-icon dense>mdi-calendar-text</v-icon> 스케줄조회</a>
      &emsp;<span>I</span>&emsp;<a href="#"><v-icon dense>mdi-account-circle</v-icon> 마이페이지</a>
      &emsp;<span>I</span>&emsp;<a href="#" @click="logout"><v-icon dense>mdi-logout-variant</v-icon> 로그아웃</a>
    </template>
    <template v-else>
      <nuxt-link to="/auth/login"><v-icon dense>mdi-lock</v-icon> {{$t('login')}}</nuxt-link>&emsp;<span>I</span>&emsp;
      <nuxt-link :to="localePath('auth-register')"><v-icon dense>mdi-account</v-icon> 회원가입</nuxt-link>
    </template>
    <nuxt-link v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">&emsp;<span>I</span>&emsp;{{ locale.name }}</nuxt-link>-->
    <nuxt-link to="/"> <v-icon dense>mdi-calendar-text</v-icon> 스케줄조회 </nuxt-link>
    <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon :class="(className !== '_clone_') ? 'white--text': ''">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <template v-if="$auth.loggedIn">
            <v-list-item>
              <v-list-item-icon> <v-icon>mdi-account-circle</v-icon> </v-list-item-icon>
              <v-list-item-title><nuxt-link to="/mypage/dashboard">마이페이지</nuxt-link></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon> <v-icon>mdi-logout-variant</v-icon> </v-list-item-icon>
              <v-list-item-title><a href="#" @click="logout">로그아웃</a></v-list-item-title>
            </v-list-item>
          </template>
          <template v-else>
            <v-list-item>
              <v-list-item-icon> <v-icon>mdi-lock</v-icon> </v-list-item-icon>
              <v-list-item-title> <nuxt-link to="/auth/login">로그인</nuxt-link> </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon> <v-icon>mdi-account</v-icon> </v-list-item-icon>
              <v-list-item-title> <nuxt-link :to="localePath('auth-register')">회원가입</nuxt-link> </v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
    <!--nuxt-link v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">&emsp;<span>I</span>&emsp;{{ locale.name }}</nuxt-link-->
  </v-toolbar-title>
</template>

<script>
export default {
  name: "GnbAuthMenu",
  props: {className: {default: ''}},
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  },
  methods: {
    async logout() {
      if (confirm("로그아웃 하시겠습니까?")) await this.$auth.logout();
    },
  }
}
</script>

<style scoped>
.login_text {font-size: 14px; color: rgb(255 255 255 / 20%);}
.login_text a {color: #cbcbcb;}
.login_text i {color: #cbcbcb; margin: 0 3px 3px 0;}

._clone_login_text {font-size: 14px; color: #ddd;}
._clone_login_text a {color: #6a6a6a;}
._clone_login_text i {color: #6a6a6a; margin: 0 3px 3px 0;}
</style>
