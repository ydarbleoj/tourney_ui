<template>
  <v-card tile>
    <v-card-title class="yellow lighten-3" @click="">
      <p class="">{{ current}}</p>
    </v-card-title>
    {{ current }}
     <!--  <h5>{{ current.group }}</h5>
      <v-spacer></v-spacer>
      <h5>{{ current.tee_time.split('T')[1] }}</h5> -->
       <!--  <p>{{ current.player_one }}</p>
         <p>{{ current.player_two }}</p>
         <p>{{ current.player_three }}</p>
         <p>{{ current.player_four }}</p> -->
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'List',
  props: ['current'],
  components: {
  },

  computed: {
    ...mapState(['teeTime', 'currentRound', 'currentTournament', 'currentCourse'])
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
