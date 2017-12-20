<template>
  <v-flex xs12 sm12 lg6 id='leaderboard-container'>
    <v-card flat color="transparent" class="grey--text">
      <v-card-title primary-title>
        <h3>Leaderboards</h3>
      </v-card-title >
      <!-- <p class="hidden-xs-only">{{ current }}</p> -->
      <v-container fluid pt-0>
        <v-layout>
          <v-flex xs12>
            <v-card class="elevation-20" ref="leaderboardCard">
              <v-card-title fixed :class="currentView" @click="toggleView(currentView)">
                <h5>{{ currentView.split('-')[0].toUpperCase() }}</h5>
                <v-spacer></v-spacer>
                purse $360
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
      <v-card-actions class="expand-footer">
        <v-spacer></v-spacer>
        <v-btn flat color="light-blue lighten-1" :class="currentView" value="stroke" @click="currentView='stroke-preview'">
          <span>Stroke</span>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn flat :class="currentView" value="putting" @click="currentView='putting-preview'">
          <span>Putting</span>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn flat :class="currentView" value="skins" @click="currentView='skins-preview'">
          <span>Skins</span>
        </v-btn>
        <v-spacer></v-spacer>
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
    SkinsLeaderboard
  },

  data () {
    return {
      el: 'stroke',
      currentView: 'stroke-preview',

    }
  },

  computed: {
    ...mapState(['currentTournament'])
  },

  methods: {
    toggleView: function (event) {
      if (event === 'stroke-preview') {
        this.$refs.leaderboardCard.$el.classList.toggle('expand')
        this.currentView = 'stroke-leaderboard'
      } else if (event == 'stroke-leaderboard') {
        this.$refs.leaderboardCard.$el.classList.toggle('expand')
        this.currentView = 'stroke-preview'
      } else if (event == 'putting-preview') {
        this.$refs.leaderboardCard.$el.classList.toggle('expand')
        this.currentView = 'putting-leaderboard'
      } else if (event == 'putting-leaderboard') {
        this.$refs.leaderboardCard.$el.classList.toggle('expand')
        this.currentView = 'putting-preview'
      } else if (event == 'skins-preview') {
        this.$refs.leaderboardCard.$el.classList.toggle('expand')
        this.currentView = 'skins-leaderboard'
      } else if (event == 'skins-leaderboard') {
        this.$refs.leaderboardCard.$el.classList.toggle('expand')
        this.currentView = 'skins-preview'
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
    }
  }

}
</script>
<style>
.putting-preview {
  background-color: #ffa726;
  color: #f1f1f1;
  font-size: 16px;
}
.putting-leaderboard {
  background-color: #ffa726;
  color: #f1f1f1;
  font-size: 16px;
}
.stroke-preview {
  background-color: #62bcfa;
  color: #f1f1f1;
  font-size: 16px;
}
.stroke-leaderboard {
  background-color: #62bcfa;
  color: #f1f1f1;
  font-size: 16px;
}
.skins-preview {
  background-color: #6534ff;
  color: #f1f1f1;
  font-size: 16px;
}
.skins-leaderboard {
  background-color: #6534ff;
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
  position: absolute;
}
.slide-fade-enter-active {
  transition: all .3s ease;
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
