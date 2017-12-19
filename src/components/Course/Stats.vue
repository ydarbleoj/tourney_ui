<template>
  <div>
    <p class="hide">{{ current}}</p>
    <h5>HERE</h5>
    <h5>{{ courseStats }}</h5>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Stats',
  props: ['current'],
  components: {
  },

  computed: {
    ...mapState(['currentRound', 'currentTournament', 'currentCourse', 'courseStats'])
  },

  watch: {
    current: function () {
      this.$store.dispatch('LOAD_COURSE_STATS', { tournId: this.currentTournament.id, courseId: this.currentCourse[0]['course']['id'] })
    }
  },

  mounted: function (current) {
    this.$store.dispatch('LOAD_COURSE_STATS', { tournId: this.currentTournament.id, courseId: this.currentCourse[0]['course']['id'] })
  }
}
</script>
<style>
  p.hide {
    display: none;
  }

  .name-list {
    color: #9ad3de;
  }
</style>
