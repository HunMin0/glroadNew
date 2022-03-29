<template>
  <div class="aboutSlid">
    <div class="aboutTitle">
      <p>가장 쉬운 수출업무를 경험하세요.<br/>「<span>화주 중심의 디지털 수출 플랫폼</span>」</p>
      <p>필요한 공간을 검색하고, 실시간 스케줄과 견적을 체크하면,<br/>
          모든 과정이 스마트하게 이루어집니다.</p>
    </div>
    <v-stepper non-linear flat alt-labels>
        <v-stepper-header>
            <v-stepper-step editable step="1" color="#1f8bca" v-ripple="false">
                공간검색
            </v-stepper-step>
                <v-divider></v-divider>
            <v-stepper-step editable step="2" color="#1f8bca" v-ripple="false">
                구매결정
            </v-stepper-step>
                <v-divider></v-divider>
            <v-stepper-step editable step="3" color="#1f8bca" v-ripple="false">
                오페레이팅
            </v-stepper-step>
                <v-divider></v-divider>
            <v-stepper-step editable step="4" color="#1f8bca" v-ripple="false">
                수출완료
            </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
            <v-stepper-content step="1">
              <!-- 슬라이드 스텝1 -->
              <v-row>
                <v-col cols="12" xs="12" sm="12" md="7" lg="7" xl="7">
                  <div class="cardImg">
                    <v-img src="/images/date.png" contain max-height="360"/>
                  </div>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="5" lg="5" xl="5">
                  <v-card class="mx-auto"  elevation="0">
                  <v-list-item>
                    <v-list-item-content>
                      <v-card-title class="fontStyleTitle">ABOUT US</v-card-title>
                      <v-card-text class="fontStyleH1">실시간 컨테이너 공간 정보 검색</v-card-text>
                      <v-card-subtitle class="fontStyleH2">아래 세 가지 정보만을 입력 하여 소화물 컨테이너의 <span>스케줄 및 최저가를 빠르게 검색</span> 할 수 있습니다.</v-card-subtitle>
                      <v-card-text>
                        <ul class="listStyle">
                          <li><v-icon dense>mdi-arrow-right-drop-circle-outline</v-icon> 수출하고자 하는 일자</li>
                          <li><v-icon dense>mdi-arrow-right-drop-circle-outline</v-icon> 컨테이너 필요한 공간</li>
                          <li><v-icon dense>mdi-arrow-right-drop-circle-outline</v-icon> 수출하는 나라 지정 입력</li>
                        </ul>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn depressed color="accent" width="130px" height="50px">
                          Read More
                        </v-btn>
                      </v-card-actions>
                    </v-list-item-content>
                  </v-list-item>
                  </v-card>
                </v-col>
              </v-row>
              <!-- 스텝1 종료 -->
            </v-stepper-content>
            <v-stepper-content step="2">
              <!-- 슬라이드 스텝2 -->
              <v-row>
               <v-col cols="12" xs="12" sm="12" md="7" lg="7" xl="7">
                  <div class="cardImg">
                    <v-img src="/images/date02.png" contain max-height="360"/>
                  </div>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="5" lg="5" xl="5">
                  <v-card class="mx-auto"  elevation="0">
                  <v-list-item>
                    <v-list-item-content>
                      <v-card-title class="fontStyleTitle">ABOUT US</v-card-title>
                      <v-card-text class="fontStyleH1">스마트한 구매결정과 진행절차</v-card-text>
                      <v-card-subtitle class="fontStyleH2">필요한 컨테이너 공간과 <span>가격정보, 픽업정보를 확인하고 가장 적합한 컨테이너</span>를 빠르게 계약하세요.</v-card-subtitle>
                      <v-card-text>
                        <ul class="listStyle">
                          <li><v-icon dense>mdi-arrow-right-drop-circle-outline</v-icon> 가격별 조회 가능</li>
                          <li><v-icon dense>mdi-arrow-right-drop-circle-outline</v-icon> 출발일자별 조회 가능</li>
                          <li><v-icon dense>mdi-arrow-right-drop-circle-outline</v-icon> 수출문서 등록 및 대리신청</li>
                        </ul>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn depressed color="accent" width="130px" height="50px">
                          Read More
                        </v-btn>
                      </v-card-actions>
                    </v-list-item-content>
                  </v-list-item>
                  </v-card>
                </v-col>
              </v-row>
              <!-- 스텝2 종료 -->
            </v-stepper-content>
            <v-stepper-content step="3">
              <!-- 슬라이드 스텝3 -->
              <v-row>
                <v-col cols="12" xs="12" sm="12" md="7" lg="7" xl="7">
                  <div class="cardImg">
                    <v-img src="/images/date03.png" contain max-height="360"/>
                  </div>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="5" lg="5" xl="5">
                  <v-card class="mx-auto"  elevation="0">
                  <v-list-item>
                    <v-list-item-content>
                      <v-card-title class="fontStyleTitle">ABOUT US</v-card-title>
                      <v-card-text class="fontStyleH1">모든 일정을 자동으로 관리</v-card-text>
                      <v-card-subtitle class="fontStyleH2">픽업 출발부터 도착까지 구매결정이후 <span>모든 수출진행 과정을 실시간으로 추적</span>하여 자동으로 관리합니다.</v-card-subtitle>
                      <v-card-text>
                        <ul class="listStyle">
                          <li><v-icon dense>mdi-arrow-right-drop-circle-outline</v-icon> 픽업 출발/도착 알림</li>
                          <li><v-icon dense>mdi-arrow-right-drop-circle-outline</v-icon> 창고입고 알림</li>
                          <li><v-icon dense>mdi-arrow-right-drop-circle-outline</v-icon> 출항/도착 알림</li>
                        </ul>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn depressed color="accent" width="130px" height="50px">
                          Read More
                        </v-btn>
                      </v-card-actions>
                    </v-list-item-content>
                  </v-list-item>
                  </v-card>
                </v-col>
              </v-row>
              <!-- 스텝3 종료 -->
            </v-stepper-content>
            <v-stepper-content step="4">
              <!-- 슬라이드 스텝4 -->
              <v-row>
                <v-col cols="12" xs="12" sm="12" md="7" lg="7" xl="7">
                  <div class="cardImg">
                    <v-img src="/images/date04.png" contain max-height="360"/>
                  </div>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="5" lg="5" xl="5">
                  <v-card class="mx-auto"  elevation="0">
                  <v-list-item>
                    <v-list-item-content>
                      <v-card-title class="fontStyleTitle">ABOUT US</v-card-title>
                      <v-card-text class="fontStyleH1">소화물 수출이 더욱 쉬워집니다.</v-card-text>
                      <v-card-subtitle class="fontStyleH2">수출완료까지 필요한 <span>모든과정을 모바일에서 원클릭으로 안전</span>하게 진행 하실 수 있습니다.</v-card-subtitle>
                      <v-card-text>
                        <ul class="listStyle">
                          <li><v-icon dense>mdi-arrow-right-drop-circle-outline</v-icon> 인증된 포워딩 업체</li>
                          <li><v-icon dense>mdi-arrow-right-drop-circle-outline</v-icon> 단계별 진행상황 모바일 푸시알림</li>
                          <li><v-icon dense>mdi-arrow-right-drop-circle-outline</v-icon> 에스크로 결제 후 후불 집행 가능</li>
                        </ul>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn depressed color="accent" width="130px" height="50px">
                          Read More
                        </v-btn>
                      </v-card-actions>
                    </v-list-item-content>
                  </v-list-item>
                  </v-card>
                </v-col>
              </v-row>
              <!-- 스텝4 종료 -->
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
export default {
  name: 'AboutSlid',
  data: () => ({

  }),
}
</script>

