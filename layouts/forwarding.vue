<template>
  <v-app class="wrapbg">
    <progress-circular/>
    <snackbar/>

    <div class="navbare foBg2">
      <div class="subnavbare">
        <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app color="#f4f5fa">
          <div class="logob">
            <img src="/images/logo.png" class="foLogo"/>
          </div>
          <v-list shaped class="vPaddingT">
            <v-subheader>
              <span class="title-wrapper">
                <span>Dashboards</span>
              </span>
            </v-subheader>
            <v-list-item-group>
              <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
                <v-list-item-icon> <v-icon>{{ item.icon }}</v-icon> </v-list-item-icon>
                <v-list-item-content> <v-list-item-title v-text="item.title"/> </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </div>
    </div>

    <v-app-bar :clipped-left="clipped" fixed app color="#f4f5fa" class="layoutH" elevate-on-scroll>
      <div class="headerView">
        <v-container fluid class="pa-0">
          <v-row justify="center">
            <v-col cols="9" class="pa-0">

              <v-card class="d-flex bgD" flat tile>
                <v-card tile elevation="0" class="bgD">
                  <v-list-item-title class="navBt">
                    <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
                  </v-list-item-title>
                </v-card>
                <v-card tile elevation="0" class="evertBox bgD">
                  <v-list-item-subtitle>
                    <v-list-item-title class="forTitle">
                      <v-icon color="#4c90bb" class="foicon">mdi-monitor-multiple</v-icon>&nbsp; Forwarding Manager
                    </v-list-item-title>
                  </v-list-item-subtitle>
                </v-card>
              </v-card>

            </v-col>
            <v-col cols="3" class="text-right pa-0">
              <div class="tabBtn">
                <!-- 공지버튼 -->
                <v-menu offset-y class="bgBack" bottom left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="#ddd" icon small class="cirSize" v-bind="attrs" v-on="on">
                      <v-icon color="#8e8997" title="공지사항">mdi-bell-outline</v-icon>
                    </v-btn>
                  </template>
                  <v-list three-line id="vPading">
                    <v-list-item-content class="vitemA vlistTab2">
                      <v-card class="d-flex justify-space-between" flat tile>
                        <v-card tile elevation="0">
                          <v-list-item-title class="avatarTitle">System Notice</v-list-item-title>
                        </v-card>
                        <v-card tile elevation="0">
                          <v-list-item-subtitle>
                            <v-chip :ripple="false" class="text-date" color="#ccedff"><span class="fColor">5 New</span>
                            </v-chip>
                          </v-list-item-subtitle>
                        </v-card>
                      </v-card>
                    </v-list-item-content>
                    <v-divider></v-divider>

                    <template v-for="(item, index) in Nitems">
                      <v-subheader
                        v-if="item.header"
                        :key="item.header"
                        v-text="item.header"
                      ></v-subheader>

                      <v-divider
                        v-else-if="item.divider"
                        :key="index"
                      ></v-divider>

                      <v-list-item class="dropListH"
                                   v-else
                                   :key="item.title"
                      >
                        <v-list-item-content>
                          <v-card class="d-flex " flat tile>
                            <v-card tile elevation="0">
                              <v-list-item-avatar class="avaPad">
                                <v-img :src="item.avatar"></v-img>
                              </v-list-item-avatar>
                            </v-card>
                            <v-card tile elevation="0" class="evertBox">
                              <v-list-item-subtitle>
                                <p class="textTitle">{{ item.title }}</p>
                                <p class="textsubtitle">{{ item.subtitle }}</p>
                              </v-list-item-subtitle>
                            </v-card>
                            <v-card tile elevation="0" class="evertBox2">
                              <v-list-item-subtitle>
                                <p class="eventSpan">{{ item.date }}</p>
                              </v-list-item-subtitle>
                            </v-card>
                          </v-card>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                    <v-divider></v-divider>

                    <v-list-item-content class="btnSector">
                      <v-btn block dark depressed color="#4997cb" elevation="0">
                        SYSTEM NOTICE MORE
                      </v-btn>
                    </v-list-item-content>
                  </v-list>

                </v-menu>
                <!-- 공지버튼 종료 -->

                <!-- 아바타 버튼 -->
                <v-menu offset-y class="bgBack" bottom left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-badge bordered bottom color="#378bc5" dot offset-x="10" offset-y="10">
                      <v-avatar size="38" v-bind="attrs" v-on="on">
                        <img src="/images/avater.png" alt="유저이미지">
                      </v-avatar>
                    </v-badge>
                  </template>

                  <v-list nav class="vlistTab" id="vlistTab">
                    <v-list-item>
                      <v-badge bordered bottom color="#378bc5" dot offset-x="10" offset-y="10">
                        <v-avatar size="38">
                          <img src="/images/avater.png" alt="유저이미지">
                        </v-avatar>
                      </v-badge>

                      <v-list-item-content class="vitemB">
                        <v-list-item-title class="avatarTitle">홍길동<span>님</span></v-list-item-title>
                        <v-list-item-subtitle class="avatarSubject">Admin</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                      <v-list-item-title>
                        <router-link to="/forwarding/profile" class="a-link">
                          <v-icon color="#8e8997" title="마이페이지">mdi-account-outline</v-icon>
                          MyPage
                        </router-link>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>
                        <v-icon color="#8e8997" title="홈으로">mdi-television</v-icon>
                        Home
                      </v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                      <v-list-item-title>
                        <v-icon color="#8e8997" title="상담문의">mdi-help-circle-outline</v-icon>
                        FAQ
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>
                        <v-icon color="#8e8997" title="고객센터">mdi-comment-processing-outline</v-icon>
                        SUPPORT
                      </v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                      <v-list-item-title @click="logout">
                        <v-icon color="#8e8997" title="로그아웃">mdi-login-variant</v-icon>
                        Logout
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <!-- 아바타 버튼종료 -->

              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-app-bar>

    <v-main class="foBg">
      <div class="maxSize" id="scrolling-techniques-7">
        <v-container fluid>
          <v-row justify="center">
            <v-col cols="12">
              <Nuxt/>
              <div class="customizerBtn" title="내정보관리">
                <v-btn to="/forwarding/profile" large color="primary" class="set">
                  <v-icon>mdi-account-settings</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
          <!--v-row>
            <v-col>
              <v-footer fixed app class="foFooter">
                <span>COPYRIGHT © {{ new Date().getFullYear() }} <span class="footerColor">GLROAD</span> All rights Reserved.</span>
                <v-spacer></v-spacer>
                <span><v-icon title="상담문의" color="#9b9b9b">mdi-lightbulb-outline</v-icon> 문의사항이 있으신가요?&emsp;</span>
                <v-btn depressed dark color="#03a9f4">
                  <v-icon title="상담문의">mdi-wechat</v-icon>&nbsp;1:1문의
                </v-btn>
              </v-footer>
            </v-col>
          </v-row-->
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from "../components/Snackbar";
import ProgressCircular from "../components/ProgressCircular";

