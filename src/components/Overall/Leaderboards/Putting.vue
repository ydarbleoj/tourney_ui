<template>
  <putting-page
    v-if="!isLoading"
    :leaderboard="getPuttingLeaderboard"
    :purse="objectPurse"
    :link="'PuttingOverallPlayer'"
    :title="'Putting'"
  />
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import PuttingPage from './Page'

export default {
	name: 'PuttingOverallLeaderboard',
  components: {
    PuttingPage
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
      getPuttingLeaderboard: 'leaderboards/overall/getPuttingLeaderboard',
      getPuttingPurse: 'leaderboards/overall/getPuttingPurse'
     })
  },
  methods: {
  },

  mounted: function () {
    this.$store.dispatch(
      'leaderboards/overall/LOAD_PUTTING_LEADERBOARD'
    ).then(response => {
      this.objectPurse = this.getPuttingPurse
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
