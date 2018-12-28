<template>
  <v-container id="round-container" class="pa-0" ref="roundCardContainer">
    <v-layout row wrap>
      <v-flex xs12 sm12 lg12>
        <h2 class="text-xs-left font-weight-regular pl-0" style="margin-left: 5%;" v-if="isPreview">Round Info</h2>
        <swipe class="my-swipe"
          :auto="0" :show-indicators="false"
          style="padding: 0px 0;"
          :continuous="true"
        >
          <swipe-item
            v-for="i in roundComps[0]"
            :key="i['id']"
            style="width: 90%;margin: 0 auto;"
          >
            <course :course="i"  @event="courseToggle(this)" />
            <v-spacer class="mt-4 round-spacer"></v-spacer>
            <scorecard :current="current" :roundId="i" />
          </swipe-item>
        </swipe>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Course from '../components/Course/index'
import Scorecard from '../components/Scorecard/index'
import TeeTime from '../components/Course/TeeTime'
import { Swipe, SwipeItem } from 'vue-swipe'
import { mapState } from 'vuex'

export default {
  name: 'Rounds',
  props: ['current'],
  components: {
    Course,
    TeeTime,
    Scorecard,
    Swipe,
    SwipeItem,
  },

  data () {
    return {
      loading: true,
      isPreview: true,
      roundComps: [],
      windowSize: {
        x: 0,
        y: 0
      }
    }
  },

  computed: {
    ...mapState(['currentTournament', 'rounds', 'currentRound', 'roundOne',
      'roundTwo', 'roundThree', 'teeTime']),
  },

  methods: {
    origPosition (card) {
      let position = {
        top: card.getBoundingClientRect().top,
        left: card.getBoundingClientRect().left,
        bottom: card.getBoundingClientRect().bottom,
        scbottom: screen.bottom,
      }
      console.log('onres', this.windowSize)
      this.cardPos = Object.assign(position);
      console.log('this . capos', this.cardPos)
    },
    onResize () {
      this.windowSize = { x: this.$el.innerWidth, y: this.$el.innerHeight }
    },
    courseToggle (event) {
      let card = this.$refs.roundCardContainer
      this.isPreview = !this.isPreview
      this.origPosition(card)
      this.expandParent(card)
      this.$el.classList.toggle('open')
    },
    expandParent (card) {
      let isPrev = this.isPreview
      card.style.zIndex = isPrev ? 1 : 9999;
      card.style.position = isPrev ? 'relative' : 'fixed';
      card.style.backgroundColor = isPrev ? 'pink' : 'white';
      card.style.top = isPrev ? this.cardPos.top : 0;
      card.style.padding = isPrev ? '16px 0' : '0';
      card.style.margin = isPrev ? '4px 0' : '0';
      card.style.left = isPrev ? this.cardPos.left : 0;
      document.getElementsByClassName('round-spacer')[0].classList.toggle('hide')
    },
    updateRound: function (rnd) {
      if (rnd === 1) {
        this.$store.dispatch('UPDATE_CURRENT_ROUND', this.roundOne)
      } else if (rnd === 2){
        this.$store.dispatch('UPDATE_CURRENT_ROUND', this.roundTwo)
      } else {
        this.$store.dispatch('UPDATE_CURRENT_ROUND', this.roundThree)
      }
    },
    expandRound: function () {
     this.$refs.roundCardContainer.$el.classList.toggle('expand')
    }
  },

  watch: {
    // current: function () {
    //   this.$store.dispatch('UPDATE_CURRENT_ROUND', this.current.rounds[0])
    // }
  },

  created: function (current) {
    this.$store.dispatch('LOAD_ROUNDS', { id: this.current.id })
      .then(response => {
        this.loading = false
        this.roundComps.push(this.rounds)
      })
  },

  mounted () {
    this.onResize()
  }
}
</script>
<style>
.hide {
  display: none;
}
#round-container {
  margin: 4px 0;
  position: relative;
}
#round-container .open {
  z-index: 9999 !important;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0;
  margin: 0;
  overflow: scroll;
}
.mint-swipe-item .is-active .open {
  margin: 0;
  padding: 0;
}
.mint-swipe-items-wrap>div {
  padding-top: 20px;
  position: relative;
}
.mint-swipe .my-swipe {
  padding-top: 20px;
  color: #fff;
  font-size: 30px;
  text-align: center;
}
.mint-swipe .my-swipe .open {
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
  margin: 0;
}
.rnd1 {
  color: white;
}
.expand {
  top: 0;
  left: 0;
  padding: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
}

</style>

