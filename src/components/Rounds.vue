<template>
  <v-container id="round-container" class="pa-0" ref="roundCardContainer">
    <v-layout row wrap>
      <v-flex xs12 sm12 lg12>
        <h2 class="text-xs-left font-weight-regular pl-0 mb-3" style="margin-left: 5%;" v-if="isPreview">Round Info</h2>
        <v-tabs
          v-model="model"
          color="transparent"
          centered
          v-if="isLoaded"
          height="0px"
           v-touch="{
            left: () => swipe('Left'),
            right: () => swipe('Right'),
          }"
        >
          <v-tab-item
            v-for="i in roundComps"
            :key="i['id']"
            style="width: 90vw;margin: 0 auto;"
          >
            <course :course="i"  @event="courseToggle(this)" />
            <v-spacer class="mt-4 round-spacer"></v-spacer>
            <div id="scorecard-scroll">
              <scorecard :current="current" :roundId="i" @open="isOpen" v-if="currentRound === i['attributes']['round_number']" />
            </div>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Course from '../components/Course/index'
import Scorecard from '../components/Scorecard/index'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Rounds',
  props: ['current'],
  components: {
    Course,
    Scorecard,
  },

  data () {
    return {
      isLoaded: false,
      isPreview: true,
      swipeDirection: 'None',
      rndNum: 1,
      model: 'tab-stroke',
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
    origPosition (card) {
      let position = {
        top: card.getBoundingClientRect().top,
        left: card.getBoundingClientRect().left,
        bottom: card.getBoundingClientRect().bottom,
        scbottom: screen.bottom,
      }
      this.cardPos = Object.assign(position);
    },
    onResize () {
      this.windowSize = { x: this.$el.innerWidth, y: this.$el.innerHeight }
    },
    isOpen () {
      this.courseToggle(this)
    },
    swipe (direction) {
      let rnd = this.currentRound
      if (direction != 'Left' && rnd == 1) return
      let num = direction == 'Left' ? rnd + 1 : rnd - 1
      this.swipeDirection = direction
      this.updateRound(num)
    },
    updateRound (num) {
      this.$store.commit('SET_CURRENT_ROUND',{ list: num })
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
      card.style.minHeight = isPrev ? '' : '100vh';
      card.style.top = isPrev ? '' : 0;
      card.style.padding = isPrev ? '16px 0' : '0';
      card.style.margin = isPrev ? '4px 0' : '0';
      card.style.left = isPrev ? '' : 0;
      document.getElementsByClassName('round-spacer')[0].classList.toggle('hide')
    },
    options () {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing
      }
    },
  },

  watch: {
    current: function () {
      this.roundComps = []
      this.$store.dispatch('LOAD_ROUNDS', { id: this.current.id })
        .then(response => {
          this.loading = false
          this.roundComps = this.rounds
        })
    }
  },

  created: function (current) {
    this.$store.dispatch('LOAD_ROUNDS', { id: this.current.id })
      .then(response => {
        this.isLoaded = true
        this.roundComps = this.rounds
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
.open {
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 1000;
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
.slide-enter-active, .slide-leave-active {
  transition: all .8s ease-out;
}

.slide-enter, .slide-leave-to {
  transition: all .8s ease-out;
}

.slide-enter-to, .slide-leave {
  transition: all .8s ease-out;
}

</style>

