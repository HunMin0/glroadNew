<template>
<div>
 <v-card class="boxditale" flat>
   <v-card-title class="text-h6 font-weight-bold font-color1"><v-icon color="6c6c6c">mdi-tooltip-text</v-icon>&nbsp; 스케줄정보</v-card-title>
    <v-card-text class="sett" v-if="contract">
      {{ contract.schedule.pol_fullname }} - {{ contract.schedule.pod_fullname }}<br/>
      {{ $dayjsFormat(contract.schedule.departure_date/* + ' ' + contract.schedule.departure_time*/, 'YYYY-MM-DD') }}
      - {{ $dayjsFormat(contract.schedule.arrival_date/* + ' ' + contract.schedule.arrival_time*/, 'YYYY-MM-DD') }}
      ({{ contract.schedule.expected_delivery_days_text }})<br/>
      {{ contract.schedule.container_name }} | 잔여{{ contract.schedule.cbm }}CBM

    </v-card-text>
  </v-card>
  <v-card flat>
    <v-card-title>이번 수출은 어떠셨나요?</v-card-title>
    <v-card-subtitle>
      소중한 후기를 남겨주시면 다음 사용자에게 큰 도움이 됩니다.<br/>
      후기작성 후 상세내역을 다시 확인하실 수 있습니다.
    </v-card-subtitle>
    <v-card-text>
      <v-rating v-model="form.rating" :error-messages="errors.rating" :readonly="isViewMode" color="yellow darken-3"
                dense half-increments background-color="grey darken-1" empty-icon="$ratingFull"/>
      <br />
      <v-textarea v-model="form.content" :error-messages="errors.content" :readonly="isViewMode" counter="1000"
                  :rules="[rules.length(1000)]" outlined place="내용입력"/>
    </v-card-text>
   <v-card-actions class="justify-center top-padding-0">
      <v-btn large color="grey darken-1" outlined height="48" elevation="0" @click="close">{{isViewMode ? '닫기': '다음에 쓸게요'}}</v-btn>
      <v-btn large  color="#3d9cd2" dark height="48" elevation="0" v-if="!isViewMode" @click="save">작성완료</v-btn>
    </v-card-actions>
  </v-card>
</div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "ReviewForm",
  props: ['contract'],
  /*async fetch() {
    if (!this.contract.review) return;
    const data = (await this.$axios.get('/reviews/'+this.contract.review.id)).data;
    this.form = data;
  },*/
  mounted() {
    if (!this.contract.review) return;
    this.$set(this, 'form', this.contract.review);
  },
  watch: {
    contract: {
      deep: true,
      handler() {
        //this.contract.id;
        console.log('contract', this.contract.id);
        if (!this.contract.review) return;
        this.$set(this, 'form', this.contract.review);
      }
    }
  },
  computed: {
    isViewMode() {
      return this.form.id > 0;
    }
  },
  data: () => ({
    rules: {
      length: len => v => (v || '').length <= len || `내용은 ${len}자 이하로 입력하여 주십시오.`,
    },
    errors: {},
    form: {}
  }),
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    close() {
      this.errors = {};
      this.form = {};
      this.$emit('close');
    },
    async save() {
      try {
        this.errors = {};
        const data = await this.$axios.$post('/reviews/'+this.contract.id, this.form)
        if (data.result) {
          this.showSnackbar({show: true, color: 'success', message: '리뷰가 저장되었습니다.'});
          this.$emit('saved');
        } else {
          this.showSnackbar({show: true, color: 'error', message: data.message});
        }
      } catch (e) {
        //console.log(e);
        this.showSnackbar({show: true, color: 'error', message: 'Error: ' + e.response.status + '(' + e.response.statusText + ')'});
        if (e.response.status === 422) {
          for (let [key, value] of Object.entries(e.response.data.errors)) {
            this.$set(this.errors, key, value[0]);
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  .sett {border: 1px solid #ddd;padding: 20px;border-radius: 10px;}
  .replebtn {background: #f8f8f8!important; border: 1px solid #e7e7e7;padding: 0 10px!important;}
  .boxditale {padding: 18px 10px 22px; border-radius: 10px;}
  .font-color1 {color: #757575;margin-bottom: 10px;}
</style>
