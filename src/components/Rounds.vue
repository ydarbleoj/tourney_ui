<template>
  <v-card width="100%" flat>
    <v-row wrap>
      <v-col cols="12" lg="6">
        <v-row wrap mt-4>
          <v-col cols="12">
            <h2 class="font-weight-regular text-left pl-4 ml-2 mb-3">Round Information</h2>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="6">
        <v-row wrap mt-4>
          <v-col cols="12">
            <h2 class="font-weight-regular text-left pl-4 ml-2 mb-3">Scorecards</h2>
						<div v-for="item in roundComps" :key="item.id">
							Round {{ item.attributes.round_number }}
							<scorecard-button :round="item" />
						</div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
// import { Carousel, Slide } from 'vue3-carousel'
import { useTournamentStore } from "@/store/tournament";
import { useLeaderboardsStore } from "@/store/leaderboards";
import ScorecardButton from './scorecards/Button.vue';
// import 'vue3-carousel/dist/carousel.css'
// import CourseButton from '../components/Course/Button.vue'

// Carousel,
// Slide
export default {
	name: 'Rounds',
  props: ['current'],
  components: {
		ScorecardButton,
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
    ...mapState(useTournamentStore, ['currentTournament']),
		...mapState(useLeaderboardsStore, ['rounds', 'currentRound']),
  },

  methods: {
		...mapActions(useLeaderboardsStore, ["loadRounds"]),
    isActive (round) {
      let num = round['round_number']
      // num == this.currentRoundNumber ? true : false
      return true
    },
    updateRound (num) {
      // this.$store.commit('SET_CURRENT_ROUND',{ list: this.rounds[num - 1] })
    },
  },

  created () {
    this.loadRounds(this.current.id).then(() => {
      this.isloading = true
      this.roundComps = this.rounds
      this.currentRoundNumber = this.currentRound['attributes']['round_number']
    }, (err) => {
			console.log(err)
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
</style>

