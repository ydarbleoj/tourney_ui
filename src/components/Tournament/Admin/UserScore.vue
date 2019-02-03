<template>
  <v-layout white>
    <v-flex xs12>
      <v-divider></v-divider>
      <v-card flat grey class="user-score-card" v-if="!finishRound">
        <v-card flat class="pa-0">
          <v-container fluid fill-height class="pa-0">
            <v-layout row align-center justify-center class="record" style="height:10vh;" wrap >
              <v-flex xs6>
                <h3 class="text-xs-center pa-0 ma-0">Score</h3>
              </v-flex>
              <v-flex xs6>
                <h3 class="text-xs-center pa-0 ma-0">Putts</h3>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-divider></v-divider>
        <v-card-text class="pt-0 pb-0">
          <v-container fluid fill-height class="pa-0">
            <v-layout row wrap  style="font-size: 24px;">
              <v-flex xs12>
                <scroll-picker-group class="flex">
                  <scroll-picker :options="shotList[this.cardData.par - 3]" @input="changeShots" v-model="shotBinding"></scroll-picker>
                  <scroll-picker :options="[0, 1, 2, 3, 4, 5]" @input="changePutts" v-model="puttBinding"></scroll-picker>
                </scroll-picker-group>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="text-xs-center"
          style="color:#F8C977;height:10vh;"
        >
          <v-layout row wrap align-center justify-center style="width:100vw;">
            <v-flex xs4>
              <div class="text-xs-right pr-3" v-if="cardData.number != 1">
                <span><v-icon  v-if="type === 'UPDATE' || cardData.number > 1" color="#F8C977" style="font-size:35px;" @click="closeCard(0)" >arrow_backward</v-icon></span>
              </div>
            </v-flex>
            <v-flex xs4>
              <v-btn flat round class="score--save_button" @click="updateScore" v-bind:loading="btnLoading">
                <h4>{{updateMessage }}</h4>
              </v-btn>
            </v-flex>
            <v-flex xs4>
              <div class="text-xs-right ">
                <span>
                  <v-icon  v-if="type === 'UPDATE' || cardData.number === 18" color="#F8C977" style="font-size:35px;" @click="closeCard(1)" >arrow_forward</v-icon>
                </span>
              </div>
            </v-flex>
          </v-layout>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
      <v-card flat v-else class="pt-5" style="">
        <v-layout row wrap align-center justify-center>
          <v-flex xs12>

            <v-btn flat round class="score--save_button" style="background-color:#ED6C6C;" @click="finishCard()" v-bind:loading="btnLoading">
              <h4>{{ completeMessage }}</h4>
            </v-btn>
          </v-flex>

        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { ScrollPicker, ScrollPickerGroup } from 'vue-scroll-picker'

