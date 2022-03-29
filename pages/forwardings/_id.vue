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
                  <v-list-item-content>
                    <v-list-item-title class="text-h5 mb-0">
                      <router-link to="/"><v-btn icon class="iconMa ma-0">
                        <v-icon>mdi-arrow-left-thick</v-icon>
                      </v-btn></router-link> 
                      <v-list-item-avatar color="grey darken-3">
                        <v-img class="elevation-6" alt="" src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"/>
                      </v-list-item-avatar>
                      &nbsp;{{ forwarding.company_name }}  <span class="titleSpan">포워딩 회원사 상세정보 입니다.</span>
                    </v-list-item-title>
                  </v-list-item-content>
                  <question-dialog type="forwarding" :id="forwarding.id"></question-dialog>
                </v-list-item>
              </v-card>
              </div>
            </v-col>
          </v-row>

           <v-row class="justify-center">
            <v-col cols="12" xl="9">
              <div class="vCardBg top-padding-0 left-padding-0 right-padding-0 bottom-padding-0">
                <v-card flat class="cardTitleBox">
                  <v-icon class="iconMa">mdi-format-float-left</v-icon> 포워딩사 정보<p class="tispan bottom-margin-0">포워딩사 기본정보 입니다.</p>
                </v-card>


                <v-card tile elevation="0" class="d-flex">
                  <v-card width="50%" elevation="0" class="ssaw2">
                    <v-card-title><v-icon color="#d3d3d3">mdi-code-greater-than</v-icon>&nbsp;소개</v-card-title>
                    <v-divider/>
                    <v-card-text>
                      {{ forwarding.company_desc }}
                    </v-card-text>
                  </v-card>

                   <v-card width="50%" elevation="0" class="ssaw2">
                     <v-card-title><v-icon color="#d3d3d3">mdi-code-greater-than</v-icon>&nbsp;사업자정보</v-card-title>
                      <v-divider/>
                      <v-card-text>
                        회사명 : {{forwarding.company_name}}<br/>
                        설립일 : {{forwarding.company_founding_date}}<br/>
                        사업장 : {{forwarding.address}} {{forwarding.address_detail}}<br/>
                      </v-card-text>
                  </v-card>
                </v-card>
              </div>
            </v-col>
          </v-row>

          <v-row class="justify-center">
            <v-col cols="12" xl="9">
              <div class="vCardBg top-padding-0 left-padding-0 right-padding-0 bottom-padding-0">
                <v-card flat class="cardTitleBox">
                  <v-icon class="iconMa">mdi-star-circle</v-icon> 포워딩사 리뷰<p class="tispan bottom-margin-0">포워딩사를 이용하신 사용자 리뷰입니다.</p>
                </v-card>

                <v-card class="d-flex vbg justify-center">
                  <div class="vbgSide setting-padding-lr-40">
                    <p class="starTitle">사용자 총 평점</p>
                    <p><v-rating :value="1" size="38" color="yellow darken-3" dense half-increments background-color="grey darken-1" empty-icon="$ratingFull"/></p>
                    <p class="starSubject">3.5 <span>/ 5</span></p>
                  </div>

                  <div class="vbgSide setting-padding-lr-40">
                    <p class="starTitle">전체 리뷰수</p>
                    <p><v-icon size="38">mdi-comment-processing-outline</v-icon></p>
                    <p class="starSubject">{{reviews.length}}</p>
                  </div>
                </v-card>

                <v-card flat class="reviewB">
                    <v-list>
                      <template v-for="(item, index) in reviews">
                        <v-list-item :key="item.title" three-line>
                          <template v-slot:default="{ active }">
                            <v-list-item-content class="review-content">
                              <v-list-item-title>
                                <v-card-actions class="ml-0 pl-0">
                                  <v-rating :value="item.rating" color="yellow darken-3" size="20" dense half-increments background-color="grey darken-1" empty-icon="$ratingFull"/>
                                  <span class="review-star">{{ item.rating }}</span>
                                </v-card-actions>
                              </v-list-item-title>
                              <p class="review-set">{{item.masked_name}} · {{ $dayjsFormat(item.created_at) }}</p>
                              <v-list-item-subtitle class="review-text">
                                <v-tooltip bottom>
                                  <template v-slot:activator="{ on, attrs }">
                                    <span v-bind="attrs" v-on="on"> {{ item.content.substring(0, 100) }} </span>
                                  </template>
                                  <!-- <div style="width: 500px" > {{ item.content }}</div> -->
                                </v-tooltip>
                              </v-list-item-subtitle>
                              <v-list-item-subtitle>
                                {{item.contract_schedule.pol}} - {{item.contract_schedule.pod}} | {{item.contract_schedule.transit_type_name}}
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </template>
                        </v-list-item>
                      </template>
                    </v-list>
                </v-card>

              </div>
            </v-col>
          </v-row>

        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppBar from "../../components/AppBar";
import QuestionDialog from "../../components/QuestionDialog";

export default {
  name: "forwardingView",
  components: {QuestionDialog, AppBar},
  async asyncData({params, $axios}) {
    const data = await $axios.$get('/forwardings/' + params.id);
    //console.log(data);
    return data;
  }
}
</script>

<style scoped>
  .cardTitleBox {background: #fafafa; position: relative; padding: 20px 44px; color: #333; font-weight: 500; border-bottom: 4px solid #f0f0f0;}
  .tispan {color: #999; font-size: 12px; position: absolute; right: 48px; top: 25px;}
  .ssaw {margin: 24px;}
  .ssaw2 {padding: 8px 44px 20px;}
  ::v-deep .ssaw2 .v-card__title {font-size: 1rem; font-weight: 600; padding-bottom: 8px!important;}
  .vbg {padding: 35px 29px 32px;background-color: #f8f9fb;box-shadow: none!important;}
  .starTitle {font-size: 15px; color: #646464; font-weight: 600;}
  .starSubject {font-size: 36px;font-weight: 600;color: #434343;  letter-spacing: -1px; margin-bottom: 0 !important;}
  .starSubject span {color: #d1d1d1;}
  .vbgSide {text-align: center; min-width: 290px;}
  .reviewB {padding: 20px 44px;}
  .review-content {border-bottom: 1px solid #ddd; padding-bottom: 30px; margin-bottom: 10px;}
  .review-set {font-size: 14px; color: #aaa; margin-bottom: 20px; margin-top: 2px;}
  .review-star {font-weight: 500; margin-left: 6px;margin-top: 2px;}
  .review-text {color: #666; line-height: 24px; margin-bottom: 20px;}
  @media (max-width: 590px){
      .vbgSide {min-width: auto;}
      .starTitle {font-size: 12px;}
      .starSubject {font-size: 24px;}
      ::v-deep .vbgSide .v-icon.v-icon {font-size: 20px!important;}
  }
</style>
