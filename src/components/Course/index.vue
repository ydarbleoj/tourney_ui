<template>
  <v-card
    flat
    v-if="!isLoading"
    style="background-color:#FFF;height:100%;"
  >
    <v-img
      :src="'/static/' + imageId + 'course.jpg'"
      height='35vh'
      class="course-header"
    >
      <v-container fill-height pa-0>
        <BackButton
          :routeName="'Tournament'"
          :routeParams="{ id: this.currentTournament.id }"
        />
      </v-container>
    </v-img>
    <v-card-text
      class="pa-0"
      style="background-color:white;"
      transition="fade-transition"
    >
      <container />
      <tee-time />

       <stats
        :roundId="roundId"
        v-if="!isLoading"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import BackButton from '../BackButton'
import Container from './Container'
import TeeTime from './TeeTime'
import Stats from './Stats/index'

export default {
  name: 'index',
  props: ['course'],
  components: {
    BackButton,
    Container,
    Stats,
    TeeTime
  },

  data () {
    return {
      show: false,
      isLoading: true,
      imageId: 2,
      roundId: null

    }
  },

  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament,
      courseInfo: state => state.course.courseInfo
    })
  },

  methods: {},

  created () {
    const roundNumber = this.$route.params.roundNumber

    this.$store.dispatch('course/LOAD_COURSE', {
      id: this.currentTournament.id,
      roundNumber: roundNumber
    }).then(response => {
      this.roundId = this.courseInfo.attributes.id
      this.imageId = this.courseInfo.attributes.new_course_id
      this.isLoading = false
    })
  }
}
</script>
<style>
.course-card {
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
}
.back-button {
  border-color: white;
  background-color: transparent;
}
</style>