export default {
  name: "forwarding",
  middleware: ['forwarding'],
  components: {Snackbar, ProgressCircular},
  computed: {
    title() {
      return ``;
    },
    miniVariant() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return true
        case 'sm':
          return true
        case 'md':
          return true
        case 'lg':
          return false
        case 'xl':
          return false
      }
    }
  },
  data() {
    return {
      collapseOnScroll: true,
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {icon: 'mdi-file-document-edit', title: '계약관리', to: '/forwarding/contracts'},
        {icon: 'mdi-calendar', title: '스케줄관리', to: '/forwarding/schedules'},
        {icon: 'mdi-calculator-variant-outline', title: '정산관리', to: '/forwarding/adjustments'},
        {icon: 'mdi-frequently-asked-questions', title: '문의내역', to: '/forwarding/questions'},
        {icon: 'mdi-star-settings-outline', title: '리뷰관리', to: '/forwarding/reviews'}
      ],
      Nitems: [
        {
          date: '오늘',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: '시스템 공지 알림 드립니다.',
          subtitle: `서비스 안정화를 위해 금일 11시부터 약 2시...`,
        },
        {divider: true, inset: true},
        {
          date: '1일전',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: '시스템 공지 알림 드립니다.',
          subtitle: `서비스 안정화를 위해 금일 11시부터 약 2시...`,
        },
        {divider: true, inset: true},
        {
          date: '2일전',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: '시스템 공지 알림 드립니다.',
          subtitle: `서비스 안정화를 위해 금일 11시부터 약 2시...`,
        },
        {divider: true, inset: true},
        {
          date: '3일전',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: '시스템 공지 알림 드립니다.',
          subtitle: `서비스 안정화를 위해 금일 11시부터 약 2시...`,
        },
        {divider: true, inset: true},
        {
          date: '4일전',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: '시스템 공지 알림 드립니다.',
          subtitle: `서비스 안정화를 위해 금일 11시부터 약 2시...`,
        },
      ],
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    }
  }
}
</script>

