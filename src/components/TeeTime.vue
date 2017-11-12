<template>
  <preview :current="teeTime" />
</template>

<script>
import { mapState } from 'vuex'
import Preview from '../components/TeeTimes/Preview'
import List from '../components/TeeTimes/List'

export default {
  name: 'TeeTime',
  props: ['current'],
  components: {
    Preview,
    List
  },

  computed: {
    ...mapState(['teeTime', 'currentRound', 'currentTournament', 'currentCourse'])
  },

  watch: {
    current: function () {
      console.log('curr rounf', this.current)
      this.$store.dispatch('LOAD_USER_TEE_TIME', { tourn_id: this.currentTournament.id, roundNumber: this.current.round_number })
    }
  },

  created: function (current) {
    this.$store.dispatch('LOAD_USER_TEE_TIME', { tourn_id: this.currentTournament.id, roundNumber: this.current.round_number })
  }
}
</script>
<style>
  p.hide {
    display: none;
  }
</style>
