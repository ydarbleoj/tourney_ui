<template>
  <money-list
    v-if="!isLoading"
    :leaderboard="getMoneyList"
    :money="objectPurse"
    :link="'MoneyListOverallPlayer'"
    :title="'Money List'"
  />
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import MoneyList from './Page'

export default {
	name: 'OverallMoneyList',
  components: {
    MoneyList
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
      getMoneyList: 'leaderboards/overall/getMoneyList',
      getOverallPurse: 'leaderboards/overall/getOverallPurse'
     })
  },
  methods: {
  },

  mounted () {
    this.$store.dispatch(
      'leaderboards/overall/LOAD_MONEY'
    ).then(response => {
      console.log('sdhf', this.getOverallPurse)
      this.objectPurse = this.getOverallPurse
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
