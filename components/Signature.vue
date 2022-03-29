<template>
  <v-card flat width="200">
    <v-toolbar flat class="my-0 py-0">
                                   <v-toolbar-title>서명</v-toolbar-title>
                                   <v-spacer></v-spacer>
                                   <v-btn icon @click="clear">
                                   <v-icon>mdi-cached</v-icon>
                                   </v-btn>
                                   </v-toolbar>
    <v-card-text class="ma-0 pa-0">
      <canvas :id="'signature'+_uid" class="signature" width="200"></canvas>
    </v-card-text>
  </v-card>
</template>

<script>
import SignaturePad from 'signature_pad';

export default {
  name: "Signature.vue",
  props: {
    value: String,
  },
  data() {
    return {
      pad: null,
    };
  },
  mounted() {
    let canvas = document.querySelector("#" + 'signature' + this._uid);
    this.pad = new SignaturePad(canvas, {
      onEnd: () => {
        this.$emit('input', this.pad.toDataURL());
      }
    });
    /* var data = "data:image/png;base64,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"
    this.pad.fromDataURL(data); */
  },
  methods: {
    clear() {
      this.pad.clear();
      this.$emit('input', this.pad.toDataURL());
    },
  },
}
</script>

<style scoped>
.signature {
  border: 1px solid #cbc9c6;
  width: 100%;
  border-radius: 5px;
}
</style>
