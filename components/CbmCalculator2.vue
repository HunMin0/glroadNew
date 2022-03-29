<template>
  <v-menu v-model="menu" offset-y :close-on-content-click="false" :close-on-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-btn x-large elevation="0" v-bind="attrs" v-on="on"> CBM 계산기 </v-btn>
    </template>
    <v-card max-width="400">
      <v-app-bar flat>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon @click="menu = false">mdi-close</v-icon>
        </v-btn>
      </v-app-bar>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="4">
            <v-currency-field v-model="cbm.width" outlined label="가로" suffix="cm" required
                              :auto-decimal-mode="false" :decimal-length="0" :default-value="0"
                              :min="0" :value-as-integer="false" :allow-negative="false"></v-currency-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-currency-field v-model="cbm.depth" outlined label="세로" suffix="cm" required
                              :auto-decimal-mode="false" :decimal-length="0" :default-value="0"
                              :min="0" :value-as-integer="false" :allow-negative="false"></v-currency-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-currency-field v-model="cbm.height" outlined label="높이" suffix="cm" required
                              :auto-decimal-mode="false" :decimal-length="0" :default-value="0"
                              :min="0" :value-as-integer="false" :allow-negative="false"></v-currency-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "CbmCalculator2",
  watch: {
    cbm: {
      deep: true,
      handler(value) {
        const cbm = Math.round((value.width * value.depth * value.height) / 1000000 * 1000) / 1000;
        //console.log('cbm', value.width, value.depth, value.height, cbm);
        this.$emit('update', cbm)
      }
    }
  },
  data: () => ({
    cbm: {width: 0, depth: 0, height: 0},
    menu: false
  })
}
</script>

<style scoped>
</style>
