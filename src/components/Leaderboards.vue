<template>
  <v-flex xs12 id='leaderboard-container'>
    <v-card flat color="transparent" class="grey--text" ref="leaderboardContainer">
      <v-card-title primary-title>
        <h3>Leaderboards</h3>
      </v-card-title >
      <v-container fluid pt-0>
        <v-layout>
          <v-flex xs12>
            <v-card class="elevation-20" ref="leaderboardCard">
              <v-card-title fixed :class="currentView" @click="toggleView(currentView)">
                <h4>{{ currentView.split('-')[0].toUpperCase() }}
                  <v-icon color='blue-grey darken-1'>launch</v-icon>
                </h4>
                <v-spacer></v-spacer>
                <p>Purse 360</p>
              </v-card-title>
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
      <v-card-actions class="expand-footer ma-0">
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
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import StrokePreview from '../components/Leaderboards/Stroke/Preview'
import StrokeLeaderboard from '../components/Leaderboards/Stroke/Full'
import PuttingPreview from '../components/Leaderboards/Putting/Preview'
import PuttingLeaderboard from '../components/Leaderboards/Putting/Full'
import SkinsPreview from '../components/Leaderboards/Skins/Preview'
import SkinsLeaderboard from '../components/Leaderboards/Skins/Full'
import TeamPreview from '../components/Leaderboards/Team/Preview'
import TeamLeaderboard from '../components/Leaderboards/Team/List'

import router from 'vue-router'
import { mapState } from 'vuex'

export default {
  name: 'Leaderboards',
  props: ['current'],
  components: {
    StrokePreview,
    StrokeLeaderboard,
    PuttingPreview,
    PuttingLeaderboard,
    SkinsPreview,
    SkinsLeaderboard,
    TeamPreview,
    TeamLeaderboard
  },

  data () {
    return {
      el: 'stroke',
      currentView: 'stroke-preview',
      activeButton: 'active',
      inactiveButton: 'inactive'

    }
  },

  computed: {
    ...mapState(['currentTournament'])
  },

  methods: {
    toggleView: function (event) {
      if (event === 'stroke-preview') {
        this.$refs.leaderboardCard.$el.classList.toggle('expand')
        this.$refs.leaderboardContainer.$el.classList.toggle('expand')
        this.currentView = 'stroke-leaderboard'
      } else if (event == 'stroke-leaderboard') {
        this.$refs.leaderboardCard.$el.classList.toggle('expand')
        this.$refs.leaderboardContainer.$el.classList.toggle('expand')
        this.currentView = 'stroke-preview'
      } else if (event == 'putting-preview') {
        this.$refs.leaderboardCard.$el.classList.toggle('expand')
        this.$refs.leaderboardContainer.$el.classList.toggle('expand')
        this.currentView = 'putting-leaderboard'
      } else if (event == 'putting-leaderboard') {
        this.$refs.leaderboardCard.$el.classList.toggle('expand')
        this.$refs.leaderboardContainer.$el.classList.toggle('expand')
        this.currentView = 'putting-preview'
      } else if (event == 'skins-preview') {
        this.$refs.leaderboardCard.$el.classList.toggle('expand')
        this.$refs.leaderboardContainer.$el.classList.toggle('expand')
        this.currentView = 'skins-leaderboard'
      } else if (event == 'skins-leaderboard') {
        this.$refs.leaderboardCard.$el.classList.toggle('expand')
        this.$refs.leaderboardContainer.$el.classList.toggle('expand')
        this.currentView = 'skins-preview'
      } else if (event == 'team-preview') {
        this.$refs.leaderboardCard.$el.classList.toggle('expand')
        this.$refs.leaderboardContainer.$el.classList.toggle('expand')
        this.currentView = 'team-leaderboard'
      } else if (event == 'team-leaderboard') {
        this.$refs.leaderboardCard.$el.classList.toggle('expand')
        this.$refs.leaderboardContainer.$el.classList.toggle('expand')
        this.currentView = 'team-preview'
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
    expandParent: function() {
      this.$parent.$el.style.width = '100%';
      this.$parent.$el.style.position = 'fixed';
    }
  }

}
</script>
<style>
.no-back {
  background-color: transparent;
}
.putting-preview, .putting-leaderboard {
  background-color: #ffa726;
  font-size: 16px;
}
.stroke-preview, .stroke-leaderboard {
  background-color: #62bcfa;
  color: #f1f1f1;
  font-size: 16px;
}
.skins-preview, .skins-leaderboard {
  background-color: #6534ff;
  color: #f1f1f1;
  font-size: 16px;
}
.team-preview, .team-leaderboard {
  background-color: #f44336;
  color: #f1f1f1;
  font-size: 16px;
}
.expand {
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
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
