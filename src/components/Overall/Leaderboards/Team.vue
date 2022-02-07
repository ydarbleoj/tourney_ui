<template>
  <team-page
    v-if="!isLoading"
    :leaderboard="getTeamLeaderboard"
    :money="objectPurse"
    :link="'TeamOverallPlayer'"
    :title="'Team'"
  />
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import TeamPage from './Page'

export default {
	name: 'TeamOverallLeaderboard',
  components: {
    TeamPage
  },
  data () {
    return {
      objectPurse: 0,
      isLoading: true,
      year: "Overall"
    }
  },

  computed: {
     ...mapGetters({
      getTeamLeaderboard: 'leaderboards/overall/getTeamLeaderboard',
      teamPurse: 'leaderboards/overall/getTeamPurse'
     })
  },
  methods: {
  },

  mounted: function () {
    this.$store.dispatch(
      'leaderboards/overall/LOAD_TEAMS'
    ).then(response => {
      this.objectPurse = this.teamPurse
      this.isLoading = false
    })
  }
}
</script>
<style scoped>
.lb-card {
  border-radius: 0;
  top: 0;
  left: 0;
  height: 100vh;
  overflow: scroll;
  width: 100vw;
  background-color: #9FB8CE;
  color: #f1f1f1;
}
</style>
