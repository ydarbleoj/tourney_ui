<template >
  <v-card flat>
    <v-layout row>
      <v-flex xs2 class="outer">
        <div class="inner rotate">
		      <h2 style="color:#FFCB47;">Impressions</h2>
        </div>
      </v-flex>
      <v-flex xs10>
        <v-card
          flat
          style="background-color:transparent;"
          v-for="item in teamPlayers" :key="item.id">
          <player-agg :player="item.attributes" />
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import PlayerAgg from './Player'

export default {
  name: 'Players',
	components: {
		PlayerAgg
	},
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
     currentTournament: state => state.tournament.currentTournament
    }),
    ...mapGetters({
      teamPlayers: 'leaderboards/team/getTeamPlayers'
    })
  },
  mounted: function () {}
}
</script>
<style scoped>
.team-text-color {
	color: #ACA885;
}
.team-background-color {
  background-color: #ACA885;
}
.inner {
  position: absolute;
  top: 50%;
  left: 50%;
}
.outer {
  position: relative;
  display: inline-block;
  margin: 0 15px;
}
.rotate {
  transform: translateX(-50%) translateY(-50%) rotate(-90deg);
}
</style>
