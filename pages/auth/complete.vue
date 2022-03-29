<template>
  <v-col cols="12" sm="8" md="5">
    <app-bar title="회원가입"></app-bar>
    <v-card flat>
      <v-card-title>회원가입신청이 완료되었습니다.</v-card-title>
      <v-card-text>
        회원가입 승인은 주중업무시간 1시간내에 처리가 되며, 확인과정에서 관리자가 직접 연락을 드릴 수 있습니다.
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import AppBar from "../../components/AppBar";

export default {
  name: "complete",
  auth: 'guest',
  layout: 'blank',
  components: {AppBar},
}
</script>

<style scoped>

</style>