export default {
  name: 'UserScore',
  props: ['cardData', 'scorecardId'],
  components: {
    ScrollPicker,
    ScrollPickerGroup
  },

  computed: {
    ...mapState([
      'UserScore',
      'currentTournament'
    ]),
  },

  data () {
    return {
      type: 'SAVE',
      finishRound: false,
      completeMessage: 'Finished',
      btnLoading: false,
      updateMessage: 'Save',
      list: [],
      heightList: [],
      count: 0,
      shotList: [
        [{value: 0, name: 'Did Not Play'}, {value: 1, name: 'In One 1'}, {value: 2, name: 'Birdie 2' }, {value: 3, name: 'Par 3'}, {value: 4, name: 'Bogey 4'}, {value: 5, name: 'Double 5'}, {value: 6, name: 'Triple 6'}, {value: 7, name: 'Quad 7'}, {value: 8, name: 'Other 8'}, {value: 9, name: 'Other 9'}, {value: 10, name: 'Other 10'}, {value: 11, name: 'Other 11'}, {value: 12, name: 'Ouch 12'}],
        [{value: 0, name: 'Did Not Play'}, {value: 1, name: 'In One 1'}, {value: 2, name: 'Eagle 2'}, {value: 3, name: 'Birdie 3'}, {value: 4, name:  'Par 4'}, {value: 5, name: 'Bogey 5'}, {value: 6, name: 'Double 6'}, {value: 7, name: 'Triple 7'}, {value: 8, name: 'Quad 8'}, {value: 9, name: 'Other 9'}, {value: 10, name: 'Other 10'}, {value: 11, name: 'Other 11'}, {value: 12, name: 'Other 12'}, {value: 13, name: 'Other 13'}, {value: 14, name: 'Other 14'}, {value: 15, name: 'Other 15'}],
        [{value: 0, name: 'Did Not Play'}, {value: 1, name: 'In One 1'}, {value: 2, name: 'Albetrose 2'}, {value: 3, name: 'Eagle 3'}, {value: 4, name: 'Birdie 4'}, {value: 5, name: 'Par 5'}, {value: 6, name: 'Bogey 6'}, {value: 7, name: 'Double 7'}, {value: 8, name: 'Triple 8'},{value: 9, name: 'Quad 9'}, {value: 10, name: 'Other 10'}, {value: 11, name: 'Other 11'}, {value: 12, name: 'Other 12'}, {value: 13, name: 'Other 13'}, {value: 14, name: 'Other 14'}, {value: 15, name: 'Other 15'}]
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
    filterShots() {
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
      this.shots = value
    },
    changePutts(value) {
      this.putts = value
    },
     closeCard(num) {
      if (this.cardData.number === 18) {
        this.completeScorecard();
        return
      }
      console.log('num', num)
      this.$emit('event', num)
      this.type == 'SAVE'
    },
    completeScorecard () {
      this.finishRound = !this.finishRound
    },
    finishCard () {
      this.btnLoading = true
      this.$store.dispatch('scorecards/FINISH_SCORECARD', { tournId: this.currentTournament.id, scorecardId: this.scorecardId, opts: true })
        .then(response => {
          this.btnLoading = false
          if (response) {
            this.updateMessage = 'Success'
          } else {
            this.updateMessage = 'Failed'
          }
          setTimeout(() =>  this.$emit('event', 1), 3000)
        })
    },
    updateScore() {
      this.btnLoading = true
      let us_id = this.cardData.user_score_id
      let options = { putts: this.putts, score: this.shots }

      if (us_id) {
        this.$store.dispatch('scorecards/ADMIN_UPDATE_USER_SCORE', { scorecardId: this.scorecardId, scoreId: us_id, scores: options })
          .then(response => {
            if (response) {
              this.updateMessage = 'Success'
              this.type = 'UPDATE'
            } else {
              this.updateMessage = 'Failed'
              this.type = 'SAVE'
            }
            setTimeout(() => this.updateMessage = 'Update', 3000)
            this.btnLoading = false
          })
      } else {
        let user_score = { handicap: this.cardData.handicap, par: this.cardData.par, number: this.cardData.number, putts: this.putts, score: this.shots, hole_id: this.cardData.hole_id }
        this.$store.dispatch('scorecards/ADMIN_CREATE_USER_SCORE', { scorecardId: this.scorecardId, scores: user_score })
          .then(response => {
            this.btnLoading = false
            if (response) {
              this.updateMessage = 'Success'
              this.type = 'UPDATE'
            } else {
              this.updateMessage = 'Failed'
              this.type = 'SAVE'
            }
            setTimeout(() => this.updateMessage = 'Update', 3000)
        })

      }
    }
  }

}
</script>
<style>
.admin--add_button {
  background-color: white;
  color: #6CADED;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}
div.layout.record.row.wrap {
}
div.card__actions.text-xs-center.record {
  background-color: #6CADED;
}
div.user-score-card.card.card--flat {
  /*background-color: rgba(153, 153, 153, 1)*/
  /*: 100%;*/
}
div.card__text {
  max-height: 500vh;
}
div.text-xs-left.user-score.card.card--flat {
  height: 500px;
  justify-content: center;
}
.vue-scroll-picker-item.-selected {
   color: #F8C977;
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
.vue-scroll-picker-layer div.top {
    box-sizing: border-box;
    border-bottom: 1px solid #c8c7cc;
    background: linear-gradient(180deg,#fff 10%,rgba(255, 255, 255, .1));
    top: 0;
    left: 0;
    right: 0;
    height: 40%;
    cursor: pointer;
}
.vue-scroll-picker-layer div.middle {
    top: 40%;
    left: 0;
    right: 0;
    bottom: 40%;
}
.vue-scroll-picker-layer div.bottom {
    border-top: 1px solid #c8c7cc;
    background: linear-gradient(360deg,#fff 10%,rgba(255, 255, 255, .1));
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    cursor: pointer;
}
div.vue-scroll-picker {
  position: relative;
  /*height: auto;*/
  background-color: white;
}

.score--save_button {
  background-color: #6CADED;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
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
