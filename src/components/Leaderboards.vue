<template>
  <v-flex xs12 sm12 lg10 id='leaderboard-container' ref="leaderboard">
    <v-card flat color="transparent" class="grey--text" ref="leaderboardContainer">
      <v-card-title primary-title>
        <h3>Leaderboards</h3>
      </v-card-title >
      <v-container fluid pt-4>
        <v-layout>
          <v-flex xs12>
            <component :is='currentView' :current='current'></component>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
import Stroke from '../components/Leaderboards/Stroke/index'
import Putting from '../components/Leaderboards/Putting/index'

// import PuttingPreview from '../components/Leaderboards/Putting/Preview'
// import PuttingPreviewHeader from '../components/Leaderboards/Putting/PreviewHeader'
// import PuttingLeaderboard from '../components/Leaderboards/Putting/Full'
// import PuttingLeaderboardHeader from '../components/Leaderboards/Putting/FullHeader'
// import SkinsPreview from '../components/Leaderboards/Skins/Preview'
// import SkinsPreviewHeader from '../components/Leaderboards/Skins/PreviewHeader'
// import SkinsLeaderboard from '../components/Leaderboards/Skins/Full'
// import SkinsLeaderboardHeader from '../components/Leaderboards/Skins/FullHeader'
// import TeamPreview from '../components/Leaderboards/Team/Preview'
// import TeamPreviewHeader from '../components/Leaderboards/Team/PreviewHeader'
// import TeamLeaderboard from '../components/Leaderboards/Team/List'
// import TeamLeaderboardHeader from '../components/Leaderboards/Team/FullHeader'
import router from 'vue-router'
import { mapState } from 'vuex'

export default {
  name: 'Leaderboards',
  props: ['current'],
  components: {
    Stroke,
    Putting
  },

  data () {
    return {
      el: 'stroke',
      currentView: 'putting',
      activeButton: 'active',
      inactiveButton: 'inactive',
      purse: 480

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
