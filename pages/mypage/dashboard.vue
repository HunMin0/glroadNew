<template>
  <v-container class="mypageBg layouts-bottom" fluid>
    <v-row class="justify-center">
      <v-col>
        <v-container>
          <v-row class="justify-center">
            <v-col cols="12" xl="9">
              <div class="vCardBg mypageMP">
              <v-card class="mx-auto d-flex" elevation="0">
                <v-list-item three-line>
                  <v-card elevation="0" max-width="80">
                    <v-list-item-avatar size="80" color="#ddd" class="bottom-margin-0">
                    <v-img class="elevation-6" alt=""
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light">
                    </v-img>
                  </v-list-item-avatar>
                  <div class="text-overline text-center memberText">
                    일반회원
                  </div>
                  </v-card>
                  <v-card elevation="0" class="userTitle">
                    <v-list-item-content>
                    <v-list-item-title class="text-h5 mb-2 memberTextColor">
                      <span class="userName">{{member.name}}</span>님, 오늘도 찾아주셔서 감사합니다.
                    </v-list-item-title>
                    <v-list-item-subtitle class="textsetting">glroadtest@gmail.com</v-list-item-subtitle>
                  </v-list-item-content>
                  </v-card>
                </v-list-item>

                <v-card-actions>
                  <v-tooltip top color="primary">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn text to="/notices" dark v-bind="attrs" v-on="on" min-width="52">
                        <v-icon color="#767676">mdi-bell-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>공지사항</span>
                  </v-tooltip>

                  <v-tooltip top color="primary">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn text to="/contactus" dark v-bind="attrs" v-on="on" min-width="52">
                        <v-icon color="#767676">mdi-comment-processing-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>1:1고객센터</span>
                  </v-tooltip>

                  <v-tooltip top color="primary">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn text to="/mypage/profile" dark v-bind="attrs" v-on="on" min-width="52">
                        <v-icon color="#767676">mdi-account-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>내정보관리</span>
                  </v-tooltip>

                  <v-tooltip top color="primary">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn text @click="logout" dark v-bind="attrs" v-on="on" min-width="52">
                        <v-icon color="#767676">mdi-power</v-icon>
                      </v-btn>
                    </template>
                    <span>로그아웃</span>
                  </v-tooltip>
                </v-card-actions>
              </v-card>
              </div>
            </v-col>
          </v-row>

         <v-row class="justify-center">
            <v-col cols="12" xl="9">
              <div class="vCardBg">
                <v-row>
                  <v-col cols="9" class="columLine-right">
                     <NuxtChild />
                    </v-col>
                    <v-col cols="3">
                      <ul class="dashboardUl">
                        <li class="spanActive"><router-link to="/mypage/dashboard"><span>나의 스케줄</span></router-link></li>
                        <li><router-link to="/mypage/dashboard/questions"><span>나의 문의내역</span></router-link></li>
                        <li><router-link to="/mypage/dashboard/reviews"><span>나의 리뷰관리</span></router-link></li>
                        <li><router-link to="/contactus"><span>1:1문의</span></router-link></li>
                      </ul>
                      <div class="manager-box columLine-top">
                        <div class="d-flex justify-space-between">
                          <p class="managerTitle">전담 매니저</p>
                          <p class="managerMore"><router-link to="/contactus">1:1 문의 <span>></span></router-link></p>
                        </div>
                        <v-card class="mx-auto" elevation="0">
                          <v-list-item three-line class="left-padding-0 right-padding-0">
                            <v-list-item-avatar tile size="80" color="#f3f3f3">
                            <v-img src="https://cdn.vuetifyjs.com/images/cards/plane.jpg"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <p class="mangerCustom">1588-1234 고객센터로 연락주시면 친절하게 안내드리겠습니다.</p>
                            </v-list-item-content>
                          </v-list-item>
                          <v-card-actions class="left-padding-0 right-padding-0 top-padding-0">
                            <v-btn outlined text width="100%" height="44" :ripple="{ class: 'white--text' }" to="/contactus">
                              1:1 고객센터
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </div>
                      <div class="manager-box columLine-top">
                        <div class="d-flex justify-space-between">
                          <p class="managerTitle">글로드 알림</p>
                          <p class="managerMore"><router-link to="/notices">더보기 <span>></span></router-link></p>
                        </div>
                        <v-card class="mx-auto" elevation="0">
                          <v-list-item class="left-padding-0 right-padding-0">
                            <v-list-item-content class=" top-padding-0">
                              <v-list-item-subtitle class="noticeCustom">[공지사항] 영세·중소 사업자 대상 카드결제 수수료 인하 안내</v-list-item-subtitle>
                              <v-list-item-subtitle class="noticeCustom">[공지사항] 스마트스토어 전산 시스템 점검 작업에 따른 영향 안내</v-list-item-subtitle>
                              <v-list-item-subtitle class="noticeCustom">[공지사항] 네이버페이 결제형 서비스 OPEN!</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-card>
                      </div>
                    </v-col>
                </v-row>
              </div>
            </v-col>
         </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DefaultLayout from "../../layouts/default";
