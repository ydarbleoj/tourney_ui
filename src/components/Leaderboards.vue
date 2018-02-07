<template>
  <v-flex xs12 sm12 lg10 id='leaderboard-container' ref="leaderboard">
    <v-card flat color="transparent" class="grey--text" ref="leaderboardContainer">
      <v-card-title primary-title>
        <h3>Leaderboards</h3>
      </v-card-title >
      <v-container fluid pt-0>
        <v-layout>
          <v-flex xs12>
            <v-card class="elevation-20" ref="leaderboardCard">

              <component :is="currentView + 'Header'" :current="current" @event="toggleView"/>

              <transition
                name="fade"
                v-on:enter='enter'
              >
                <component :is='currentView' :current='current'></component>
              </transition>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions class="">
        <v-spacer></v-spacer>
        <v-btn flat class="grey--text no-back ma-0" value="stroke" @click="currentView='stroke-preview'">
          <span>Stroke</span>
        </v-btn>
        <v-btn flat class="grey--text no-back ma-0" value="putting" @click="currentView='putting-preview'">
          <span>Putting</span>
        </v-btn>
        <v-btn flat class="grey--text no-back ma-0" value="skins" @click="currentView='skins-preview'">
          <span>Skins</span>
        </v-btn>
        <v-btn flat class="grey--text no-back ma-0" value="team" @click="currentView='team-preview'">
          <span>Team</span>
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import StrokePreview from '../components/Leaderboards/Stroke/Preview'
import StrokePreviewHeader from '../components/Leaderboards/Stroke/PreviewHeader'
import StrokeLeaderboard from '../components/Leaderboards/Stroke/Full'
import StrokeLeaderboardHeader from '../components/Leaderboards/Stroke/FullHeader'
import PuttingPreview from '../components/Leaderboards/Putting/Preview'
import PuttingPreviewHeader from '../components/Leaderboards/Putting/PreviewHeader'
import PuttingLeaderboard from '../components/Leaderboards/Putting/Full'
import PuttingLeaderboardHeader from '../components/Leaderboards/Putting/FullHeader'
import SkinsPreview from '../components/Leaderboards/Skins/Preview'
import SkinsPreviewHeader from '../components/Leaderboards/Skins/PreviewHeader'
import SkinsLeaderboard from '../components/Leaderboards/Skins/Full'
import SkinsLeaderboardHeader from '../components/Leaderboards/Skins/FullHeader'
import TeamPreview from '../components/Leaderboards/Team/Preview'
import TeamPreviewHeader from '../components/Leaderboards/Team/PreviewHeader'
import TeamLeaderboard from '../components/Leaderboards/Team/List'
import TeamLeaderboardHeader from '../components/Leaderboards/Team/FullHeader'
import router from 'vue-router'
import { mapState } from 'vuex'

export default {
  name: 'Leaderboards',
  props: ['current'],
  components: {
    StrokePreview,
    StrokeLeaderboard,
    StrokeLeaderboardHeader,
    StrokePreviewHeader,
    PuttingPreview,
    PuttingPreviewHeader,
    PuttingLeaderboard,
    PuttingLeaderboardHeader,
    SkinsPreview,
    SkinsPreviewHeader,
    SkinsLeaderboard,
    SkinsLeaderboardHeader,
    TeamPreview,
    TeamPreviewHeader,
    TeamLeaderboard,
    TeamLeaderboardHeader
  },

  data () {
    return {
      el: 'stroke',
      currentView: 'stroke-preview',
      currentHeader: 'stroke-preview-header',
      activeButton: 'active',
      inactiveButton: 'inactive',
      purse: 480

    }
  },

  computed: {
    ...mapState(['currentTournament'])
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
        this.currentView = 'stroke-leaderboard'
        this.currentHeader = 'stroke-full-header'
        this.expandParent(this.$refs)
      } else if (event == 'stroke-leaderboard') {
        this.$refs.leaderboardCard.$el.classList.toggle('expand-leaderboard')
        this.$refs.leaderboardContainer.$el.classList.toggle('expand-container')
        this.currentView = 'stroke-preview'
        this.currentHeader = 'stroke-preview-header'
        this.closeParent(this.$refs)
      } else if (event == 'putting-preview') {
        this.$refs.leaderboardCard.$el.classList.toggle('expand-leaderboard')
        this.$refs.leaderboardContainer.$el.classList.toggle('expand-container')
        this.currentView = 'putting-leaderboard'
        this.currentHeader = 'putting-full-header'
        this.expandParent(this.$refs)
      } else if (event == 'putting-leaderboard') {
        this.$refs.leaderboardCard.$el.classList.toggle('expand-leaderboard')
        this.$refs.leaderboardContainer.$el.classList.toggle('expand-container')
        this.currentView = 'putting-preview'
        this.currentHeader = 'putting-preview-header'
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
  }

}
</script>
<style>
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
