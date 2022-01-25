<template >
  <v-card flat class="mt-3">
    <div class="pl-4 pr-4">
      <h2 style="font-weight:500;">Player Stats & Impact</h2>
      <p class="mt-2">
        The following table highlights 3 aspects of team scoring: the lowest, the second lowest, and
        the potential score.
      </p>
      <p>
        Team scoring accounts for two things when determining the lowest scores: the score and when it was
        entered.
      </p>
      <p>
        That being the case, potential scores are those that are equal to the lowest or second
        lowest, but where not accounted as such due to time of entry.
      </p>
      <v-layout row wrap align-center class="mb-4">
        <v-flex class="text-xs-left">
          <p><span class="lowest-bg scoring-legend"></span>Lowest</p>
        </v-flex>
        <v-flex class="text-xs-left">
          <p><span class="second-lowest-bg scoring-legend"></span>Second Lowest</p>
        </v-flex>
        <v-flex class="text-xs-left">
          <p><span class="potential-bg scoring-legend"></span>Potential</p>
        </v-flex>
      </v-layout>
    </div>
    <v-layout row>
      <v-flex xs12>
        <v-card
          flat
          style="">
           <hooper
            :itemsToSlide="1"
            :itemsToShow="1.2"
            :centerMode="true"
            :transition="300"
           >
            <slide
              v-for="(item, indx) in teamPlayers" :key="item.id" :index="indx">
              <player-agg :player="item.attributes" />
            </slide>
          </hooper>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import PlayerAgg from './Player'
import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css';

export default {
  name: 'Players',
	components: {
		PlayerAgg,
    Hooper,
    Slide
	},
  data () {
    return {
      chartData: null,
      auto: "auto"
    }
  },
  computed: {
    ...mapState({
     currentTournament: state => state.tournament.currentTournament
    }),
    ...mapGetters({
      teamPlayers: 'leaderboards/team/getTeamPlayers'
    })
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
    };
    return {
      onSwiper,
      onSlideChange,
    };
  },
  methods: {
  },
  mounted: function () {
  }
}
</script>
<style>
.team-text-color {
	color: #ACA885;
}
.hooper {
  height: auto;
}
.team-background-color {
  background-color: #ACA885;
}
.inner {
  position: absolute;
  top: 50%;
  left: 50%;
}
.outer {
  position: relative;
  display: inline-block;
  margin: 0 15px;
}
.rotate {
  transform: translateX(-50%) translateY(-50%) rotate(-90deg);
}
.lowest-bg {
  background-color: #A8C256;
}
.second-lowest-bg {
  background-color: #e3ec65;
}
.potential-bg {
  background-color: #999;
}
.scoring-legend {
  margin:2px;
  margin-right:7px;
  float:left;
  border-radius:5px;
  width:15px;
  height:15px;
}
</style>
