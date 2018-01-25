<template>
  <v-card-title class="money-full" @click="updateView">
    <v-layout wrap row class="pb-3">
      <v-flex xs9 pa-2 class="text-xs-left">
        <h5>Money List</h5>
      </v-flex>
      <v-flex xs3 class="text-xs-center pt-2">
        <small class="purse-color">purse $ {{ current.num_players * 90 }}</small>
      </v-flex>
    </v-layout>
    <v-container class="pa-0" fluid>
      <v-layout row wrap caption pb-2>
        <v-flex xs1>
          <label>Pos</label>
        </v-flex>
        <v-flex xs2 class="text-xs-left">
          <label class="pl-1">Player</label>
        </v-flex>
        <v-flex class="text-xs-right pl-2">
          <label>Stroke</label>
        </v-flex>
        <v-flex class="text-xs-right">
          <label>Putting</label>
        </v-flex>
        <v-flex class="text-xs-center">
          <label>Team</label>
        </v-flex>
        <v-flex class="text-xs-left">
          <label>Skins</label>
        </v-flex>
        <v-flex class="text-xs-center">
          <label>Total</label>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card-title>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'FullHeader',
  props: ['current'],

  methods: {
    updateView() {
      console.log('hello')
      this.$emit('event', 'money-list')
    }
  }
}
</script>
<style>
.money-full {
  width: 100%;
  z-index: 10000;
  background-color: #4CAF50;
  padding: 0;
  color: #f1f1f1;
  font-size: 16px;
  position: fixed;
}
</style>