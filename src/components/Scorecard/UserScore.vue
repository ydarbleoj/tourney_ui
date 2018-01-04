<template>
  <v-container class="pa-0" fluid>
    <v-toolbar fixed flat dark color="primary" extended>
      <div class='headline'>Score Hole {{ this.cardData.number}} Par {{this.cardData.par}}</div>
      <v-toolbar-title class="white--text" slot="extension">Shots</v-toolbar-title>
      <v-toolbar-title class="white--text" slot="extension">Putts</v-toolbar-title>
      <v-spacer></v-spacer>

    </v-toolbar>
    <v-layout>
      <div>hello</div>
    </v-layout>
    <v-layout row wrap white>
      <v-flex xs6>
        <v-card flat class="text-xs-center mt-4">
          <div class="wrapper">
              <!-- <scroll-list :heights="heightList"
                           :remain="10"
                           @toTop="onTop"
                           @toBottom="onBottom"
                           @scrolling="onScroll">
                <div v-for="(item, index) in list"
                     :key="item.index"
                     :class="{item: 1}"
                     :style="{height: '50px', 'line-height': '50px'}">
                    {{item.index}} {{item.shots}}
                </div>
              </scroll-list> -->
          </div>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <!-- <v-card flat class="text-xs-center">
          <virtual-list :size="40" :remain="8">
            <item v-for="item of items" :key="item.id" />
          </virtual-list>
        </v-card> -->
      </v-flex>
    </v-layout>
    <v-footer color="primary" fixed class="pa-0">
      <v-btn dark icon :to="{name: 'Scorecard', params: {tournId: this.tournId, scorecardId: this.cardData.scorecard_id }}">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <span class="white--text">Scorecard</span>
    </v-footer>
  </v-container>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import scrollList from 'vue-scroll-list'
import virtualList from 'vue-virtual-scroll-list'
// import scoreList from './scoreList'

export default {
  name: 'UserScore',
  components: {
    scrollList, virtualList
  },

  computed: {
    ...mapState([
      'UserScore',
    ]),
    ...mapGetters([
      'score',
      'scorecard'
    ])
  },

  data () {
    return {
      cardData: this.$route.params['user_sc'],
      tournId: this.$route.params.tournamentId,
      list: [],
      heightList: [],
      count: 0,
      shot_list: [
        ['', '', 'Did Not Play', 'In One', 'Birdie', 'Par', 'Bogey', 'Double', 'Triple', 'Quad', 'Ouch'],
        ['', '', 'Did Not Play', 'In One', 'Eagle', 'Birdie', 'Par', 'Bogey', 'Double', 'Triple', 'Quad', 'Ouch'],
        ['', '', 'Did Not Play', 'In One', 'Albetrose', 'Eagle', 'Birdie', 'Par', 'Bogey', 'Double', 'Triple', 'Quad', 'Ouch']
      ],
    }
  },

  beforeUpdate: function() {
    console.log('before', this.cardData)
  },

  beforeMount: function () {
    console.log('here', this.cardData.par)
    // this.$store.dispatch('LOAD_SCORECARD', { tournId: this.$route.params.tournId, id: this.$route.params.scorecardId })
  },

  methods: {
    onTop() {
      console.log('[demo]:page to top.');
    },
    onBottom() {
      console.log('[demo]:page to bottom.');
      !window.__stopLoadData && this.createData();
    },
    onScroll(event) {
      window.__showScrollEvent && console.log(event);
    },
     onScroll1(event) {
      window.__showScrollEvent && console.log(event);
    },
    createShots() {
      let par = this.cardData.par;
      let shotType = this.shot_list[par - 3]

      this.putts = ['', 0, 1, 2, 3, 4, 5]

      for (let i = 0; i < 18; i++) {
        let s = shotType[i]
        let shot = i
        console.log('right', s)

        if (s) {
        } else {
          s = 'SAD!'
        }
        if (i < 4) {
          s = ''
          shot = ''
        } else {
          shot = i - 4
        }
        this.list.push({
          index: s,
          shots: shot,
        });
      }
    }
  },
  created() {

  }

}
</script>
<style>
.wrapper {
  height: 100%;
  padding: 0;
  background-color: pink;
  border: 1px solid #eee;
    -webkit-overflow-scrolling: touch;
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
