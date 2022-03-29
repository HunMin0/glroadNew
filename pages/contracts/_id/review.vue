<template>
  <v-col cols="12" sm="6">
    <review-form :contract="contract"></review-form>
  </v-col>
</template>

<script>
import ReviewForm from "../../../components/ReviewForm";

export default {
  name: "review",
  components: {},
  async asyncData({params, $axios}) {
    const response = await $axios.get('/contracts/'+params.id);
    //console.log('data', response.data.data)
    const contract = response.data.data;
    return {contract}
  }
}
</script>

<style scoped>

</style>
