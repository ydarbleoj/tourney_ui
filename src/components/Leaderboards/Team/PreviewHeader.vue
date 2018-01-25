<template>
  <v-card-title class="team-preview" @click="updateView">
    <v-layout wrap row>
      <v-flex xs9 pa-2 class="text-xs-left">
        <h4>Team</h4>
      </v-flex>
      <v-flex xs3 class="text-xs-center pt-3">
        <small>purse $ {{ current.num_players * 30 }}</small>
      </v-flex>
    </v-layout>
    <v-container class="pa-0" fluid>
      <v-layout row wrap caption pb-2>
        <v-flex xs1>
          <label>Pos</label>
        </v-flex>
        <v-flex xs1>
          <label class="text-xs-left">Group</label>
        </v-flex>
        <v-flex xs8 class="text-xs-center">
          <label>Players</label>
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
  name: 'PreviewHeader',
  props: ['current'],

  methods: {
    updateView() {
      console.log('hi', )
      this.$emit('event', 'team-preview')
    }
  }
}
</script>
<style>
.team-preview {
  background-color: #ef5350;
  padding: 0;
  color: #f1f1f1;
  font-size: 16px;
}
</style>