<template>
  <v-flex xs12 sm12 lg10 id='leaderboard-container' ref="leaderboard">
    <v-card flat color="transparent" class="grey--text" ref="leaderboardContainer">
      <v-card-title primary-title class="pb-0">
        <h3>Leaderboards</h3>
      </v-card-title >
      <vue-glide class="slide-wrapper" style="width: 900px;">
        <vue-glide-slide
          v-for="i in comps"
          :key="i"
          ref="slide"
          class="preview__size"
          style="margin-right: 1%; margin-left: 1%; height: 550px;"
        >
          <v-layout justify-center>
            <v-flex xs12>
              <component :is="i" :current='current' style="width: 100%;" />
            </v-flex>
          </v-layout>
        </vue-glide-slide>
      </vue-glide>
    </v-card>
  </v-flex>
</template>

<script>
import Stroke from '../components/Leaderboards/Stroke/index'
import Putting from '../components/Leaderboards/Putting/index'
import VueGlide from 'vue-glide-js/src/components/Glide.vue'
import VueGlideSlide from 'vue-glide-js/src/components/GlideSlide.vue'

import router from 'vue-router'
import { mapState } from 'vuex'

export default {
  name: 'Leaderboards',
  props: ['current'],
  components: {
    [VueGlide.name]: VueGlide,
    [VueGlideSlide.name]: VueGlideSlide,
    Stroke,
    Putting,
  },

  data () {
    return {
      el: 'stroke',
      isPreview: true,
      currentView: 'stroke',
      activeButton: 'active',
      inactiveButton: 'inactive',
      purse: 480,
      comps: ['stroke', 'putting', 'stroke']

    }
  },

  computed: {
    ...mapState(['currentTournament', 'stroke_leaderboard']),
  },

  methods: {
    expandParent: function(event) {
      console.log('heioght', event.leaderboardContainer.$el.style.zIndex)
      event.leaderboard.style.position = 'fixed';
      event.leaderboard.style.backgroundColor = '#f1f1f1';
      event.leaderboard.style.width = '100%';
      event.leaderboard.style.left = '0';
      event.leaderboard.style.top = '0';
      event.leaderboard.style.height = '100%';
      event.leaderboard.style.overflow = 'hidden';
      event.leaderboard.style.zIndex = '8888';
      event.leaderboardContainer.$el.style.height = '100%';
      event.leaderboardContainer.$el.style.zIndex = '7777';
    },
    closeParent: function (event) {
      event.leaderboardContainer.$el.style.cssText = null;
      event.leaderboard.style.cssText = null;
    },
    toggleView: function (event) {
      if (event === 'stroke-preview') {
        this.$refs.leaderboardCard.$el.classList.toggle('expand-leaderboard')
        this.$refs.leaderboardContainer.$el.classList.toggle('expand-container')
        this.expandParent(this.$refs)
      } else if (event == 'stroke-leaderboard') {
        this.$refs.leaderboardCard.$el.classList.toggle('expand-leaderboard')
        this.$refs.leaderboardContainer.$el.classList.toggle('expand-container')
        this.closeParent(this.$refs)
      } else if (event == 'putting-preview') {
        this.$refs.leaderboardCard.$el.classList.toggle('expand-leaderboard')
        this.$refs.leaderboardContainer.$el.classList.toggle('expand-container')
        this.expandParent(this.$refs)
      } else if (event == 'putting-leaderboard') {
        this.$refs.leaderboardCard.$el.classList.toggle('expand-leaderboard')
        this.$refs.leaderboardContainer.$el.classList.toggle('expand-container')
        this.closeParent(this.$refs)
      } else if (event == 'skins-preview') {
        this.$refs.leaderboardCard.$el.classList.toggle('expand-leaderboard')
        this.$refs.leaderboardContainer.$el.classList.toggle('expand-container')
        this.currentView = 'skins-leaderboard'
        this.expandParent(this.$refs)
      } else if (event == 'skins-leaderboard') {
        this.$refs.leaderboardCard.$el.classList.toggle('expand-leaderboard')
        this.$refs.leaderboardContainer.$el.classList.toggle('expand-container')
        this.currentView = 'skins-preview'
        this.closeParent(this.$refs)
      } else if (event == 'team-preview') {
        this.$refs.leaderboardCard.$el.classList.toggle('expand-leaderboard')
        this.$refs.leaderboardContainer.$el.classList.toggle('expand-container')
        this.currentView = 'team-leaderboard'
        this.expandParent(this.$refs)
      } else if (event == 'team-leaderboard') {
        this.$refs.leaderboardCard.$el.classList.toggle('expand-leaderboard')
        this.$refs.leaderboardContainer.$el.classList.toggle('expand-container')
        this.currentView = 'team-preview'
        this.closeParent(this.$refs)
      }
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
<style>
.glide__track {
  margin: 0;
}
.slide-wrapper {
  height: inherit;
}
ul.glide__slides {
  padding: 20px 0;
}
.preview__size {
  width: 305px;
}
.rounded-card {
  border-radius: 9px;
}
#leaderboard-container {
  background-color: white;
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
.expand-container {
  top: 0;
  left: 0;
  padding: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  overflow:  scroll;
}
.expand-leaderboard {
  top: 0;
  left: 0;
  padding: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  overflow:  scroll;
  position: absolute;
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
