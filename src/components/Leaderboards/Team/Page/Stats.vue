<template>
  <v-card flat style="background-color:transparent;">
    <v-card-text>
			<v-layout row wrap>
				<v-flex xs4>
					<p>Albatrosses</p>
					<h3>{{ teamStats.albatrosses }}</h3>
				</v-flex>
				<v-flex xs4>
					<p>Eagles</p>
					<h3>{{ teamStats.eagles }}</h3>
				</v-flex>
				<v-flex xs4>
					<p>Birdies</p>
					<h3>{{ teamStats.birdies }}</h3>
				</v-flex>
			</v-layout>
			<v-layout row wrap>
				<v-flex xs3>
					<p>Pars</p>
					<h3>{{ teamStats.pars }}</h3>
				</v-flex>
				<v-flex xs3>
					<p>Bogeys</p>
					<h3>{{ teamStats.bogeys }}</h3>
				</v-flex>
				<v-flex xs3>
					<p>Double Bogeys</p>
					<h3>{{ teamStats.double_bogeys }}</h3>
				</v-flex>
				<v-flex xs3>
					<p>Other</p>
					<h3>{{ teamStats.other }}</h3>
        </v-flex>
			</v-layout>
		</v-card-text>
  </v-card>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Stats',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
     currentTournament: state => state.tournament.currentTournament
    }),
    ...mapGetters({
      teamStats: 'leaderboards/team/getTeamStats'
    })
  },
  mounted: function () {}
}
</script>
