<template>
  <v-card flat>
    <v-layout row wrap align-center style="background-color:#f1f1f1;" class="pt-5 pb-5">
      <v-flex x3>
        <BackButton
          :routeName="'Profile'"
          :routeParams="{ id: $auth.user().id }"
        />
      </v-flex>
       <v-flex xs6>
        <h1 class="font-weight-regular text-xs-center">Scorecards</h1>
       </v-flex>
       <v-flex xs3></v-flex>
    </v-layout>
    <v-layout row wrap align-center  v-if="isLoaded" pa-2>
      <v-flex xs12>
        <div v-for="(cards, indx) in scorecards" :key="cards.id" :index="indx">
          <h2 class="font-weight-regular pl-3 pt-2">{{ cards.year }}</h2>
          <div v-for="(card, indx) in cards.cards" :key="card.id" :index="indx">
            <scorecard-button :card="card" />
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import ScorecardButton from './ScorecardButton'
import BackButton from '../BackButton'

export default {
  name: "ProfileScorecards",
  components: {
    BackButton,
    ScorecardButton
  },

  computed: {
    ...mapState({
      scorecards: state => state.profile.scorecards
    })
  },

  data () {
    return {
      isLoaded: false
    }
  },

  methods: {

  },

  created () {
    this.$store.dispatch('profile/LOAD_SCORECARDS').then((res) => {
      this.isLoaded = true
      console.log('scorecards', this.scorecards)
    })
  }
}
</script>