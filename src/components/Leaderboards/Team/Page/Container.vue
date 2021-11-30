<template>
  <v-card
    flat
		class="rounded-card pt-4 pb-4"
    style="background-color:#FFF;">
    <div class="pl-4 pr-4">
      <h1
        style="font-weight:500">
      {{ courseName }}
      </h1>
      <p style="font-size:18px;color:#444;">Round {{ roundNumber }}</p>
    </div>
    <div class="pl-4 pr-4">
      <info />
    </div>

    <players />
  </v-card>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import Info from './Info'
import Players from './Players'
import Stats from './Stats'

export default {
  name: 'Container',
  components: {
    Info,
    Players,
    Stats
  },
  data () {
    return {
      isLoading: true,
      imageId: 2,
      courseName: "Bandon",
			roundNumber: 1
    }
  },
  computed: {
    ...mapState({
     currentTournament: state => state.tournament.currentTournament
    }),
    ...mapGetters({
      teamCourseName: 'leaderboards/team/getTeamPageCourseName',
			teamRoundNumber: 'leaderboards/team/getTeamPageRoundNumber'
    })
  },
  mounted: function () {
		this.courseName = this.teamCourseName
		this.roundNumber = this.teamRoundNumber
  }
}
</script>
<style>
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
</style>