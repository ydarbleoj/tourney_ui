<template>
  <v-card width="100%" flat class="pl-4 pr-4 pt-4">
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
        <v-spacer class="mt-4 round-spacer"></v-spacer>
        {{ i }}
        <scorecard
          :current="current"
          :roundId="i"
          v-if="currentRound === i['attributes']['round_number']"
        />
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
      tab: null,
      items: [1, 2, 3],
      roundComps: [],
      windowSize: {
        x: 0,
        y: 0
      },
    }
  },

  computed: {
    ...mapState(['currentTournament', 'rounds', 'currentRound', 'roundOne',
      'roundTwo', 'roundThree']),
    ...mapMutations(['SET_CURRENT_ROUND'])
  },

  methods: {
    updateRound (num) {
      console.log('crreut', num)
      this.$store.commit('SET_CURRENT_ROUND',{ list: this.rounds[num - 1] })
    }
  },

  watch: {
    current: function () {
      this.roundComps = []
      this.$store.dispatch('LOAD_ROUNDS', { id: this.current.id })
        .then(response => {
          this.isloading = false
          this.roundComps = this.rounds
        })
    }
  },

  created: function (current) {
    console.log('crruent', this.currentRound)
    this.$store.dispatch('LOAD_ROUNDS', { id: this.current.id })
      .then(response => {
        this.isloading = true
        this.roundComps = this.rounds
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
  transition: .5s cubic-bezier(0.25, 0.8, 0.5, 1);
}
</style>

