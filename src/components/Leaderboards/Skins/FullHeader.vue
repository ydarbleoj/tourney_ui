<template>
  <v-card-title class="skins-full" @click="updateView">
    <v-layout wrap row class="pb-3">
      <v-flex xs9 pa-2 class="text-xs-left">
        <h5>SKINS LEADERBOARD</h5>
      </v-flex>
      <v-flex xs3 class="text-xs-center pt-2">
        <small class="">purse $ {{ current.num_players * 30 }}</small>
      </v-flex>
    </v-layout>
    <v-container class="pa-0" fluid>
      <v-layout row wrap caption pb-2>
        <v-flex xs1>
          <label>Pos</label>
        </v-flex>
        <v-flex xs5 class="text-xs-left">
          <label class="pl-1">Player</label>
        </v-flex>
        <v-flex xs1>
          <label>Money</label>
        </v-flex>
        <v-flex xs1 class="text-xs-center">
          <label>R1</label>
        </v-flex>
        <v-flex xs1 class="text-xs-center">
          <label>R2</label>
        </v-flex>
        <v-flex xs1 class="text-xs-center">
          <label>R3</label>
        </v-flex>
        <v-flex xs2>
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
      this.$emit('event', 'skins-leaderboard')
    }
  }
}
</script>
<style>
.skins-full {
  width: 100%;
  background-color: #6534ff;
  padding: 0;
  color: #f1f1f1;
  font-size: 16px;
  position: fixed;
}
</style>