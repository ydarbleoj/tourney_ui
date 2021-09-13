<template>
  <v-card flat class="border-card mb-3">
		<v-card-text>
			<v-layout row>
				<v-flex xs4 class="text-xs-center">
          <v-icon style="color:#A8C256;font-size:35px;">
            mdi-skull-crossbones
          </v-icon>
				</v-flex>
				<v-flex xs4 class="text-xs-center">
          <v-icon style="color:#F79256;font-size:35px;">
            mdi-flag-outline
          </v-icon>
				</v-flex>
        <v-flex xs4 class="text-xs-center">
          <v-icon style="color:#9FB8CE;font-size:35px;">
            mdi-podium
          </v-icon>
        </v-flex>
			</v-layout>
      <v-layout row align-center style="color:#555;">
				<v-flex xs4 class="text-xs-center">
					<h2 class="info-style">{{ teamInfo.group }}</h2>
				</v-flex>
				<v-flex xs4 class="text-xs-center">
					<h1 class="info-style">
						{{ teamInfo.total }}
					</h1>
				</v-flex>
        <v-flex xs4 class="text-xs-center">
					<h2 class="info-style">{{ teamInfo.position }}</h2>
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
	methods: {},
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
.border-card {
	border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0ms cubic-bezier(0.645, 0.045, 0.355, 1);
}
.icon-border {
  height: 26px;
  width: 26px;
  border-radius: 5px;
  background-color: #999;
  opacity: 0.2;
  border: 1px;
}
.info-style {
  font-weight:500;
}
/* #9FB8CE */
</style>
