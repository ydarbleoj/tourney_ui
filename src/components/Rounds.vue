<template>
  <v-container fluid color="pink">
    <v-layout row wrap>
      <v-card width="100%" flat>
        <v-toolbar flat color="transparent">
          <template v-slot:extension>
            <v-tabs
              v-model="model"
              color=""
              centered
            >
              <v-tabs-slider color="transparent"></v-tabs-slider>
              <v-tab
                v-for="i in items"
                :key="i"
                class="pl-2 pr-2"
              >
                RND {{ i }}
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <v-tabs-items v-model="model">
          <v-tab-item
            v-for="i in roundComps"
            :key="i['id']"
            hide-on-leave
          >
            <course :course="i" />
            <v-spacer class="mt-4 round-spacer"></v-spacer>
            <div id="scorecard-scroll">
              <scorecard :current="current" :roundId="i" v-if="currentRound === i['attributes']['round_number']" />
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-card>

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
      items: ['1', '2', '3'],
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