<style scoped>
.wrapbg {
  background: #f4f5fa;
}

.navbare {
  width: 260px;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  display: block;
}

.navbare nav {
  top: 0 !important;
  z-index: 9999;
}

.v-app-bar--is-scrolled {
  background: hsla(0, 0%, 100%, .85) !important;
  padding-right: 20px !important;
  padding-left: 20px !important;
  will-change: padding, background-color;
  transition: padding .2s ease, background-color .18s ease, left .3s ease;
}

.layoutH {
  z-index: 99;
  right: 24px !important;
  left: 284px !important;
  box-shadow: 0 4px 8px -4px rgba(94, 86, 105, .42) !important;
  max-width: calc(1440px - 3rem);
  border-radius: 0 0 10px 10px !important;
}

.cirSize {
  height: 38px !important;
  width: 38px !important;
  margin-right: 8px;
}

.v-menu__content {
  border-radius: 10px;
  box-shadow: 0 4px 14px 0 rgb(94 86 105 / 14%);
  min-width: 230px !important;
  top: 66px !important;
}

.logob {
  width: 266px;
}

.text-date {
  height: 20px !important;
  padding: 0 8px;
}

.headerView {
  width: 100%;
  max-width: 1392px;
  position: relative;
}

#vlistTab {
  padding: 14px 0 !important;
}

.avatarTitle {
  color: rgba(94, 86, 105, .87);
  font-weight: 600;
}

.avatarTitle span {
  font-size: 12px;
}

.avatarSubject {
  color: rgba(94, 86, 105, .38) !important;
  font-size: 13px;
  padding-left: 2px;
  padding-top: 2px;
}

.vlistTab .v-list-item {
  padding-left: 20px;
  margin-bottom: 0 !important;
  cursor: pointer;
}

.vlistTab .v-list-item:hover {
  background: #f7f7f7;
}

.vlistTab .v-divider {
  margin: 8px 0;
}

.vlistTab i {
  font-size: 22px;
  margin-right: 18px;
}

.v-list-item {
  padding-left: 24px;
}

.avaPad {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}

.textTitle {
  font-weight: 600 !important;
  font-size: .875rem !important;
  line-height: 1.25rem !important;
  color: rgba(94, 86, 105, .87);
  margin-bottom: 2px;
}

.textsubtitle {
  color: rgba(94, 86, 105, .68);
  font-size: .875rem !important;
  line-height: 1.25rem !important;
}

#vPading {
  padding: 18px 0 0 !important;
}

.vitemA {
  padding: 0 24px 14px;
}

.vitemB {
  margin-left: 14px;
}

