<template>
  <v-card-title class="team-full" @click="updateView">
    <v-layout wrap row class="pb-3">
      <v-flex xs9 pa-2 class="text-xs-left">
        <h5>TEAM LEADERBOARD</h5>
      </v-flex>
      <v-flex xs3 class="text-xs-center pt-2">
        <small>purse $ {{ current.num_players * 30 }}</small>
      </v-flex>
    </v-layout>
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
      this.$emit('event', 'team-leaderboard')
    }
  }
}
</script>
<style>
.team-full {
  width: 100%;
  background-color: #ef5350;
  padding: 0;
  color: #f1f1f1;
  font-size: 16px;
  position: fixed;
  z-index: 2000;
}
</style>