<template>
  <v-card
    flat
    v-if="!isLoading"
    style="background-color:#FFF;">
    <v-img
      :src="'/static/' + imageId + 'course.jpg'"
      height='60vh'
      class="course-header"
    >
      <v-container fill-height pa-0>
        <BackButton />
        <h1 class="pl-2 pt-5 white--text">{{ courseName }}</h1>
      </v-container>
    </v-img>
    <v-card-text class="pa-0" style="background:transparent;">
      <info />
      <players />
      <stats />
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import Info from './Info'
import Players from './Players'
import Stats from './Stats'
import BackButton from '../../../BackButton'

export default {
  name: 'TeamPage',
  components: {
    BackButton,
    Info,
    Players,
    Stats
  },
  data () {
    return {
      isLoading: true,
      imageId: 2,
      courseName: "Bandon"
    }
  },
  computed: {
    ...mapState({
     currentTournament: state => state.tournament.currentTournament
    }),
    ...mapGetters({
      teamImageId: 'leaderboards/team/getTeamPageImage',
      teamCourseName: 'leaderboards/team/getTeamPageCourseName'
    })
  },
  mounted: function () {
    this.$store.dispatch(
      'leaderboards/team/LOAD_TEAM_PAGE',
      {
        tournamentId: this.currentTournament.id,
        teamId: this.$route.params.team_id
      }
    ).then(response => {
      this.isLoading = false
      this.year = this.currentTournament.year
      this.imageId = this.teamImageId
      this.courseName = this.teamCourseName
    })
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
</style>