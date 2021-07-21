<template>
  <v-card flat v-if="!isLoading">
    <info />
    <players />
    <stats />
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
import Info from './Info'
import Players from './Players'
import Stats from './Stats'

export default {
  name: 'TeamPage',
  components: {
    Info,
    Players,
    Stats
  },
  data () {
    return {
      isLoading: true
    }
  },
  computed: {
    ...mapState({
     currentTournament: state => state.tournament.currentTournament
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
    })
  }
}
</script>