<template>
  <v-card width="100%" flat>
     <v-layout row wrap mt-4>
      <v-flex xs12>
        <h2 class="font-weight-regular text-xs-left pl-4 ml-2 mb-3">Round Information</h2>
      </v-flex>
    </v-layout>
    <hooper
      :itemsToSlide="1"
      :itemsToShow="1.1"
      :centerMode="true"
      :transition="300"
      >
        <slide
          v-for="(item, indx) in roundComps" :key="item.id" :index="indx">
          <course-button :course="item" />
          <v-spacer class="mb-4"></v-spacer>
          <scorecard-button :round="item" />
        </slide>
      </hooper>
    <v-tabs-items v-model="tab">
      <v-tab-item
        active-class="active-tab"
        v-for="i in roundComps"
        :key="i['id']"
        transition="false"
        reverse-transition="false"
      >
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import CourseButton from '../components/Course/Button'
import ScorecardButton from '../components/Scorecard/Button'
import { mapState, mapMutations } from 'vuex'
import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css';

export default {
  name: 'Rounds',
  props: ['current'],
  components: {
    CourseButton,
    Hooper,
    ScorecardButton,
    Slide
  },

  data () {
    return {
      isLoading: false,
      swipeDirection: 'None',
      tab: 0,
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
    isActive (round) {
      let num = round['round_number']
      // num == this.currentRoundNumber ? true : false
      return true
    },
    updateRound (num) {
      this.$store.commit('SET_CURRENT_ROUND',{ list: this.rounds[num - 1] })
    },
  },

  // watch: {
  //   current: function () {
  //     this.roundComps = []
  //     this.$store.dispatch('LOAD_ROUNDS', { id: this.current.id })
  //       .then(response => {
  //         this.isloading = false
  //         this.roundComps = this.rounds
  //          this.currentRoundNumber = this.currentRound['attributes']['round_number']
  //       })
  //   }
  // },

  created: function (current) {
    this.$store.dispatch(
      'LOAD_ROUNDS', { id: this.current.id }
    ).then(response => {
      this.isloading = true
      this.roundComps = this.rounds
      this.currentRoundNumber = this.currentRound['attributes']['round_number']
    })
  },
}
</script>
<style>
.hooper {
  height: auto;
}
#round-container {
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0;
  margin: 0;
  overflow: scroll;
}
.v-tabs__item--active.tab-slider {
  color: #f1f1f1;
  background-color: #A8C256;
}
.tabItem {
  opacity: 1;
	animation-name: fadeInOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: 0.7s;
}
@keyframes fadeInOpacity {
	0% {
		opacity: 0;
	}
  50% {
    opacity: 0.6;
  }
	100% {
		opacity: 1;
	}
}
.active-tab {
  color: #f1f1f1;
  background-color: #A8C256;
}
.text-decoration-underline {
  background-color: #FFCB47;

}
  // color: #FFCB47;
</style>

