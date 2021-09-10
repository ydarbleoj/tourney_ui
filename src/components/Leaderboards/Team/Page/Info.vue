<template>
  <v-card flat class="rounded-card">
		<v-card-text>
			<v-layout row>
				<v-flex xs4 class="text-xs-center">
          <v-icon style="color:#ACA885;font-size:24px;">
            mdi-skull-crossbones
          </v-icon>
				</v-flex>
				<v-flex xs4 class="text-xs-center">
          <v-icon style="color:#A8C256;font-size:24px;">
            mdi-flag-outline
          </v-icon>
				</v-flex>
        <v-flex xs4 class="text-xs-center">
          <v-icon style="color:#9FB8CE;font-size:24px;">
            mdi-podium
          </v-icon>
        </v-flex>
			</v-layout>
      <v-layout row align-center style="color:#555;">
				<v-flex xs4 class="text-xs-center">
					<h2>{{ teamInfo.group }}</h2>
				</v-flex>
				<v-flex xs4 class="text-xs-center">
					<h1>
						{{ teamInfo.total }}
					</h1>
				</v-flex>
        <v-flex xs4 class="text-xs-center">
					<h2>{{ teamInfo.position }}</h2>
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
	methods: {
    // scorecardPage () {
    //   this.$router.push(
    //     {
    //       name: 'Scorecard',
    //       params: {
    //         id: this.currentTournament.id,
    //         scorecard_id: this.roundId
    //       }
    //     }
    //   )
    // }
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
.rounded-card {
  margin-top: -25px;
	border-radius: 20px;
  transition: all 0ms cubic-bezier(0.645, 0.045, 0.355, 1);
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
}
/* #9FB8CE */
</style>
