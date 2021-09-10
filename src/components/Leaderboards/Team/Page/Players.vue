<template >
  <v-card flat>
		<h2 style="color:#333;font-weight:500" class="pl-2">Player Stats</h2>
    <v-layout row>
      <v-flex xs12>
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
      chartData: null
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
  methods: {
    fillData () {
      this.chartData = {
        // labels:
      }
    }
  },
  mounted: function () {
  }
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