import Search from "../../components/Search";

export default {
  name: "dashboard",
  auth: true,
  components: {DefaultLayout, Search},
  async asyncData({params, route, $axios}) {
    //console.log(params, route);
    const response = await $axios.get('/dashboard');
    //console.log('data', response.data.data)
    return {...response.data.data}
  },
  data: () => ({
  }),
  methods: {
    async logout() {
      await this.$auth.logout();
    }
  }
}
</script>

<style scoped>
  .mypageMP {margin: 50px 0 10px;}
  .memberText {color: #727272; font-weight: 600;}
  .memberTextColor {color: #464646;}
  .textsetting {font-size: 16px;}
  .userTitle{margin: 0 34px;}
  .userName {position: relative;color: #0068ae;}
  .userName::after {content: ''; width: 100%; opacity: 1; border-bottom: 5px solid rgba(149,149,149,.3); position: absolute; bottom: 3px; left: 0;}

  /*color: #5c6067;*/
  .dashboardUl {padding-top: 20px;}
  .dashboardUl li:first-child {border-top: none;}
  .dashboardUl li {margin-right: 20px; list-style: none; border-top: 1px solid #eff2f6;}
  .dashboardUl li a {display: block; font-size: 16px; line-height: 56px; letter-spacing: -0.48px; color: #70757d; position: relative;}
  .dashboardUl li a span {position: relative;}
  .dashboardUl li a::after {font-family: cursive; font-weight: 600; content: '>'; display: block; width: 13px; height: 16px; font-size: 16px; line-height: 16px; letter-spacing: -0.48px; text-align: center; color: #c8ccd1; position: absolute; top: 50%; right: 0; transform: translateY(-50%);}
  .dashboardUl li:hover span {color: #001e1e;}
  .dashboardUl li:hover span::after {content: ''; width: 100%; opacity: 1; border-bottom: 5px solid rgba(38, 172, 226, .3); position: absolute; bottom: -1px; left: 0; transition: width .2s ease-in-out, opacity .2s ease-in-out;}
  .spanActive a {color: #001e1e;}
  .spanActive a span::after{content: ''; width: 100%; opacity: 1; border-bottom: 5px solid rgba(38, 172, 226, .3); position: absolute; bottom: -1px; left: 0; transition: width .2s ease-in-out, opacity .2s ease-in-out;}
  .liIcon {position: absolute; right: 10;}

  .manager-box {margin: 40px 0; padding: 40px 20px 0;}
  .managerTitle {font-size: 20px;font-weight: 700;line-height: 29px;letter-spacing: -0.6px;color: #001e1e;}
  .managerMore a{margin: 4px 0 0; text-decoration: none; font-size: 15px; font-weight: 300; line-height: 22px; text-align: right; color: #687077;}
  .managerMore a span {font-family: cursive; font-weight: 600; color: #ccc;}
  .mangerCustom {font-size: 15px; font-weight: 300; line-height: 1.7; padding-top: 6px; font-style: normal; letter-spacing: -0.20px; color: #5c6067;}
  .noticeCustom {font-size: 15px; font-weight: 300; line-height: 1.8; padding-top: 6px; font-style: normal; letter-spacing: -0.20px; color: #5c6067;}

</style>
