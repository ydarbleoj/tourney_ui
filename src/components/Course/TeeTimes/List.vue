<template>
  <v-card flat tile>
    <v-list>
      <v-list-tile v-for="(item, index) in tees" v-bind:key="item.user" @click="removeElement(item.user, index)">
        <v-list-tile-content>
          <v-list-tile-title v-text="item.user">{{item}}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>

        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'List',
  props: ['tees'],
  components: {
  },


  // watch: {
  //   current: function () {
  //     console.log('curr rounf', this.currentRound.round_number)
  //     this.$store.dispatch('LOAD_USER_TEE_TIME', { tourn_id: this.currentTournament.id, roundNumber: this.current.round_number })
  //   }
  // },

  created: function (current) {
    // this.$store.dispatch('LOAD_USER_TEE_TIME', { tourn_id: this.currentTournament.id, roundNumber: this.current.round_number })
  }
}
</script>
<style>
  p.hide {
    display: none;
  }
</style>
