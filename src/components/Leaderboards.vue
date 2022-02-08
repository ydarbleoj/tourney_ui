<template>
  <v-container id='leaderboard-container' style="min-height:30vh" class="pa-0" ma0>
    <v-layout row wrap mt-4>
      <v-flex xs12>
        <h2 class="font-weight-regular text-xs-left pl-4 ml-2">Leaderboards</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 ref="leaderboard" >
        <v-container v-if="!isLoading" >
          <v-layout row>
            <v-flex xs6 ma-2>
              <v-layout column>
                <preview-button
                  :current="current"
                  :title="'Stroke'"
                  :leaderboard="getStrokePreview"
                  :link="'StrokeLeaderboard'"
                  :position="'stroke_position'"
                  :total="'total_score'"
                />
                <v-divider class="mt-2 mb-2" style="opacity:0;"></v-divider>
                <preview-button
                  :current="current"
                  :title="'Skins'"
                  :leaderboard="getSkinsPreview"
                  :link="'SkinsLeaderboard'"
                  :position="'count'"
                  :total="'skins_total'"
                />
              </v-layout>
            </v-flex>
            <v-flex xs6 ma-2>
              <v-layout column>
                <preview-button
                  :current="current"
                  :title="'Putting'"
                  :leaderboard="getPuttingPreview"
                  :link="'PuttingLeaderboard'"
                  :position="'putting_position'"
                  :total="'total_putts'"
                />
                <v-divider class="mt-2 mb-2" style="opacity:0;"></v-divider>
                <preview-button
                  :current="current"
                  :title="'Team'"
                  :leaderboard="getTeamPreview"
                  :link="'TeamLeaderboard'"
                  :position="'team_position'"
                  :total="'team_wins_total'"
                />
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PreviewButton from '../components/Leaderboards/PreviewButton'
import Team from '../components/Leaderboards/Team/index'
import router from 'vue-router'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Leaderboards',
  props: ['current'],
  components: {
    PreviewButton,
    Team
  },

  data (){
    return {
      swipeDirection: 'None',
      isPreview: true,
      isLoading: true,
      activeButton: 'active',
      inactiveButton: 'inactive',
    }
  },

  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament,
      leaderboardsPreview: state => state.leaderboards.leaderboardsPreview
    }),
    ...mapGetters({
      getStrokePreview: 'leaderboards/getStrokePreview',
      getPuttingPreview: 'leaderboards/getPuttingPreview',
      getSkinsPreview: 'leaderboards/getSkinsPreview',
      getTeamPreview: 'leaderboards/getTeamPreview'
    })
  },

  methods: {},

  created () {
    this.$store.dispatch(
      'leaderboards/LOAD_PREVIEW_LEADERBOARD',
      { id: this.current.id }
    ).then(() => {
      this.isLoading = false
    })
  }
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
