<template>
  <div>
    <v-progress-circular v-if="loadingSpinner" :size="80" :width="10" indeterminate
                         style="color:#1867c0; position: fixed; z-index: 100000; left: 0; top: 100px; width: 100%; height: 30%; text-align:center;" />
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ProgressCircular",
  computed: {
    ...mapGetters(['loadingSpinner']),
  }
}
</script>

<style scoped>

</style>
