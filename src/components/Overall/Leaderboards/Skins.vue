<template>
  <skins-page
    v-if="!isLoading"
    :leaderboard="getSkinsLeaderboard"
    :money="objectPurse"
    :link="'SkinsOverallPlayer'"
    :title="'Skins'"
  />
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import SkinsPage from './Page'

export default {
	name: 'SkinsOverallLeaderboard',
  components: {
    SkinsPage
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
      getSkinsLeaderboard: 'leaderboards/overall/getSkinsLeaderboard',
      getSkinsPurse: 'leaderboards/overall/getSkinsPurse'
     })
  },
  methods: {
  },

  mounted () {
    this.$store.dispatch(
      'leaderboards/overall/LOAD_SKINS'
    ).then(response => {
      console.log('sdhf', this.getSkinsPurse)
      this.objectPurse = this.getSkinsPurse
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
