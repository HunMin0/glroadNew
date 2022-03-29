<template>
  <v-container fluid class="footerBg">
    <v-row align="center" justify="center">
      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="8">
        <v-row class="footSet">
          <v-col cols="12" xs="12" sm="12" md="12" lg="2" xl="2">
            <div class="footLogo"><nuxt-link to="/"><v-img height="64px" src="/images/logo2.png" contain></v-img></NUXT-LINK></div>
          </v-col>
          <v-col cols="6" xs="6" sm="3" md="3" lg="2" xl="2">
            <ul class="pa-3">
              <li><p>소개</p>
                <ul class="pa-0">
                  <li title="회사소개"><router-link to="/aboutus"><span>회사소개</span></router-link></li>
                  <li title="서비스소개"><router-link to="/service"><span>서비스소개</span></router-link></li>
                </ul>
              </li>
            </ul>
          </v-col>
          <v-col cols="6" xs="6" sm="3" md="3" lg="2" xl="2">
            <ul class="pa-3">
              <li><p>기능</p>
              <ul class="pa-0">
                <li title="스케줄조회"><router-link to="/procedure"><span>스케줄조회</span></router-link></li>
                <li title="수출진행"><router-link to="/export"><span>수출진행</span></router-link></li>
                </ul>
              </li>
            </ul>
          </v-col>
          <v-col cols="6" xs="6" sm="3" md="3" lg="2" xl="2">
            <ul class="pa-3">
              <li><p>고객센터</p>
              <ul class="pa-0">
                <li title="공지사항"><router-link to="/notices"><span>공지사항</span></router-link></li>
                <li title="자주묻는질문"><router-link to="/faqs"><span>자주묻는질문</span></router-link></li>
                <li title="제휴/문의"><router-link to="/contactus"><span>제휴/문의</span></router-link></li>
                </ul>
              </li>
            </ul>
          </v-col>
          <v-col cols="6" xs="6" sm="3" md="3" lg="2" xl="2">
            <ul class="pa-3">
              <li><p>비즈니스</p>
              <ul class="pa-0">
                <li title="포워딩입점문의"><router-link to="/store"><span>포워딩입점문의</span></router-link></li>
                </ul>
              </li>
            </ul>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="8">
        <div class="footer fotterLine">
          <p>대표 : 이영우&emsp;<span>I</span>&emsp;주소 : 서울특별시 송파구 올림픽로 336, 4층 C08호&emsp;<span>I</span>&emsp;TEL : 070-7731-1004  <span>I</span>&emsp;E-Mail : support@glroad.kr <span>I</span>&emsp;Copyright © 2022 GLROAD All rights reserved.</p>
          <ul class="pa-0">
            <li title="서비스이용약관"> <router-link to="/">서비스이용약관</router-link></li>
            <li><span>I</span></li>
            <li title="개인정보처리방침"> <router-link to="/">개인정보처리방침</router-link></li>
            <li><span>I</span></li>
            <li title="이메일무단수집거부"> <router-link to="/">이메일무단수집거부</router-link></li>
            <li><span></span></li>
          </ul>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
  .footerBg{background: #2b2f3b; padding: 50px 40px 0;}
  .fotterLine {border-top: 1px solid #4c4d4e;}
  .footLogo {padding-right: 50px;}
  .footSet ul li {list-style: none;}
  .footSet ul li p{color: #b7b7b7; font-size: 1.1rem; font-weight: 600;}
  .footSet ul li ul li {font-size: 0.875rem; margin-bottom: 10px;}
  .footer {padding: 20px 0; margin-top: 10px;}
  .footer p {color: #777b85; font-size: 0.938rem; margin-bottom: 5px;}
  .footer ul li {color: #a7a6a6; list-style: none; font-size: 0.938rem;  line-height: 2.125rem; display: inline-block; margin-right: 10px;}
  .footer ul li span {color: #777b85;}
  .footer ul li:first-child {margin-bottom: 10px;}
  .v-application a{color:#b7b7b7;}
  @media (min-width: 605px){
     .footerTerms ul li{ line-height: 32px;}
     .footerTerms ul li span {font-size: 1rem; font-weight: 400;}
  }
  @media (max-width: 960px){
  }
</style>
