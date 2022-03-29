<template>
  <v-container fluid class="ma-0 pa-0" fill-height>
    <v-row>
      <v-col>
        <Menu ref="menu" />
        <!-- 메인비쥬얼 -->
        <v-carousel
          fullscreen
          height="calc(100vh - 0px)"
          hide-delimiter-background
          show-arrows-on-hover
          hide-delimiters
          >
          <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
          >
          <v-row>
            <v-col>
              <!-- 오버레이영역 -->
              <div class="overlayMam">
                <!-- 비쥬얼 텍스트 -->
                <v-row justify="center" align="center" class="setHeight">
                  <v-spacer/>
                    <v-col cols="10" xs="10" sm="10" md="10" lg="10" xl="8">
                      <div class="textTitle animate__animated animate__fadeInRight fadeInRight">
                        <p class="">GLROAD SERVICE</p>
                        <p class="slidTitle" v-text="item.fristText"></p>
                        <p class="slidSub" v-text="item.lastText"></p>
                      </div>
                      <div class="visualMore animate__animated animate__fadeIn animate__delay-1s"><schedule-search></schedule-search></div>
                    </v-col>
                  <v-spacer/>
                </v-row>
                <v-row class="btArr animate__animated animate__fadeIn animate__delay-2s">
                  <v-col>
                    <div class="bottomArr" title="이동">
                        <div class="s">
                          <v-btn class="align-self-end mt-15" color="#fff" fab outlined @click="$vuetify.goTo('#about')">
                          <v-icon>mdi-chevron-down</v-icon>
                          </v-btn>
                        </div>
                      </div>
                  </v-col>
                </v-row>
              </div>
            <v-overlay :value="overlay" class="overlayStyle" />
              <!-- 오버레이영역 종료-->
            </v-col>
          </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ScheduleSearch from "../components/ScheduleSearch";
import Menu from "./Menu";
export default {
  name: 'Visual',
  components: {Menu, ScheduleSearch},
  data: () => ({
    overlay: false,
    items: [
      {
        src: '/images/bg02.jpg', link: '/',
        fristText: '새로운 수출, GLROAD로 빠르게 시작하세요.',
        lastText: 'GLROAD는 간편하면서도 가장 안전한 소화물 수출 플랫폼 입니다.',
      },
      {
        src: '/images/bg01.jpg', link: '/',
        fristText: '새로운 수출, GLROAD로 빠르게 시작하세요.',
        lastText: 'GLROAD는 간편하면서도 가장 안전한 소화물 수출 플랫폼 입니다.',
      },
    ]
  })
}
</script>

<style scope>
.theme--light.v-tabs .v-tab:hover::before {opacity: 0;}
.theme--light.v-tabs .v-tab--active:focus::before {opacity: 0;}
.overlayMam {width: auto; height: 100vh; position: relative; z-index: 999;}
.overlayStyle{position: absolute; z-index: 99;}
.textTitle {color: #fff;}
.slidTitle {font-size: 3rem;}
.slidSub{font-size: 1.2rem;}
.visualMore {margin: 80px 0 0 0;}
.btArr {position: absolute; bottom: 40px; width: 100%;}
.bottomArr {text-align: center;}
@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(300px); }
  to { opacity: 1; }
}
@media (min-width: 605px){
  .slidTitle {font-size: 3rem;}
  .slidSub{font-size: 1.2rem;}
  .visualMore {margin: 80px 0 0 0;}
}
@media (max-width: 960px){
  .slidTitle {font-size: 1.9rem;}
  .slidSub{font-size: 1.2rem;}
  .visualMore{margin: 30px 0;}
}
</style>
