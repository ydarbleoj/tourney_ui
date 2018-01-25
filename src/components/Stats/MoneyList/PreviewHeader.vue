<template>
  <v-card-title class="money-preview" @click="updateView">
    <v-layout wrap row>
      <v-flex xs9 pa-2 class="text-xs-left">
        <h4>MONEY</h4>
      </v-flex>
      <v-flex xs3 class="text-xs-center pt-3">
        <small>purse $ {{ current.num_players * 90 }}</small>
      </v-flex>
    </v-layout>
    <v-container class="pa-0" fluid>
      <v-layout row wrap caption pb-2>
        <v-flex xs2 class="text-xs-center pr-2">
          <label >Pos</label>
        </v-flex>
        <v-flex xs8 class="text-xs-left">
          <label class="">Player</label>
        </v-flex>
        <v-flex xs2 class="text-xs-center">
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
      console.log('money header', )
      this.$emit('event', 'money-preview')
    }
  }
}
</script>
<style>
.money-preview {
  background-color: #4CAF50;
  padding: 0;
  color: #f1f1f1;
  font-size: 16px;
}
</style>