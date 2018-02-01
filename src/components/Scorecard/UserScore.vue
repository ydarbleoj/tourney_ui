<template>
  <v-layout white>
    <v-flex xs12>
      <v-card flat grey class="user-score-card">
        <v-card-media class="pa-0">
          <v-container fluid fill-height pa-0>
            <v-layout row class="record" wrap>
              <v-flex xs6>
                <h4 class="text-xs-center white--text pa-0 ma-0">Score</h4>
              </v-flex>
              <v-flex xs6>
                <h4 class="text-xs-center white--text pa-0 ma-0">Putts</h4>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-text>
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
        <v-card-actions class="text-xs-center record">
          <v-btn flat color="white" @click="updateScore">
            <h4>SAVE</h4>
          </v-btn>
          <v-spacer></v-spacer>
           <v-btn v-if="type === 'CLOSE'" color="white" @click="closeCard">
            <h4>Close</h4>
          </v-btn>
        </v-card-actions>
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
    ...mapGetters([
      'score',
      'scorecard'
    ])
  },

  data () {
    return {
      type: 'SAVE',
      tournId: this.$route.params.tournamentId,
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
    this.puttBinding = this.cardData.putts
    this.putts = this.cardData.putts
    this.filterShots()
  },

  methods: {
    filterShots() {
      let elem = this.cardData.score
      this.shots = elem
      let that = this
      let shot;
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
    closeCard() {
      this.$emit('event')
      this.type == 'SAVE'
    },
    updateScore() {
      let us_id = this.cardData.user_score_id
      let options = { putts: this.putts, shots: this.shots }

      if (us_id) {
        this.$store.dispatch('SEND_USER_SCORE', { scorecardId: this.scorecardId, scoreId: this.cardData.user_score_id, options: options })
        this.type = 'CLOSE'
      } else {

      }
    }
  }

}
</script>
<style>
div.layout.record.row.wrap {
  background-color: #6CADED;
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
  color: #007BFF;
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
   /* .top,
    .middle,
    .bottom {
        position: absolute;
    }*/
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
