<template>
  <v-card>
		<v-card-text>
			<v-layout row wrap>
				<v-flex xs6>
					<h3>Players</h3>
				</v-flex>
				<v-flex xs6>
					<v-layout>
						<v-flex xs2>
							<h5>Lowest</h5>
						</v-flex>
					` <v-flex xs2>
							<h5>Second</h5>
						</v-flex>
						<v-flex xs2>
							<h5>Potential</h5>
						</v-flex>
						<v-flex xs3>
							<h5>Impact</h5>
						</v-flex>
						<v-flex xs3>
							<h5>Score</h5>
						</v-flex>
					</v-layout>
				</v-flex>
			</v-layout>
		</v-card-text>
		<v-card v-for="item in teamPlayers" :key="item.id">
			<player-agg :player="item.attributes" />
		</v-card>
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