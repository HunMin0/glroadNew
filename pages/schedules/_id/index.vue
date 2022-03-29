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
                      </v-btn></router-link> 스케줄 접수  <span class="titleSpan">해당 스케줄 건의 접수를 등록합니다.</span>
                    </v-list-item-title>
                  </v-list-item-content>
                  <question-dialog type="schedule" :id="form.schedule_id">문의하기</question-dialog>
                  &nbsp;&nbsp;
                  <v-btn outlined text :to="localePath({name: 'index'})">
                    <v-icon>mdi-format-list-checks</v-icon>&nbsp;검색조건 변경
                  </v-btn>
                </v-list-item>
              </v-card>
              </div>
            </v-col>
          </v-row>

          <v-row class="justify-center">
            <v-col cols="12" xl="9">
              <div class="vCardBg top-padding-0 left-padding-0 right-padding-0 bottom-padding-0">
                <v-card flat class="text-center cardTitleBox d-flex">
                  <v-icon class="iconMa2">mdi-monitor-multiple</v-icon>스케줄 정보 <p class="tispan bottom-margin-0">등록하실 스케줄 조건을 확인해주세요.</p>
                </v-card>
                <v-card tile elevation="0" class="ssaw">
                  <div class="ssaw2">
                     <table id="tableSet2">
                    <tr>
                      <th>출발지</th>
                      <th>도착지</th>
                      <th>일자</th>
                      <th>예상시간</th>
                      <th>화물종류</th>
                      <th class="lastRight">잔여수량</th>
                    </tr>
                    <tr>
                      <td>{{data.pol_fullname}}</td>
                      <td>{{data.pod_fullname}}</td>
                      <td>{{$dayjsFormat(data.departure_date/* +" "+ data.departure_time*/, 'YYYY-MM-DD')}} ~ {{$dayjsFormat(data.arrival_date/* +" "+ data.arrival_time*/, 'YYYY-MM-DD')}}</td>
                      <td>{{data.expected_delivery_days_text}}</td>
                      <td>{{data.container_name}} | {{data.transit_type_name}}</td>
                      <td class="lastRight">잔여 {{data.remain_cbm}}CBM</td>
                    </tr>
                  </table>
                  </div>
                </v-card>
                <v-card class="cardTale d-flex justify-end" elevation="0">
                  <v-card-actions><p class="cardTaleText">서류마감일 <span>{{ $dayjsFormat(data.document_deadline_date + " " + data.document_deadline_time) }}</span></p></v-card-actions>
                  <v-card-actions><p class="cardTaleText2">운송비용 <span>{{Number(data.price).toLocaleString()}}</span> KRW</p></v-card-actions>
                </v-card>
              </div>
            </v-col>
          </v-row>

          <v-row class="justify-center">
            <v-col cols="12" xl="9">
              <div class="vCardBg top-padding-0 left-padding-0 right-padding-0 bottom-padding-0">
                <v-card flat class="text-center cardTitleBox d-flex">
                  <v-icon class="iconMa2">mdi-comment-account</v-icon> 포워딩사 정보 <p class="tispan bottom-margin-0">해당 포워딩사 정보를 정확히 확인해주세요.</p>
                </v-card>
                <v-card tile elevation="0" class="ssaw">
                  <div class="ssaw2">
                    <table class="tableSet3">
                    <tr>
                      <th>포워딩사명</th>
                      <td>
                          <v-list-item-avatar size="40" color="#ddd" class="bottom-margin-0">
                            <v-img class="elevation-6" alt=""
                            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light">
                            </v-img>
                          </v-list-item-avatar> {{data.forwarding.company_name}}
                        </td>
                        <th>연락처</th>
                      <td>{{data.forwarding.telephone}}</td>
                      <th>이메일</th>
                      <td>{{data.forwarding.email}}</td>
                    </tr>
                  </table>
                  </div>
                </v-card>
                <v-card class="cardTale d-flex justify-end" elevation="0">
                  <v-card-actions><p class="cardTaleText3">포워딩사 정보 <span><nuxt-link :to="`/forwardings/${data.forwarding.id}`">{{data.forwarding.company_name}} 보기 </nuxt-link></span></p></v-card-actions>
                </v-card>
              </div>
            </v-col>
          </v-row>

          <v-row class="justify-center">
            <v-col cols="12" xl="9">
              <div class="vCardBg top-padding-0 left-padding-0 right-padding-0 bottom-padding-0">
                <v-card flat class="text-center cardTitleBox d-flex">
                  <v-icon class="iconMa2">mdi-briefcase-upload</v-icon> 서류 등록 <p class="tispan bottom-margin-0">계약진행을 위해 수출문서 등록이 필요합니다.</p>
                </v-card>
                <v-card tile elevation="0" class="ssaw">
                  <div class="ssaw2">
                    <table class="tableSet3">
                      <tr>
                        <th class="minWidth">참고사항</th>
                        <td>
                          - 문서확인 후 포워딩사에서 최종견적을 제공드립니다. <br/>
                          - 과거 진행했던 유사항 스케줄이 있다면 기타 첨부서류에 등록 부탁드립니다.
                        </td>
                      </tr>
                    </table>
                    <!--v-card-text class="bottom-padding-0">
                      <v-card-actions class="left-padding-0 right-padding-0">
                        <v-radio-group v-model="form.is_document_agency" row>
                          <v-radio value="N" label="서류 직접등록"></v-radio>
                          <v-radio value="Y" label="서류 대행신청 (수출문서 등록대행이 필요 시)"></v-radio>
                        </v-radio-group>
                      </v-card-actions>
                    </v-card-text>
                    <v-file-input v-model="form.export_permit_file" :error-messages="errors.export_permit_file" outlined accept="image/*,.pdf" label="* 수출신고필증(Export Permit)" />
                    <v-file-input v-model="form.invoice_file" :error-messages="errors.invoice_file" outlined accept="image/*,.pdf" :label="(form.is_document_agency === 'Y') ? '기타 첨부서류1(과거 인보이스)': '* 인보이스(Invoice)'" />
                    <v-file-input v-model="form.packing_list_file" :error-messages="errors.packing_list_file" outlined accept="image/*,.pdf" :label="(form.is_document_agency === 'Y') ? '기타 첨부서류2(과거 페킹리스트)': '* 패킹리스트(Packing List)'" /-->
                    <div>
                      <div class="subtitle-1 font-weight-black"> * (필수) 인보이스/패킹리스트(CI/PL)</div>
                      <div class="subtitle-2"> 글로드 양식을 통해 간편하게 작성하실 수 있습니다.</div>
                    </div>
                    <template v-for="(item, i) in form.invoice_packing_lists">
                      <v-file-input v-model="form.invoice_packing_lists[i]" :error-messages="errors.invoice_packing_lists[i]"
                                    outlined accept="image/*,.pdf" label="* (필수) 인보이스/패킹리스트(CI/PL)"
                                    :append-outer-icon="i === 0 ? `mdi-plus`: `mdi-minus`" @click:append-outer="addFileInput('invoice_packing_lists', i)"/>
                    </template>

                    <div>
                      <div class="subtitle-1 font-weight-black"> * (선택) 기타 첨부서류</div>
                      <div class="subtitle-2"> 과거 인보이스,패킹리스트,수출면장 등 참고정보로 첨부해주세요.</div>
                    </div>
                    <template v-for="(item, i) in form.attach_documents">
                      <v-file-input v-model="form.attach_documents[i]" :error-messages="errors.attach_documents[i]"
                                    outlined accept="image/*,.pdf" label="* (선택) 기타 첨부서류"
                                    :append-outer-icon="i === 0 ? `mdi-plus`: `mdi-minus`" @click:append-outer="addFileInput('attach_documents', i)" />
                    </template>

                    <div>
                      <div class="subtitle-1 font-weight-black"> * (선택) 상품사진</div>
                      <div class="subtitle-2"> 중국등 일부국가에서는 상품사진이 필수항목이 될 수 있습니다.</div>
                    </div>
                    <template v-for="(item, i) in form.photos">
                      <v-file-input v-model="form.photos[i]" :error-messages="errors.photos[i]"
                                    outlined accept="image/*,.pdf" label="* (선택) 상품사진"
                                    :append-outer-icon="i === 0 ? `mdi-plus`: `mdi-minus`" @click:append-outer="addFileInput('photos', i)" />
                    </template>

                    <div>
                      <div class="subtitle-1 font-weight-black"> * (선택) HS코드</div>
                      <div class="subtitle-2"> 주요 수출상품의 HS코드를 알고 계시다면 참고정보로 입력해주세요.</div>
                    </div>
                    <v-text-field v-model="form.hs_code" :error="errors.hs_code" color="#1976d2"
                                  outlined label="HS코드" hide-details="auto" />
                  </div>
                </v-card>
                <!--v-card class="cardTale d-flex justify-space-between" elevation="0">
                  <v-card-actions><p class="cardTaleText3">PDF,JPG,PNG파일 첨부가능합니다.</p></v-card-actions>
                  <v-card-actions><p class="cardTaleText3">첨부서류 <span>3</span>건</p></v-card-actions>
                </v-card-->
              </div>
            </v-col>
          </v-row>

          <v-row class="justify-center">
            <v-col cols="12" xl="9">
              <div class="vCardBg top-padding-0 left-padding-0 right-padding-0 bottom-padding-0">
                <v-card flat class="text-center cardTitleBox d-flex">
                  <v-icon class="iconMa2">mdi-clipboard-text</v-icon> 픽업 정보 <p class="tispan bottom-margin-0">픽업 마감일 정보를 필히 확인해주세요.</p>
                </v-card>
                <v-card tile elevation="0" class="ssaw">
                  <div class="ssaw2">
                     <table class="bottom-margin-0 tableSet3">
                      <tr>
                        <th>창고주소</th>
                        <td>{{`${data.address} ${data.address_detail}`}}</td>
                      </tr>
                    </table>
                    <v-card-text class="bottom-padding-0">
                      <v-card-actions class="left-padding-0 right-padding-0">
                        <v-radio-group v-model="form.is_pickup" row>
                          <v-radio value="N" label="픽업옵션 제외"></v-radio>
                          <v-radio value="Y" label="픽업옵션 추가"></v-radio>
                        </v-radio-group>
                      </v-card-actions>
                    </v-card-text>
                    <v-card elevation="0" class="d-flex bottom-margin-40">
                      <template v-if="form.is_pickup === 'Y'">
                        <v-menu v-model="menu_address" :close-on-content-click="false" :nudge-top="90" offset-y max-width="auto" transition="scale-transition">
                          <template v-slot:activator="{ on }">
                            <v-text-field v-model="form.address" :error="errors.address" color="#1976d2" hide-details="auto" v-on="on" label="주소" outlined readonly append-icon="mdi-magnify"  @click:append="menu_address = true" />
                          </template>
                          <vue-daum-postcode @complete="setAddress" style="height: 400px; overflow: scroll;" />
                        </v-menu>
                        <!--prepend-inner-icon="mdi-map-marker-outline" append-outer-icon="mdi-calculator" @click:append-outer="calculator"-->
                        <v-text-field v-model="form.address_detail" :error="errors.address_detail" color="#1976d2"
                                      outlined label="상세주소" hide-details="auto" class="setting-margin-lr"/>
                        <v-btn large color="#3d9cd2" dark height="56" elevation="0" @click="calculator">
                          <v-icon>mdi-calculator</v-icon>&nbsp;예상비용 산출
                        </v-btn>
                      </template>
                    </v-card>
                  </div>
                </v-card>
                <v-card class="cardTale d-flex justify-end" elevation="0">
                  <v-card v-if="form.pickup_distance > 0" elevation="0" class="d-flex bknone">
                    <v-card-actions><p class="cardTaleText2">창고와의 거리&nbsp;<span>{{pickupDistanceKm}}</span> Km</p></v-card-actions>
                    <v-card-actions><p class="cardTaleText5">예상 픽업비용&nbsp;<span>{{Number(form.expected_pickup_price).toLocaleString()}}</span> KRW</p></v-card-actions>
                  </v-card>
                  <v-card-actions><p class="cardTaleText4">픽업마감일 <span>{{ $dayjsFormat(data.warehouse_deadline_date + " " + data.warehouse_deadline_time) }}</span></p></v-card-actions>
                </v-card>
              </div>
            </v-col>
          </v-row>

          <v-row class="justify-center">
            <v-col cols="12" xl="9">
              <div class="vCardBg top-padding-0 left-padding-0 right-padding-0 bottom-padding-0">
                <v-card flat class="text-center cardTitleBox d-flex">
                  <v-icon class="iconMa2">mdi-clipboard-text</v-icon> 수출면장 대행여부 <p class="tispan bottom-margin-0">수출면장대행수수료의 경우 1회
                  {{Number(data.default_export_permit_agency_price).toLocaleString()}}원(부가세별도) 청구됩니다.</p>
                </v-card>
                <v-card tile elevation="0" class="ssaw">
                  <div class="ssaw2">
                    <v-card-text class="bottom-padding-0">
                      <v-card-actions class="left-padding-0 right-padding-0">
                        <v-radio-group v-model="form.is_export_permit_agency" row>
                          <v-radio value="Y" label="예, 포워더에게 대행의뢰"></v-radio>
                          <v-radio value="N" label="아니오, 직접등록"></v-radio>
                        </v-radio-group>
                      </v-card-actions>
                    </v-card-text>
                  </div>
                </v-card>
              </div>
            </v-col>
          </v-row>

          <v-row class="justify-center">
            <v-col cols="12" xl="9">
              <div class="vCardBg top-padding-0 left-padding-0 right-padding-0 bottom-padding-0">
                <v-card flat class="text-center cardTitleBox d-flex">
                  <v-icon class="iconMa2">mdi-clipboard-text</v-icon> 적하보험 가입여부<p class="tispan bottom-margin-0">해상운송 중 사고 발생을 대비하여 가입하는 보험입니다. 물품가격을 기준으로 책정됩니다.</p>
                </v-card>
                <v-card tile elevation="0" class="ssaw">
                  <div class="ssaw2">
                    <v-card-text class="bottom-padding-0">
                      <v-card-actions class="left-padding-0 right-padding-0">
                        <v-radio-group v-model="form.is_cargo_insurance_agency" row>
                          <v-radio value="Y" label="예, 포워더에게 대행의뢰"></v-radio>
                          <v-radio value="N" label="아니오, 직접등록"></v-radio>
                        </v-radio-group>
                      </v-card-actions>
                    </v-card-text>
                  </div>
                </v-card>
              </div>
            </v-col>
          </v-row>

          <v-row class="justify-center">
            <v-col cols="12" xl="9">
              <div class="vCardBg top-padding-0 left-padding-0 right-padding-0 bottom-padding-0">
                <v-card flat class="text-center cardTitleBox d-flex">
                  <v-icon class="iconMa2">mdi-clipboard-text</v-icon> 요청사항<p class="tispan bottom-margin-0"></p>
                </v-card>
                <v-card tile elevation="0" class="ssaw">
                  <div class="ssaw2">
                    <v-card-text class="bottom-padding-0">
                      <v-textarea v-model="form.memo" outlined label="(선택) 포워더에게 전달 할 요청사항을 자유롭게 입력해주세요."></v-textarea>
                    </v-card-text>
                  </div>
                </v-card>
              </div>
            </v-col>
          </v-row>

          <v-row class="justify-center">
            <v-col cols="12" xl="9">
              <div class="vCardBg top-padding-0 left-padding-0 right-padding-0 bottom-padding-0">
                <v-card flat class="text-center cardTitleBox d-flex">
                  <v-icon class="iconMa2">mdi-bank</v-icon> 총 예상비용 <p class="tispan bottom-margin-0">최종견적은 옵션결정 및 환율에 따라 변경 될 수 있습니다. 해상운임료는 부대비용 포함 된 금액입니다. (USD환율 1250원 기준) </p>
                </v-card>
                <v-card tile elevation="0" class="ssaw">
                  <div class="ssaw2">
                      <v-card-actions class="justify-center top-padding-0">
                        <v-btn large color="#3d9cd2" dark height="64" elevation="0" @click="save" width="200">스케줄 접수</v-btn>
                      </v-card-actions>
                  </div>
                </v-card>
                <!--v-card class="cardTale d-flex justify-end" elevation="0">
                  <v-card-actions><p class="cardTaleText6">운송비용 <span>{{ Number(data.price).toLocaleString() }}</span>KRW</p></v-card-actions>
                  <v-card-actions><p class="cardTaleText3">픽업비용 <span>{{ Number(form.expected_pickup_price).toLocaleString() }}</span>KRW</p></v-card-actions>
                  <v-card-actions><p class="cardTaleText4">합계 <span>{{ totalPrice }}</span>KRW</p></v-card-actions>
                </v-card-->

                <v-list>
                  <v-list-item>
                    <v-list-item-content> <v-list-item-title>해상운송료</v-list-item-title> </v-list-item-content>
                    <v-list-item-action>
                      <v-list-item-action-text>{{ Number(data.price).toLocaleString() }} KRW</v-list-item-action-text>
                    </v-list-item-action>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content> <v-list-item-title>픽업운송료</v-list-item-title> </v-list-item-content>
                    <v-list-item-action>
                      <v-list-item-action-text>{{ Number(form.expected_pickup_price).toLocaleString() }} KRW</v-list-item-action-text>
                    </v-list-item-action>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content> <v-list-item-title>수출면장대행비용</v-list-item-title> </v-list-item-content>
                    <v-list-item-action>
                      <v-list-item-action-text>{{ Number(exportPermitAgencyPrice).toLocaleString() }} KRW</v-list-item-action-text>
                    </v-list-item-action>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content> <v-list-item-title>적하보험비용</v-list-item-title> </v-list-item-content>
                    <v-list-item-action>
                      <v-list-item-action-text>{{ cargoInsurancePrice }}</v-list-item-action-text>
                    </v-list-item-action>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content> <v-list-item-title>합계</v-list-item-title> </v-list-item-content>
                    <v-list-item-action>
                      <v-list-item-action-text>{{ totalPrice }} KRW</v-list-item-action-text>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppBar from "../../../components/AppBar";
