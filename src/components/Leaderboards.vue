<template>
  <v-container id='leaderboard-container' class="pa-0" ref="leaderboardCard">
    <v-layout row wrap>
      <v-flex xs12 sm12 lg10 ref="leaderboard" style="margin-bottom: 7%;">
        <h2 class="text-xs-left font-weight-regular" style="margin-left: 5%; margin-top: 5%;" v-if="isPreview">Leaderboards</h2>
        <swipe class="my-swipe"
          :auto="0" :show-indicators="false"
          style="padding: 0px 0;"
        >
          <swipe-item
            v-for="i in comps"
            :key="i"
            style="width: 90%;margin: 0 auto"
          >
            <component :is="i" :current='current' @event="previewToggle(this)" />
          </swipe-item>
        </swipe>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Stroke from '../components/Leaderboards/Stroke/index'
import Putting from '../components/Leaderboards/Putting/index'
import { Swipe, SwipeItem } from 'vue-swipe'
import router from 'vue-router'
import { mapState } from 'vuex'

export default {
  name: 'Leaderboards',
  props: ['current'],
  components: {
    Stroke,
    Putting,
    Swipe,
    SwipeItem,
  },

  data: () => ({
    el: 'stroke',
    model: 'tab-stroke',
    swipeDirection: 'None',
    isPreview: true,
    currentView: 'stroke',
    activeButton: 'active',
    inactiveButton: 'inactive',
    purse: 480,
    comps: ['stroke', 'putting'],
    // divHeight: this.$el.getBoundingClientRect().height
  }),

  computed: {
    ...mapState(['currentTournament', 'stroke_leaderboard']),
  },

  mounted: function () {
    console.log('win height', screen.height)
    let height = this.$refs.leaderboardCard.clientHeight
    console.log('height here', height)
  },
  methods: {
    swipe (direction) {
      this.swipeDirection = direction
    },
    previewToggle (event) {
      let height = this.checkHeight();
      let position = this.$el.getBoundingClientRect().height;
      console.log('piosss', position)
      console.log('hgt', height)
      this.isPreview = !this.isPreview
      this.$el.classList.toggle('open')
      this.$el.style.height = this.isPreview ? position : '100%'
    },
    checkHeight () {
      let cardheight = this.$el.getBoundingClientRect().height;
      return cardheight;
    },
    beforeEnter: function(el) {
      el.style.opacity = 0
    },
    enter: function(el) {
      el.style.opacity = 1
    },
    afterEnter: function(el) {
      el.style.opacity = 1
    },
  },

}
</script>
<style >
#leaderboard-container.open {
  z-index: 1000 !important;
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
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
.title-color {
  color: #4ABDAC;
}
.rounded-card {
  border-radius: 20px;
}
#leaderboard-container {
  z-index: 1;
  background-color: white;
  position: relative;
}
small.purse-color {
  color: #666;
}
.no-back {
  background-color: transparent;
}
.team-preview, .team-leaderboard {
  background-color: #f44336;
  color: #f1f1f1;
  font-size: 16px;
}
.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  transition: all .0s;
  opacity: 0;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translate(200px);
  opacity: 0;
}

</style>
