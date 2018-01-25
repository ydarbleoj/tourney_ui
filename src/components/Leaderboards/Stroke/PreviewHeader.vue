<template>
  <v-card-title class="stroke-preview" @click="updateView">
    <v-layout wrap row>
      <v-flex xs9 pa-2 class="text-xs-left">
        <h4>STROKE</h4>
      </v-flex>
      <v-flex xs3 class="text-xs-center pt-3">
        <small class="purse-color">purse $ {{ current.num_players * 30 }}</small>
      </v-flex>
    </v-layout>
    <v-container class="pa-0" fluid>
      <v-layout row wrap caption pb-2>
        <v-flex xs2>
          <label class="text-xs-left">Pos</label>
        </v-flex>
        <v-flex xs6 class="text-xs-left">
          <label class="">Player</label>
        </v-flex>
        <v-flex xs2>
          <label>Total</label>
        </v-flex>
        <v-flex xs2>
          <label>Score</label>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card-title>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'PreviewHeader',
  props: ['current'],

  methods: {
    updateView() {
      console.log('hi', )
      this.$emit('event', 'stroke-preview')
    }
  }
}
</script>
<style>
.stroke-preview {
  background-color: #62bcfa;
  padding: 0;
  color: #f1f1f1;
  font-size: 16px;
}
</style>