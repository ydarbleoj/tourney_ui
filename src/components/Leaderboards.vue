<template>
  <v-container id='leaderboard-container' class="pa-0 pb-3" ref="leaderboardCard">
    <v-layout row>
      <v-flex xs12 ref="leaderboard" >
        <h2 class="text-xs-left font-weight-regular" style="margin: 5% 0 5% 5%;" v-if="isPreview">Leaderboards</h2>
        <v-tabs
          v-model="model"
          color="transparent"
          centered
          height="0px"
           v-touch="{
            left: () => swipe('Left'),
            right: () => swipe('Right'),
          }"
        >
          <v-tab-item
            v-for="i in comps"
            :key="i"
            style="width: 90vw;margin: 0 auto;"
          >
            <transition name="slide-fade" duration="{ enter: 500, leave: 800 }">
              <component :is="i" :current='current' @event="previewToggle(this)" />
            </transition>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Stroke from '../components/Leaderboards/Stroke/index'
import Skins from '../components/Leaderboards/Skins/index'
import Team from '../components/Leaderboards/Team/index'
import Putting from '../components/Leaderboards/Putting/index'
import router from 'vue-router'
import { mapState } from 'vuex'

export default {
  name: 'Leaderboards',
  props: ['current'],
  components: {
    Stroke,
    Putting,
    Skins,
    Team
  },

  data (){
    return {
      el: 'stroke',
      model: 'tab-stroke',
      swipeDirection: 'None',
      isPreview: true,
      currentView: 'stroke',
      activeButton: 'active',
      inactiveButton: 'inactive',
      comps: ['stroke', 'putting', 'skins', 'team'],
    }
  },

  computed: {
    ...mapState(['currentTournament']),
  },

  mounted: function () {
    console.log('leadeboard', this.current)
  },
  methods: {
    previewToggle (event) {
      this.isPreview = !this.isPreview
      this.$el.classList.toggle('open')
    },
    swipe (direction) {
      console.log('swiping', direction)
      this.swipeDirection = direction
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
.v-tabs__items {
  overflow: visible;
}
.hide {
  display: none;
}
#leaderboard-container.open {
  z-index: 1000 !important;
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow:hidden;
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
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
