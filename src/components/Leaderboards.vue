<template>
  <v-container id='leaderboard-container' class="pa-0" ma0>
    <v-layout row>
      <v-flex xs12 ref="leaderboard" >
        <h2 class="text-xs-left font-weight-regular" style="margin: 5% 0 5% 5%;">Leaderboards</h2>
        <v-container transition="slide-x-reverse-transition">
          <v-layout row>
            <v-flex xs6 ma-2>
              <v-layout column>
                <stroke-button :current="current" />

                <v-divider class="mt-2 mb-2" style="opacity:0;"></v-divider>

                <skins-button :current="current" />
              </v-layout>
            </v-flex>
            <v-flex xs6 ma-2>
              <v-layout column>
                <putting-button :current="current" />

                <v-divider class="mt-2 mb-2" style="opacity:0;"></v-divider>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import StrokeButton from '../components/Leaderboards/Stroke/Button'
import SkinsButton from '../components/Leaderboards/Skins/Button'
import Team from '../components/Leaderboards/Team/index'
import PuttingButton from '../components/Leaderboards/Putting/Button'
import router from 'vue-router'
import { mapState } from 'vuex'

export default {
  name: 'Leaderboards',
  props: ['current'],
  components: {
    StrokeButton,
    PuttingButton,
    SkinsButton,
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
  },
  methods: {
    previewToggle (event) {
      this.isPreview = !this.isPreview
      this.$el.classList.toggle('open')
    }
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
.title-color {
  color: #4ABDAC;
}
.rounded-card {
  border-radius: 20px;
}
#leaderboard-container {
  z-index: 1;
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
/* .slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
} */
</style>
