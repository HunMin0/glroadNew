<template>
  <div class="sectionM">
    <v-container>
      <v-row>
        <v-col>
          <div class="aboutTitle">
            <p>지금바로 수출가능한 주요도착지 <v-icon>mdi-map-marker-multiple</v-icon></p>
            <p>주요 수출국가를 빠르게 검색하세요.</p>
          </div>
          <div class="pager">
            <!--ul>
              <li>수출지 더보기</li>
              <li class="cre"><a href="#none"><v-icon>mdi-chevron-left</v-icon></a></li>
              <li class="cre"><a href="#none"><v-icon>mdi-chevron-right</v-icon></a></li>
            </ul-->
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="pa-0">
    <v-row no-gutters>
      <v-col v-for="(item, i) in items" :key="i" cols="12" xs="12" sm="6" md="6" lg="6" xl="3">
        <v-card class="pa-2 cardHover" outlined tile>
          <v-card-text>
            <div>화물도착지</div> <p class="text-h4 text--primary">{{item.pod_fullname}}</p> <p>{{item.pol_fullname}}에서 출발</p>
            <div class="text--primary">{{item.transit_type_name}} {{item.container_name}} {{item.remain_cbm}}CBM이상</div>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="#2392d0" :to="`/schedules/${item.id}`"> <v-icon>mdi-magnify</v-icon> 조회하기 </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script>
export default {
  name: 'SectionPol',
  async fetch() {
    const data = (await this.$axios.get('/schedules/favorites')).data;
    this.items = data;
  },
  data: () => ({
    items: [],
  }),
}
</script>

<style scoped>
  .cardHover:hover {background: #f5f5f5;}
  .aboutTitle p:first-child {font-size: 1.625rem; font-weight: 600;}
  .aboutTitle p:first-child i {font-size: 1.700rem;}
  .aboutTitle p:last-child {font-size: 1.1rem; line-height: 14px}
  .aboutTitle span {color: #72c09f;}
  .pager {width: 100%; text-align: right; margin-bottom: 20px;}
  .pager ul li {list-style: none; display: inline-block; }
  .pager ul li:first-child {vertical-align: text-top;}
  .cre {margin: 0.3rem 8px; text-align: center; position: relative;}
  .cre::before {
    content: ''; width: 32px; height: 32px; border-radius: 50%;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    position: absolute; top: -3px; left: -3px;
  }
  .cre a i {color: rgba(0, 0, 0, 0.54);}
  .cre:hover::before {background: #ededed;}
  .cre:active a i {color: #fff;}

  @media (min-width: 605px){
    .sectionM {padding: 80px 0 140px;}
  }
  @media (max-width: 960px){
   .sectionM {padding: 50px 0 70px;}
  }
</style>
