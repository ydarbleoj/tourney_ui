<template>
  <v-card>
    <h3>Hi</h3>
  </v-card>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Page',
  data () {
    return {
      isLoading: true
    }
  },
  computed: {
    ...mapState({
     currentTournament: state => state.tournament.currentTournament
    }),
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