<template>
  <v-card>
    <v-card-media
      :src="'/static/' + this.currentRound.course_id + 'course.jpg'"
      height='200px'
    >
    <v-card-title primary-title>
      <div>
        <div class="headline white--text">{{ this.currentCourse.name }}</div>
        <div class="subheading white--text">Round {{ this.currentRound.round_number }} </div>
      </div>
    </v-card-title>
    </v-card-media>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Course',
  props: ['current'],
  components: {
  },

  computed: {
    ...mapState(['currentRound', 'currentTournament', 'currentCourse'])
  },

  watch: {
    current: function () {
      this.$store.dispatch('LOAD_COURSE', { tourn_id: this.currentTournament.id, id: this.currentRound.course_id, roundNumber: this.currentRound.id })
    }
  },

  created: function (current) {
    this.$store.dispatch('LOAD_COURSE', { tourn_id: this.currentTournament.id, id: this.currentRound.course_id, roundNumber: this.currentRound.id })
  }
}
</script>
