<template>
  <div class="question">
    <div class="PromotionTitle">
      <h1>비즈니스<span> 제휴문의</span></h1>
      <p class="subTitle">제휴 및 제안은 본 시스템을 통해 접수된 건에 한하여 정식으로 검토되며 제안 내용 및 관련자료는 제휴 검토 목적으로만 이용됩니다.</p>
    </div>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container fluid>
          <v-row align="center" justify="center">
            <v-col cols="11" xs="11" sm="10" md="8" lg="8" xl="6" class="qnaSet">

              <v-row class="ma-0"><p class="questionTitle">문의정보</p></v-row>
              <v-row class="textSetting">
                <v-col cols="12" >
                  <p>문의유형&nbsp;<span>*</span></p>
                  <v-select solo filled v-model="select" :items="title" :rules="[v => !!v || '상담분류를 선택해주세요']" label="상담분류 선택" class="inputStyle" required></v-select>
                </v-col>
              </v-row>
              <v-row class="textSetting">
                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                  <p>이름&nbsp;<span>*</span></p>
                  <v-text-field solo filled label="이름을 입력해주세요" class="inputStyle" required v-model="name" :counter="10" :rules="nameRules"></v-text-field>
                </v-col>
              </v-row>
              <v-row class="textSetting">
                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                  <p>이메일&nbsp;<span>*</span></p>
                  <v-text-field solo filled label="예) custorm_cs@gmail.com" class="inputStyle" required v-model="email" :rules="emailRules"></v-text-field>
                </v-col>
              </v-row>
              <v-row class="textSetting">
                <v-col cols="12" >
                  <p>문의내용&nbsp;<span>*</span></p>
                  <v-textarea solo required name="input-7-4" class="inputStyle" label="문의가 필요한 내용을 보내주시면, 빠르게 답변을 드리도록 하겠습니다."></v-textarea>
                  <v-file-input label="파일첨부" class="inputStyle2"></v-file-input>
                  <v-checkbox class="checkText" color="#878787" value="#878787" v-model="checkbox" :label="`[필수] 문의 관련하여 필요한 최소한의 [개인정보]이므로 동의하셔야 상담접수가 가능합니다.`"></v-checkbox>
                </v-col>
              </v-row>
              <v-row class="text-center">
                <v-col cols="12" >
                  <v-btn class="mr-4 btnStyle" large elevation="0" height="60">문의접수하기</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
  </div>
</template>

<script>
export default {
  name: 'Question',
  data: () => ({
    valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      phone: '',
      phoneRules: [
        v => !!v || 'phone is required',
        v => (v && v.length <= 13) || 'phone must be less than 13 characters',
      ],
      company: '',
      companyRules: [
        v => !!v || 'company is required',
        v => (v && v.length <= 10) || 'company must be less than 10 characters',
      ],
      job: '',
      jobRules: [
        v => !!v || 'job is required',
        v => (v && v.length <= 10) || 'job must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      items: [
        'IT',
        '에이전시',
        '비영리',
        '유통업',
        '제조업',
      ],
       title: [
        '불편 오류신고',
        '제휴 및 제안',
        '광고/협찬',
        '미팅요청',
        '기타'
      ],
      checkbox: false,
  }),
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
  },
}
</script>

<style scoped>
.PromotionTitle {padding: 50px 0 20px!important;}
.question{padding-bottom: 160px;}
.v-application p {margin: 0;}
.subTitle {margin: 16px 0 10px!important; padding: 0 30px;}
.textSetting p {font-size: 0.875rem; margin-bottom: 10px; font-weight: 600;}
.textSetting p span {color: #ff5c48}
.questionTitle{font-weight: 700; font-size: 1.5rem}
.qnaSet{box-shadow: 0 4px 44px rgb(0 18 47 / 8%)!important; padding: 58px; border-radius: 30px;}
.inputStyle {border: 1px solid #ddd;}
.inputStyle2 {margin: 14px 0 24px;}
.btnStyle {width: 200px; font-weight: 600; color: #878787;}
.btnStyle:hover{color: #fff; background: #a1a1a1;}

@media (min-width: 605px){
  .qnaSet{padding: 58px;}
  .question{padding-bottom: 160px;}
}
@media (max-width: 960px){
  .qnaSet{padding: 30px 28px;}
  .question{padding-bottom: 80px;}
}
</style>
