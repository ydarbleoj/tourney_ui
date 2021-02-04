<template>
  <v-card width="100%" flat class="pa-4">
    <h2 class="text-xs-left font-weight-regular" style="margin: 5% 0 5% 0;">Round Info</h2>
    <v-toolbar flat color="transparent">
      <template>
        <v-tabs
          v-model="tab"
          centered
          class="pb-4"
        >
          <v-tabs-slider class="tab-slider"></v-tabs-slider>
          <v-tab
            v-for="i in items"
            :key="i"
            class="pl-2 pr-2"
            @click="updateRound(i)"
          >
            round {{ i }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="i in roundComps"
        :key="i['id']"
        transition="fade-transition"
        reverse-transition="fade-transition"
      >
        <course-button :course="i" />
        <v-spacer class="mb-4"></v-spacer>
        <scorecard-button :round="i" />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import CourseButton from '../components/Course/Button'
import ScorecardButton from '../components/Scorecard/Button'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Rounds',
  props: ['current'],
  components: {
    CourseButton,
    ScorecardButton,
  },

  data () {
    return {
      isLoading: false,
      swipeDirection: 'None',
      tab: 1,
      items: [1, 2, 3],
      roundComps: [],
      currentRoundNumber: 1,
      windowSize: {
        x: 0,
        y: 0
      },
    }
  },

  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament,
      rounds: state => state.rounds,
      currentRound: state => state.currentRound,
    }),
    ...mapMutations(['SET_CURRENT_ROUND'])
  },

  methods: {
    updateRound (num) {
      this.$store.commit('SET_CURRENT_ROUND',{ list: this.rounds[num - 1] })
    },
  },

  watch: {
    current: function () {
      this.roundComps = []
      this.$store.dispatch('LOAD_ROUNDS', { id: this.current.id })
        .then(response => {
          this.isloading = false
          this.roundComps = this.rounds
           this.currentRoundNumber = this.currentRound['attributes']['round_number']
        })
    }
  },

  created: function (current) {
    this.$store.dispatch('LOAD_ROUNDS', { id: this.current.id })
      .then(response => {
        this.isloading = true
        this.roundComps = this.rounds,
        this.currentRoundNumber = this.currentRound['attributes']['round_number']
      })
  },
}
</script>
<style lang="scss" scoped>
#round-container {
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0;
  margin: 0;
  overflow: scroll;
}
.tab-slider {
  background-color: turquoise;
  opacity: 0.7;
  border-radius: 25px;
  height: 48px;
}
.fade-transition-enter-active, .fade-transition-leave-active {
  transition: .7s cubic-bezier(0.25, 0.8, 0.5, 1);
}
</style>

