<template>
  <div class="Promotion">
    <div class="PromotionTitle">
      <h1>강력한 <span>보안</span> 위 풍부한 소통</h1>
      <p>기업의 정보를 안전하게 관리하면서도 쉽고 빠르게 소통하세요.</p>
    </div>
     <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="10" xs="10" sm="10" md="10" lg="3" xl="2" class="text-center"
          v-for="(item,i) in items"
          :key="i"
        >
          <v-card class="cardStyle" elevation="0" >
            <v-card-text>
              <div>
                <v-img :src="item.imgIcon" :height="100" contain></v-img>
              </div>
              <p class="firstTitle">{{item.firstTitle}}</p>
              <p class="subject">{{item.subject}}</p>
              <div class="subject">{{item.lastText}}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
     </v-container>
  </div>
</template>

<script>
export default {
  name: 'Promotion',
  data: () => ({
    items: [
      {
        imgIcon: '/images/icon01.png',
        firstTitle: '실시간 컨테이너 공간 검색',
        subject: '필요한 컨테이너 공간을 CBM( 박스당 규격)을 등록하고 출발일자 와 출발 , 도착 항을기록 후 검색 하면 관련한 필요한 컨테이너공간을 일자별, 가격별로 찾아줍니다.',
        lastText: '더 이상 견적을 받는 기다리는 시간이 필요하지 않습니다 즉각적으로 필요 공간에 대한 견적을 볼 수 있습니다.'
      },
      {
        imgIcon: '/images/icon02.png',
        firstTitle: '간편한 진행 절차 모바일 사용 환경',
        subject: '컨테이너 계약 결제, 문서등록 , 수출 허가 및 모든 과정이 간편하게 플랫폼을 통해 진행되고 모든 과정은 모바일을 통해 진행됨으로 관련 업무가 80% 줄어듭니다.',
        lastText: '수출되는 모든 화물은 같은 화물 코드를 위주로 매칭 검색 해주어 수출허가 입국시 보다 빠르게 수출 과정이 마무리 되도록합니다.'
      },
      {
        imgIcon: '/images/icon03.png',
        firstTitle: '전과정 스마트 오퍼레이팅으로 진행',
        subject: '모든 수출의 과정은 단계별로 모바일을 통해 자동으로 푸시 기능을 통해 알려드립니다 확인 관련 업무가 줄어들고 책임 있는 과정으로 수출이 진행 됩니다.',
        lastText: '수출 항구에 도착하면 관련 도착 정보를 알려 드림으로 정확한 업무 절차가 이루어지도록 합니다.'
      }
    ],
  }),
}
</script>

<style scoped>
  .cardStyle{box-shadow: 0 14px 24px rgb(0 18 47 / 8%)!important; border-radius: 24px; padding: 30px 16px;}
  .firstTitle{font-weight: 700; font-size: 1.30rem; line-height: 42px; margin: 24px 0;}
  .subject{font-size: 1rem; line-height: 30px; text-align: center; margin-top: 20px;}
  .lastArea{font-weight: 400; font-size: 1.110rem; line-height: 20px; color: #a2a2a2; margin: 25px 10px 0 0;}
  .lastArea i {color: #a2a2a2;}
  @media (min-width: 605px){
    .firstTitle{font-size: 1.30rem;}
    .cardStyle{min-height: 540px;}
  }
  @media (max-width: 1400px){
    .cardStyle{min-height: auto}
  }
  @media (max-width: 960px){
    .firstTitle{font-size: 1.10rem;}
    .PromotionTitle{font-size: 0.9rem;}
  }
</style>
