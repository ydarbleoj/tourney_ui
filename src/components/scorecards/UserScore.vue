<template>
  <v-container>
    <v-row style="color:white">
      <v-col cols="12">
        <v-card flat grey class="user-score-card" v-if="!finishRound">
          <v-container class="pa-0">
            <v-row justify="center" style="color:#A8C256;z-index:1000;">
              <v-col cols="6">
                <h3 class="text-center ma-0">Score</h3>
              </v-col>
              <v-col cols="6">
                <h3 class="text-center ma-0">Putts</h3>
              </v-col>
            </v-row>
          </v-container>
          <v-divider></v-divider>
          <v-container class="pa-0">
            <v-row style="font-size: 24px;">
              <v-col>
                <vue-scroll-picker :options="shotList[this.cardData.par - 3]" @input="changeShots" v-model="shotBinding"></vue-scroll-picker>
              </v-col>
              <v-col cols="6">
                <vue-scroll-picker :options="[0, 1, 2, 3, 4, 5]" @input="changePutts" v-model="puttBinding"></vue-scroll-picker>
              </v-col>
            </v-row>
          </v-container>
          <v-divider></v-divider>
          <v-card-actions class="text-center"
            style="color:#F8C977;height:10vh;"
          >
            <v-row align="center" justify="center" style="width:100vw;">
              <v-col cols="4">
                <v-btn
                  :disabled="disableButton"
                  class="score--save_button"
                  @click="updateScore"
                  v-bind:loading="btnLoading"
                >
                  <h4>{{ updateMessage }}</h4>
                </v-btn>
              </v-col>
            </v-row>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from 'pinia'
import { VueScrollPicker } from 'vue-scroll-picker'
import { useTournamentStore } from "@/store/tournament";
import { useLeaderboardsStore } from "@/store/leaderboards";

