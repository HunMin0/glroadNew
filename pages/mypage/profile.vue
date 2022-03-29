<template>
  <v-container class="mypageBg layouts-bottom" fluid>
    <v-row class="justify-center content-center2">
      <div class="vCardLoginBg">
        <v-col class="pa-0">
          <v-card flat class="sideTab">
            <v-tabs class="vTabLink">
              <v-tab to="/mypage/profile" active-class="avtiveClassT" :ripple="false"><v-icon>mdi-account-box-outline</v-icon> &nbsp;내정보수정</v-tab>
              <v-tab to="/mypage/profile/business" active-class="avtiveClassT" :ripple="false"><v-icon>mdi-wallet-travel</v-icon> &nbsp;사업자정보 수정</v-tab>
              <v-tab to="/mypage/profile/editpassword" active-class="avtiveClassT" :ripple="false"><v-icon>mdi-lock-outline</v-icon> &nbsp;비밀번호 수정</v-tab>
            </v-tabs>
          </v-card>
           <NuxtChild />
        </v-col>
      </div>
    </v-row>

  </v-container>
</template>

<script>
export default {
  
  name: "profile",
  mounted() {
    //console.log('mounted reviews');
    this.init();
  },
  data: () => ({
    errors: {}
  }),
  methods: {
    async init() {
      const response = await this.$axios.get('/dashboard/profile');
      this.items = response.data.data.items;
    }
  }
}
</script>

<style scoped>
::v-deep .v-main__wrap {background:#eff2f6!important ;}
.vCardLoginBg {margin: 50px 0 150px; padding: 30px 40px 30px!important;}
.sideTab {margin-bottom: 20px;}
::v-deep .vTabLink .v-tab {font-size: 0.9rem; margin: 0 5px;}
::v-deep .vTabLink .v-slide-group__content {border-bottom:1px solid rgba(58, 53, 65, 0.12)}
.vTabLink a {color:#333}
::v-deep .vinpuT .v-label {color: #969696;}
::v-deep .vinpuT .v-input__slot {padding: 0 18px!important;}
::v-deep .v-text-field fieldset, .v-text-field .v-input__control, .v-text-field .v-input__slot {border: 1px solid #d4d3d5;}
::v-deep .fText .v-label {font-size: 14px;}
.avtiveClassT {color: #1976d2!important;}

@media (max-width: 590px){
  .vTabLink .v-tab {margin: 0; padding: 0.3rem;}
  ::v-deep .vTabLink .v-slide-group__prev {display: none!important;}
}
  @media (min-width: 600px){
    .vCardLoginBg {
        width: 1232px;
    }
  }
</style>
