<template>
  <preview :current="teeTime" />
</template>

<script>
import { mapState } from 'vuex'
import Preview from './TeeTimes/Preview'
import List from './TeeTimes/List'

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

    }
  },

  created: function (current) {
  }
}
</script>
<style>
  p.hide {
    display: none;
  }
</style>