export default {
  name: 'UserScore',
  props: ['cardData', 'scorecardId'],
  components: {
    VueScrollPicker
  },

  computed: {
    ...mapState(useTournamentStore, ['currentTournament']),
    ...mapState(useLeaderboardsStore, ['currentRound']),
  },

  data () {
    return {
      type: 'SAVE',
      tournId: this.$route.params.tournamentId,
      list: [],
      finishRound: false,
      completeMessage: 'Finished',
      btnLoading: false,
      updateMessage: 'Save',
      heightList: [],
      disableButton: false,
      count: 0,
      shotList: [
        [{value: 0, name: 'Did Not Play'}, {value: 1, name: 'In One 1'}, {value: 2, name: 'Birdie 2' }, {value: 3, name: 'Par 3'}, {value: 4, name: 'Bogey 4'}, {value: 5, name: 'Double 5'}, {value: 6, name: 'Triple 6'}],
        [{value: 0, name: 'Did Not Play'}, {value: 1, name: 'In One 1'}, {value: 2, name: 'Eagle 2'}, {value: 3, name: 'Birdie 3'}, {value: 4, name:  'Par 4'}, {value: 5, name: 'Bogey 5'}, {value: 6, name: 'Double 6'}, {value: 7, name: 'Triple 7'}, {value: 8, name: 'Quad 8'}],
        [{value: 0, name: 'Did Not Play'}, {value: 1, name: 'In One 1'}, {value: 2, name: 'Albetrose 2'}, {value: 3, name: 'Eagle 3'}, {value: 4, name: 'Birdie 4'}, {value: 5, name: 'Par 5'}, {value: 6, name: 'Bogey 6'}, {value: 7, name: 'Double 7'}, {value: 8, name: 'Triple 8'},{value: 9, name: 'Quad 9'}, {value: 10, name: 'Other 10'}]
      ],
      puttBinding: 2,
      shotBinding: '',
      shots: null,
      putts: null,
    }
  },

  created: function () {
    this.puttBinding = this.cardData.putts == null ? 2 : this.cardData.putts
    this.putts = this.puttBinding
    this.setType()
    this.filterShots()
  },

  methods: {
    setType () {
      if (this.cardData.user_score_id) {
        this.type = 'UPDATE'
        this.updateMessage = 'UPDATE'
      }
    },
    filterShots () {
      let elem = this.cardData.score == null ? this.cardData.par : this.cardData.score;
      let shot;
      let that = this;

      this.shots = elem

      this.shotList[this.cardData.par - 3].filter(function(el){
        if(el.value == elem) {
          shot = that.shotBinding = el.value;
        }
      });
      return shot
    },
    changeShots(value) {
      console.log("changeShots", value);
      this.shots = value
    },
    changePutts(value) {
      this.putts = value
    },
    scorecardPage () {
      // this.$store.commit("setPageTransition", "back");
      this.$router.push(
        {
          name: 'Scorecard',
          params: {
            id: this.currentTournament.id,
            scorecard_id: this.currentRound.id
          }
        }
      )
    },
    closeCard(num) {
      if (this.cardData.number === 18) {
        this.$emit('onUpdate')
        setTimeout(() =>  this.scorecardPage(), 900)
      }
    },
    completeScorecard () {
      this.finishRound = !this.finishRound
    },
    finishCard () {
      this.btnLoading = true
      this.$store.dispatch('scorecards/FINISH_SCORECARD', { tournId: this.currentTournament.id, scorecardId: this.scorecardId, opts: true })
        .then(response => {
          if (response) {
            this.btnLoading = false
            this.updateMessage = 'Success'
          } else {
            this.updateMessage = 'Failed'
          }
          setTimeout(() =>  this.$emit('event', 1), 3000)
        })
    },
    updateScore() {
      this.disableButton = true
      this.btnLoading = true
      let us_id = this.cardData.user_score_id
      let holeNumber = this.cardData.number
      const options = { putts: this.putts, score: this.shots }

      if (us_id) {
        this.$store.dispatch('scorecards/UPDATE_USER_SCORE', { scorecardId: this.scorecardId, scoreId: us_id, scores: options }).then(response => {
            if (response) {
              this.updateMessage = 'Success'
              this.type = 'UPDATE'
              this.closeCard(holeNumber)
              this.btnLoading = false
              this.disableButton = false
              if (holeNumber !== 18) {
                this.$emit('onUpdate')
              }
            } else {
              this.updateMessage = 'Failed'
              this.type = 'SAVE'
            }
        })
      } else {
        let user_score = { handicap: this.cardData.handicap, par: this.cardData.par, number: this.cardData.number, putts: this.putts, score: this.shots, hole_id: this.cardData.hole_id }
        this.$store.dispatch('scorecards/CREATE_USER_SCORE', { scorecardId: this.scorecardId, scores: user_score })
          .then(response => {
            this.btnLoading = false
            this.disableButton = false
            if (response) {
              this.updateMessage = 'Success'
              this.type = 'UPDATE'
              this.closeCard(holeNumber)
              if (holeNumber !== 18) {
                this.$emit('onUpdate')
              }
            } else {
              this.updateMessage = 'Failed'
              this.type = 'SAVE'
            }
        })
      }
    }
  }
}
</script>
<style>

div.layout.record.row.wrap {
  color: #9FB8CE;
}
div.card__actions.text-center.record {
  background-color: #9FB8CE;
}
div.card__text {
  max-height: 500vh;
}
div.text-left.user-score.card.card--flat {
  height: 500px;
  justify-content: center;
}
.vue-scroll-picker-layer-selected {
  color: #FFCB47;
}
div.vue-scroll-picker-item {
  text-align: center;
  height: 1.7em;
  line-height: 1.7em;
}
.vue-scroll-picker-layer {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.score--save_button {
  background-color: #A8C256;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}
/* .vue-scroll-picker-layer div.top {
    box-sizing: border-box;
    border-bottom: 1px solid #c8c7cc;
    background: linear-gradient(180deg,#fff 10%,rgba(255, 255, 255, .1));
    top: 0;
    left: 0;
    right: 0;
    height: 40%;
    cursor: pointer;
} */
/* .vue-scroll-picker-layer div.middle {
    top: 40%;
    left: 0;
    right: 0;
    color: pink;
    bottom: 40%;
} */
/* .vue-scroll-picker-layer div.bottom {
    border-top: 1px solid #c8c7cc;
    background: linear-gradient(360deg,#fff 10%,rgba(255, 255, 255, .1));
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    cursor: pointer;
} */
div.vue-scroll-picker {
  position: relative;
  background-color: white;
  overflow: hidden;
}


.item {
  border-bottom: 1px solid #eee;
  overflow: hidden;
}

.item:last-child {
  border-bottom: 0;
}

.scroll-container {
  transform: translate3d(0, 0, 0);
}
</style>
