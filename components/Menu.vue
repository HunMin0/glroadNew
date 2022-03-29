<template>
  <v-container fluid class="hot_line">
    <v-container class="pa-0">
      <v-row justify="center" align="center" >
      <v-col cols="7" xs="7" sm="7" md="3" lg="3" xl="3">
        <Logo />
      </v-col>
      <v-col cols="4" xs="4" sm="4" md="7" lg="7" xl="6">
        <div id="nav">
          <div class="openMenu">
            <v-tabs dark centered class="ml-n9" color="#fff" background-color="transparent">
              <v-tab v-bind:title="link.tab" class="resize"
                v-for="link in links"
                :key="link.tab"
                :to="link.href"
                :ripple="false"
              >
              {{ link.tab }}
              </v-tab>
              <v-tabs-slider color="transparent" />
            </v-tabs>
          </div>
          <div class="quickNav">
            <v-app-bar-nav-icon @click="drawer = true" color="#fff" large ></v-app-bar-nav-icon>
            <v-navigation-drawer class="quickNavInner" width="50%" v-model="drawer" absolute temporary right>
              <v-list flat>
                <v-list-item-group
                  v-model="group"
                  active-class="grey lighten-5"
                >
                  <v-list-item class="navLogo"><Logo2 /></v-list-item>
                  <v-list-item
                    v-for="link in links"
                    :key="link.tab"
                    :to="link.href"
                    style="height:60px"
                  >
                    <v-list-item-icon>
                      <v-icon v-text="link.icon"/>
                    </v-list-item-icon>
                    <v-list-item-content>
                    <v-list-item-title v-text="link.tab"/>
                  </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-navigation-drawer>
          </div>
        </div>
      </v-col >
     <v-col cols="1" xs="1" sm="1" md="2" lg="2" xl="2">
       <gnb-auth-menu/>
     </v-col>
    </v-row>
    </v-container>
  </v-container>
</template>

<script>
 import GnbAuthMenu from "./GnbAuthMenu";
 export default {
   components: {GnbAuthMenu},
    data: () => ({
      drawer: false,
      group: null,
      absolute: true,
      links: [
        {tab: '홈으로', href: '/', icon:'mdi-inbox'},
        /*{tab: '회사소개', href: '/aboutus', icon:'mdi-star'},*/
        {tab: '서비스소개', href: '/service', icon:'mdi-star'},
        {tab: '진행절차', href: '/procedure', icon:'mdi-send'},
        {tab: '고객센터', href: '/questions', icon:'mdi-send'},
      ],
    }),
    methods: {
      async logout() {
        if (confirm("로그아웃 하시겠습니까?")) await this.$auth.logout();
      },
      closeNew() {
        if (this.drawer === true) {
          document.getElementsByClassName("v-window__next")[0].style.display = "none";
        } else {
          document.getElementsByClassName("v-window__next")[0].style.display = "block";
        }
      }
    }
  }
</script>

<style scoped>
.theme--dark.v-tabs .v-tab--active:hover::before, .theme--dark.v-tabs .v-tab--active::before {opacity: 0;}
.theme--dark.v-tabs .v-tab:hover::before {opacity: 0;}
.v-tab {font-size: 0.930rem;}
.v-tab:hover {color: #fff !important;}
.v-tab:before {display: none;}

#nav {height: 48px; text-align: left;}
.navLogo {margin-bottom: 10px;}
.v-list-item__title {text-align: left;font-size: 1rem;}
.hot_line {position: absolute; top:0; left: 0;right:0; z-index: 99;}
.quickNavInner { position: fixed; z-index:99; top:0; right:0; bottom:0; }
</style>
