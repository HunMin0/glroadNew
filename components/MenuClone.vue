<template>
  <div class="at" v-if="visible">
    <v-app-bar app color="white" flat :inverted-scroll="!persistentMenu">
      <v-container>
      <v-row justify="center" align="center" >
      <v-col cols="7" xs="7" sm="7" md="3" lg="3" xl="3">
        <Logo2 />
      </v-col>
      <v-col cols="4" xs="4" sm="4" md="7" lg="7" xl="6">
        <div id="nav">
          <div class="openMenu">
            <v-tabs centered class="ml-n9" color="#333" background-color="transparent">
              <v-tab v-bind:title="link.tab" class="resize" v-for="link in links" :key="link.tab" :to="link.href" :ripple="false">
              {{ link.tab }}
              </v-tab>
              <v-tabs-slider color="transparent" />
            </v-tabs>
          </div>
          <div class="quickNav">
            <v-app-bar-nav-icon @click="drawer = true" color="#333" large ></v-app-bar-nav-icon>
            <v-navigation-drawer class="quickNavInner" width="50%" v-model="drawer" absolute temporary right>
              <v-list flat>
                <v-list-item-group v-model="group" active-class="grey lighten-5" >
                  <v-list-item class="navLogo"><Logo2 /></v-list-item>
                  <v-list-item v-for="link in links" :key="link.tab" :to="link.href" style="height:60px">
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
      </v-col>
      <v-col cols="1" xs="1" sm="1" md="2" lg="2" xl="2">
        <gnb-auth-menu class-name="_clone_"/>
      </v-col>
    </v-row>
    </v-container>
    </v-app-bar>
    <v-navigation-drawer width="50%" v-model="drawer" absolute temporary right style="position:fixed; z-index:9999">
      <v-list flat>
        <v-list-item-group v-model="group" active-class="grey lighten-5">
          <v-list-item class="navLogo"><Logo2 /></v-list-item>
          <v-list-item v-for="link in links" :key="link.tab" :to="link.href" style="height:60px" >
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
</template>

<script>
 import GnbAuthMenu from "./GnbAuthMenu";
 export default {
   components: {GnbAuthMenu},
   mounted() {
     this.toggleEvent(this.persistentMenu)
   },
   props: ['persistentMenu'],
   watch: {
     persistentMenu(value) {
       this.toggleEvent(value);
     }
   },
   data: () => ({
     visible: false,
     drawer: false,
     group: null,
     absolute: true,
     links: [
       {tab: '홈으로', href: '/', icon: 'mdi-inbox'},
       /*{tab: '회사소개', href: '/aboutus', icon: 'mdi-star'},*/
       {tab: '서비스소개', href: '/service', icon: 'mdi-star'},
       {tab: '진행절차', href: '/procedure', icon: 'mdi-send'},
       {tab: '고객센터', href: '/questions', icon: 'mdi-send'},
     ],
   }),
   methods: {
     toggleEvent(value) {
       if (value) {
         this.visible = true;
         window.removeEventListener('scroll', this.scrollListener)
       } else {
         window.addEventListener('scroll', this.scrollListener)
       }
     },
     scrollTop() {
       this.intervalId = setInterval(() => {
         if (window.pageYOffset === 0) {
           clearInterval(this.intervalId)
         }
         window.scroll(0, window.pageYOffset - 50)
       }, 20)
     },
     scrollListener(e) {
       this.visible = window.scrollY > 150
     }
   }
 }
</script>

<style scoped>
.theme--light.v-tabs .v-tab:hover::before {opacity: 0;}
.theme--light.v-tabs .v-tab--active:focus::before {opacity: 0;}
.v-tab:hover  {color: #333 !important;}
.v-tab:before{display: none;}
#nav {height: 48px; text-align: right; width: 100%;}
.navLogo {margin-bottom: 10px;}
.v-list-item__title {text-align: left;font-size: 1rem;}
.at header{animation: wobble 0.5s; border-bottom: 1px solid #ededed!important; z-index: 999;}
@keyframes wobble {
  0% { opacity:0; transform: translateY(-50px); }
  100% { opacity:1; transform: translateY(0px); }
}
@media (max-width: 2000px) {
  #cloneLogo {
    margin-left: 50px;
  }
}

@media (max-width: 960px) {
  #cloneLogo {
    margin-left: 0;
  }
}
</style>