import {VueDaumPostcode} from "vue-daum-postcode";
import {mapActions} from "vuex";
import QuestionDialog from "../../../components/QuestionDialog";

export default {
  name: "index",
  components: {QuestionDialog, AppBar, VueDaumPostcode},
  async asyncData({context, params, $axios, store}) {
    const data = await $axios.$get('/schedules/'+params.id);
    return {...data}
  },
  mounted() {
    this.form.schedule_id = parseInt(this.$route.params.id);
  },
  computed: {
    pickupDistanceKm() {
      return (this.form.pickup_distance / 1000);
    },
    totalPrice() {
      return Number(this.data.price + this.form.expected_pickup_price + this.exportPermitAgencyPrice).toLocaleString();
    },
    exportPermitAgencyPrice() {
      return this.form.is_export_permit_agency === 'Y' ? this.data.default_export_permit_agency_price : 0;
    },
    cargoInsurancePrice() {
      return this.form.is_cargo_insurance_agency === 'Y' ? '별도청구' : '0 KRW';
    }
  },
  watch: {
    'form.is_pickup': {
      deep: true,
      handler() {
        this.form.pickup_distance = 0;
        this.form.expected_pickup_price = 0;
      }
    }
  },
  data: () => ({
    form: {
      schedule_id: 0,
      is_pickup: 'N', address: '', address_detail: '',
      pickup_distance: 0, expected_pickup_price: 0,

      invoice_packing_lists: [null],
      attach_documents: [null],
      photos: [null],

      is_document_agency: 'N',
      export_permit_file: null,
      invoice_file: null,
      packing_list_file: null
    },
    errors: {
      invoice_packing_lists: [null],
      attach_documents: [null],
      photos: [null],
    },
    menu_address: false,
    isAgencyDocument: false,
  }),
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    async calculator()
    {
      let url  = '/schedules/pickup-price?'
      //url += '&origins=대전광역시 유성구 봉명동 봉명로 93&destinations=대전광역시 서구 계룡로562번길 3';
      url += `&origins=${this.data.address} ${this.data.address_detail}`;
      url += `&destinations=${this.form.address} ${this.form.address_detail}`;
      const response = await this.$axios.get(url);
      if (response.data.result) {
        this.form.pickup_distance = response.data.data.distance;
        this.form.expected_pickup_price = response.data.data.price;
      } else {
        this.showSnackbar({show: true, color: 'error', message: response.data.message});
      }
    },
    setAddress(e) {
      //console.log(e); zonecode: "34190"
      this.form.address = e.address;
      this.menu_address = false;
    },
    addFileInput(type, i) {
      if (i === 0) {
        this.form[type].push(null);
        this.errors[type].push(null);
      } else {
        this.form[type].splice(i, 1);
        this.errors[type].splice(i, 1);
      }
    },
    async save() {
      try {
        this.errors = {invoice_packing_lists: [], attach_documents: [], photos: []};
        let formData = new FormData();
        for (const key in this.form) {
          if (key === 'invoice_packing_lists' || key === 'attach_documents' || key === 'photos') {
            for (const f of this.form[key]) {
              formData.append(`${key}[]`, f ?? '');
            }
          } else {
            formData.append(key, this.form[key]);
          }
        }
        const response = await this.$axios.post('/contracts', formData, {headers: {'Content-Type': 'multipart/form-data'}});
        //console.log(response.data.result);
        if (response.data.result) {
          this.$router.push(`/contracts/${response.data.data.id}`);
        } else {
          this.showSnackbar({show: true, color: 'error', message: response.data.message});
        }
      } catch (e) {
        //console.log(e)
        this.showSnackbar({show: true, color: 'error', message: 'Error: ' + e.response.status + '(' + e.response.statusText + ')'});
        if (e.response.status === 422) {
          for (let [key, value] of Object.entries(e.response.data.errors)) {
            const keys = key.split('.');
            //console.log(keys, value[0]);
            if (keys[1]) {
              this.$set(this.errors[keys[0]], keys[1], value[0]);
            } else {
              this.$set(this.errors, keys[0], value[0]);
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  .mypageMP {margin: 50px 0 10px;}
  #tableSet {width: 100%; text-align: center; margin: 40px 0;}
  #tableSet td {color: #111;}
  .iconStyle {background: #f1f1f1; border-radius: 50%; padding: 14px; margin-bottom: 10px;}
  .thSize {width: 20%;}
  #tableSet2  {width: 100%; text-align: left; border-radius: 10px;  border-collapse: collapse; margin: 50px 0 40px;}
  #tableSet2 th {color: #555; font-size: 14px; background: #f0f0f0;; text-align: center; padding: 14px 0; border-top: 1px solid #ccc;; border-bottom: 1px solid #ccc; border-right: 1px solid #ccc;}
  #tableSet2 td {font-size: 13px; color:#555; padding: 18px; border-bottom: 1px solid #e0e0e0; border-right: 1px solid #ccc; border-bottom: 1px solid #ccc;}
  #tableSet2 td:first-child {width: 154px;}
  #tableSet2 td:last-child {font-weight: 800;}

  .tableSet3  {width: 100%; text-align: left; border-radius: 10px;  border-collapse: collapse; margin: 50px 0 40px;}
  .tableSet3 th {color: #555; font-size: 14px; background: #f0f0f0;; text-align: center; padding: 14px 0; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc;}
  .tableSet3 td {font-size: 13px; color:#555; padding: 18px; border: 1px solid #e0e0e0;}
  .tableSet3 td:last-child {border-right: none;}

  .minWidth {width:18%;}
  .lastRight {border-right: none!important;}
  .colHeight {padding-top: 20px; margin-bottom: 10px;}
  .colPadding {padding-top: 2px;}
  .minHeight {min-height: 420px;}
  .btnStyle2 {width: 100%; background: #fff!important; border: 1px solid #ddd; padding: 28px 0!important;}
  .tabBoarder {border: 1px solid #ddd;}
  .cardFirstTxt {font-size: 15px; color: #ababab;}
  .cardLastTxt {font-family: Arial; font-size: 30px; line-height: 18px; color: #ababab;}
  .avtiveClassT p {color: #3d9cd2!important;}
  .avtiveClassT {border: 1px solid #3d9cd2;}
  .bknone {background: none!important;}
  .ma {margin-top: 40px;}
  .cardTitleBox {position: relative; padding: 20px 44px; background: #4a7da7; color: #fff; font-weight: 500; border-bottom: 4px solid #a7c3d9;}
  .tispan {color: #fff; font-size: 12px;position: absolute; right: 48px; top: 25px;}
  .secColor {color: #dd7070;}
  .vBtfoot {margin-bottom: 14px;}
  .ssaw {margin: 24px;}
  .ssaw2 {padding: 0 18px;}
  .cardTale {margin-top: 10px; padding: 18px 30px; background: #e7f1f9; border-top: 2px solid #c4def3;}
  .cardTaleText {color: #000; font-size: 16px; margin-bottom: 0!important; margin-right: 28px;}
  .cardTaleText span {margin: 0 5px 0 10px; border-bottom: 1px solid #f44336; color: #f44336; font-size: 22px; font-weight: bold;}
  .cardTaleText4 {color: #000; font-size: 16px; margin-bottom: 0!important; margin-left: 28px;}
  .cardTaleText4 span {margin: 0 5px 0 10px; border-bottom: 1px solid #f44336; color: #f44336; font-size: 22px; font-weight: bold;}
  .cardTaleText5 {color: #000; font-size: 16px; margin-bottom: 0!important;}
  .cardTaleText5 span {margin: 0 5px 0 10px; border-bottom: 1px solid #0459e3; color: #0459e3; font-size: 30px; font-weight: bold;}
  .cardTaleText3 {color: #000; font-size: 16px; margin-bottom: 0!important; }
  .cardTaleText3 span {margin: 0 5px 0 10px; border-bottom: 1px solid #0459e3; color: #0459e3; font-size: 22px; font-weight: bold;}
  .cardTaleText6 {color: #000; font-size: 16px; margin-bottom: 0!important; }
  .cardTaleText6 span {margin: 0 5px 0 10px; border-bottom: 1px solid #0459e3; color: #000; font-size: 22px; font-weight: bold;}
  .cardTaleText2 {color: #000;font-size: 16px; margin-bottom: 0!important;}
  .cardTaleText2 span {color: #000; font-weight: bold; font-size: 30px; border-bottom: 1px solid #000;}
  @media (max-width: 960px){
    #tableSet {margin-bottom: 0;}
    .dFlex {display: unset!important;}
    .setLeft {width: 100%;}
    .thSize{width: auto!important;}
  }
  @media (max-width: 590px) {
    #tableSet { display: grid; }
    .ssaw { margin: 0; }
    #tableSet2 { margin: 20px 0 20px; }
    #tableSet2 td { width: auto !important; }
  }
</style>
