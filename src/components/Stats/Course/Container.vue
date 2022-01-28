<template>
  <v-card
    flat
		class="rounded-card pt-4 pb-4 mb-5"
    style="background-color:#FFF;"
	>
    <div class="pl-4 pr-4 mb-5">
      <h1 style="font-weight:500">
      	Bandon
      	<p style="font-size:20px;color:#444;">{{ this.currentTournament.year }} Summary</p>
      </h1>
    </div>
    <div class="pl-4 pr-4 mr-3 ml-3 border-card">
			<v-card flat class="mb-3 mt-2">
				<v-layout row wrap align-center>
					<v-flex xs12 class="text-xs-left">
						<h2 class="mb-2 pt-2 font-weight-regular">Scoring Averages</h2>
					</v-flex>
					<v-layout row wrap align-center>
						<v-flex xs3 class="text-xs-center">
							<h1 class="font-weight-regular" style="color:#555;font-size:50px;">
								{{ scoringAvg }}
							</h1>
						</v-flex>
						<v-flex xs9>
							<v-layout row wrap>
								<v-flex xs4 class="font-weight-regular text-xs-center">
									<h1 class="font-weight-regular" style="color:#A8C256;">
										{{ round1Avg }}
									</h1>
									<h4 class="font-weight-regular">
										Round 1
									</h4>
								</v-flex>
								<v-flex xs4 class="font-weight-regular text-xs-center">
									<h1 class="font-weight-regular" style="color:#F79256;">
										{{ round2Avg }}
									</h1>
									<h4 class="font-weight-regular">
										Round 2
									</h4>
								</v-flex>
								<v-flex xs4 class="font-weight-regular text-xs-center">
									<h1 class="font-weight-regular" style="color:#9FB8CE;">
										{{ round3Avg }}
									</h1>
									<h4 class="font-weight-regular">
										Round 3
									</h4>
								</v-flex>
							</v-layout>
						</v-flex>
					</v-layout>
				</v-layout>
			</v-card>
    </div>
  </v-card>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Container',
  components: {
  },
  data () {
    return {
			scoringAvg: 0,
			round1Avg: 0,
			round2Avg: 0,
			round3Avg: 0,
		}
  },

  computed: {
    ...mapState({
     currentTournament: state => state.tournament.currentTournament,
		 tournamentSummary: state => state.overallSummary.tournamentSummary
    }),
  },
  mounted () {
		this.scoringAvg = this.tournamentSummary.attributes.scoring_avg
		this.round1Avg = this.tournamentSummary.attributes.round1_scoring_avg
		this.round2Avg = this.tournamentSummary.attributes.round2_scoring_avg
		this.round3Avg = this.tournamentSummary.attributes.round3_scoring_avg
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
.stroke-text-color {
  color: #9FB8CE;
}
.rounded-card {
  margin-top: -25px;
	border-radius: 20px;
  transition: all 0ms cubic-bezier(0.645, 0.045, 0.355, 1);
}
.border-card {
	border-radius: 20px;
  border: 2px solid #999;
  transition: all 0ms cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>