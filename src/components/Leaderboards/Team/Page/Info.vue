<template>
  <v-card>
		<v-card-text>
			<v-layout row wrap>
				<v-flex xs9>
					<h1>{{ teamInfo.group }}</h1>
				</v-flex>
				<v-flex>
					<h1 style="font-size:54px;">{{ teamInfo.total }}</h1>
				</v-flex>
			</v-layout>
		</v-card-text>
  </v-card>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Info',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
     currentTournament: state => state.tournament.currentTournament
    }),
    ...mapGetters({
      teamInfo: 'leaderboards/team/getTeamInfo'
    })
  },
  mounted: function () {}
}
</script>