<style scoped>
  .aboutSlid {padding-bottom: 80px;}
  .v-stepper__header{box-shadow:none;}
  .theme--light.v-stepper .v-stepper__step--editable:hover{background: none;}
  .v-stepper__step--active::after{content: ' '; height: 0; width: 0; position: absolute; bottom: -5px; border: 10px solid transparent; border-bottom-width: 0; border-top-color: #ddd; left: 77px;}
  .aboutTitle {text-align: center; padding: 80px 0 40px;}
  .aboutTitle p:first-child {font-size: 1.625rem; font-weight: 600;letter-spacing: 2px;}
  .aboutTitle p:last-child {line-height: 30px}
  .aboutTitle span {color: #1f8bca;}
  .cardImg{border: 1px solid #ddd; padding: 30px; max-height: 416px;}
  .fontStyleTitle{color: #1f8bca; font-size: 0.938rem;}
  .fontStyleTitle::after{content: ' '; width: 30px; height: 2px; top: 43px; position: absolute; left: 114px; background: #1f8bca;}
  .fontStyleTitle::before{content: ' '; width: 50px; height: 2px; top: 38px; position: absolute; left: 114px; background: #1f8bca;}
  .fontStyleH1 {font-size: 1.688rem; font-weight: 600; letter-spacing: -1px;}
  .fontStyleH2 {font-size: 1.125rem; line-height: 30px; padding-top: 5px;}
  .fontStyleH2 span {font-weight: 600;}
  .listStyle {padding: 0; margin-top: 10px;}
  .listStyle li {list-style: none; line-height: 30px; font-size: 0.938rem;}
  .listStyle li i {color: #1f8bca; margin-right: 2px;}
  .v-stepper__items{margin-top: 10px;}
  .v-card__actions{padding: 16px;}
  .v-application .accent{background-color: #1f8bca !important; border-color: #1f8bca !important;}
  @media (max-width: 960px){
    .aboutSlid {padding-bottom: 20px;}
  }
</style>