.dropListH {
  min-height: 40px;
  height: 72px;
  padding-top: 4px;
  padding-right: 24px;
  cursor: pointer;
}

.dropListH:hover {
  background: #f7f7f7;
}

.dropListH .theme--light.v-card {
  background: none;
}

.bgD {
  background: none !important;
}

.fColor {
  color: #0067ae;
  font-weight: 500;
}

.set {
  height: 42px !important;
  min-width: 42px !important;
  padding: 0 !important;
}

.customizerBtn {
  position: fixed;
  top: 50%;
  height: 42px !important;
  width: 42px !important;
  transform: translateX(-50%);
  right: -22px;
}

.customizerBtn a {
  border-top-left-radius: 10px !important;
  border-bottom-left-radius: 10px !important;
}

.customizerBtn a span i {
  color: #fff !important;
}

.v-application--is-ltr .v-list-item__action:first-child, .v-application--is-ltr .v-list-item__icon:first-child {
  margin-right: 20px;
}

.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  color: rgba(94, 86, 105, .87);
}

.v-list-item__icon i {
  color: rgba(94, 86, 105, .87);
}

.foBg {
  padding: 64px 0px 56px 260px !important;
}

.foLogo {
  height: 58px;
  margin: 12px 0 0 27px;
}

.navBt {
  display: none;
}

.navBt i {
  color: #8e8997 !important;
}

.forTitle {
  font-size: 22px;
  font-weight: 600;
  color: #4c90bb;
}

.theme--light.v-list-item--active:hover::before, .theme--light.v-list-item--active::before {
  box-shadow: 0 5px 10px -4px rgb(94 86 105 / 42%);
  transition: box-shadow .28s cubic-bezier(.4, 0, .2, 1);
}

.v-item--active {
  background: linear-gradient(98deg, #2191d0, #43759d 94%);
  color: #fff;
}

.title-wrapper {
  width: 100%;
  position: absolute;
  left: 0;
  top: 102px;
  border-bottom: 1px solid rgba(94, 86, 105, .14);
  line-height: .1em;
}

.theme--light.v-subheader {
  height: 38px;
}

.theme--light.v-subheader span {
  background: #f4f5fa;
  padding: 0 20px;
}

.v-application--is-ltr .v-list.v-sheet--shaped {
  padding-right: 0;
}

.foFooter {
  background: #fff;
  border-radius: 14px 14px 0 0;
  left: 284px !important;
  right: 24px !important;
  padding: 16px 30px;
  box-shadow: 0 -4px 8px -4px rgba(94, 86, 105, .42) !important;
  max-width: calc(1440px - 3rem);
}

.footerColor {
  color: #228fcd
}

.foFooter span {
  color: rgba(94, 86, 105, .68) !important;
}

.v-list {
  padding: 28px 0 !important;
}

.maxSize {
  max-width: 1440px;
  position: relative;
}

.eventSpan {
  text-align: right;
  margin: 10px 0 0 30px;
  font-size: 12px;
  color: #adadad;
}

.evertBox {
  max-width: 280px;
  width: 100%;
}

.evertBox2 {
  max-width: 80px;
  width: 100%;
}

.btnSector {
  margin: 4px 20px;
}

.vPaddingT {
  padding: 12px 0 !important;
}

.headerView .container {
  padding-bottom: 0px;
}

.a-link {
  color: #5e5669de;
}

@media (max-width: 1262px) {
  .navbare nav {
    width: 266px !important;
    padding-right: 20px;
  }

  .layoutH {
    left: 24px !important;
  }

  .foBg {
    padding: 64px 0px 56px !important;
  }

  .navBt {
    display: block;
  }

  .foFooter {
    left: 24px !important;
  }

  .forTitle {
    margin-top: 8px;
  }

  .tabBtn {
    margin-top: 4px;
  }

  .foicon {
    display: none;
  }
}
</style>
