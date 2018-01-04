<template>
  <v-flex xs12 sm12 lg6 id='leaderboard-container'>
    <v-card flat color="transparent" class="grey--text">
      <v-card-title primary-title>
        <h3>Tournament Stats</h3>
      </v-card-title >
      <!-- <p class="hidden-xs-only">{{ current }}</p> -->
      <v-container fluid pt-0>
        <v-layout>
          <v-flex xs12>
            <v-card class="elevation-20" ref="leaderboardCard">
              <v-card-title fixed :class="currentView" @click="toggleView(currentView)">
                <h5>{{ currentView.split('-')[0].toUpperCase() }}</h5>
                <v-spacer></v-spacer>
                purse $1600
              </v-card-title>
              <transition
                name="fade"
                v-on:enter='enter'
              >
                <!-- <component :is='currentView' :current='current'></component> -->
              </transition>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions class="expand-footer">
        <v-spacer></v-spacer>
        <v-btn flat color="light-blue lighten-1" :class="currentView" value="tourn-money" @click="currentView='money-preview'">
          <span>Money</span>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn flat :class="currentView" value="tourn-stats" @click="currentView='-preview'">
          <span>Course</span>
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
// import MoneyPreview from '../components/TournInfo/MoneyList/Preview'
// import MoneyList from '../components/TournInfo/MoneyList/List'
// import StatsPreview from '../components/TournInfo/Stats/Preview'
// import StatsList from '../components/TournInfo/Stats/List'

import router from 'vue-router'
import { mapState } from 'vuex'
    // MoneyPreview,
    // MoneyList

export default {
  name: 'TournInfo',
  props: ['current'],
  components: {
  },

  data () {
    return {
      el: 'stroke',
      currentView: 'money-preview',

    }
  },

  computed: {
    ...mapState(['currentTournament'])
  },

  methods: {
    toggleView: function (event) {
      // if (event === 'stroke-preview') {
      //   this.$refs.leaderboardCard.$el.classList.toggle('expand')
      //   this.currentView = 'stroke-leaderboard'
      // } else if (event == 'stroke-leaderboard') {
      //   this.$refs.leaderboardCard.$el.classList.toggle('expand')
      //   this.currentView = 'stroke-preview'
      // } else if (event == 'putting-preview') {
      //   this.$refs.leaderboardCard.$el.classList.toggle('expand')
      //   this.currentView = 'putting-leaderboard'
      // } else if (event == 'putting-leaderboard') {
      //   this.$refs.leaderboardCard.$el.classList.toggle('expand')
      //   this.currentView = 'putting-preview'
      // } else if (event == 'skins-preview') {
      //   this.$refs.leaderboardCard.$el.classList.toggle('expand')
      //   this.currentView = 'skins-leaderboard'
      // } else if (event == 'skins-leaderboard') {
      //   this.$refs.leaderboardCard.$el.classList.toggle('expand')
      //   this.currentView = 'skins-preview'
      // } else if (event == 'team-preview') {
      //   this.$refs.leaderboardCard.$el.classList.tournId('expand')
      //   this.currentView = 'team-leaderboard'
      // } else if (event == 'team-leaderboard') {
      //   this.$refs.leaderboardCard.$el.classList.tournId('expand')
      //   this.currentView = 'team-preview'
      // }
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
.team-preview {
  background-color: #ef5350;
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
