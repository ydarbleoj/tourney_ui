<template>
  <main>
    <v-layout row wrap>
      <v-flex xs12 sm12>
        <v-card color="blue-grey darken-2" class="white--text">
          <v-card-title primary-title>
            Course List
            {{ current }}
          </v-card-title >
        </v-card>
      </v-flex>
    </v-layout>
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TournamentCourses',
  props: ['current'],
  components: {
  },

  computed: {
    ...mapState(['currentTournament'])
  },

  beforeUpdate (current) {
    this.$store.dispatch('LOAD_TOURNAMENT_COURSE_LIST', { id: this.current.id })
  },

  mounted: function (current) {
    this.$store.dispatch('LOAD_TOURNAMENT_COURSE_LIST', { id: this.current.id })
  }
}
</script>
