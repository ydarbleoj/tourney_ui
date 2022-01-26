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
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import BackButton from '../BackButton'
import Container from './Container'

export default {
  name: 'index',
  props: ['course'],
  components: {
    BackButton,
    Container
  },

  data () {
    return {
      show: false,
      isLoading: true,
      imageId: 2

    }
  },

  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament,
      currentRound: state => state.currentRound,

    })
  },

  methods: {
    // filterTeeTime (rndNum, list) {
    //   let n = list.filter(el => el.attributes.round_number === rndNum)
    //   if (n === undefined || !n.length) return '';

    //   return n[0].attributes
    // }
  },

  created: function () {
    this.imageId = this.currentRound['attributes']['new_course_id']
    const rndNum = this.currentRound['attributes']['round_number']

    this.$store.dispatch(
      'course/LOAD_COURSE', {
        id: this.currentTournament.id,
        roundNumber: rndNum
      }
    ).then(response => {
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
