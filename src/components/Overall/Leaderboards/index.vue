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
                  :current="fauxCurrent"
                  :title="'Stroke Overall'"
                  :leaderboard="getStrokePreview"
                  :link="'StrokeOverallLeaderboard'"
                  :position="'stroke_position'"
                  :total="'total_stroke_wins'"
                />
                <v-divider class="mt-2 mb-2" style="opacity:0;"></v-divider>
                <preview-button
                  :current="fauxCurrent"
                  :title="'Skins Overall'"
                  :leaderboard="getSkinsPreview"
                  :link="'SkinsOverallLeaderboard'"
                  :position="'skins_position'"
                  :total="'total_skins'"
                />
              </v-layout>
            </v-flex>
            <v-flex xs6 ma-2>
              <v-layout column>
                <preview-button
                  :current="fauxCurrent"
                  :title="'Putting Overall'"
                  :leaderboard="getPuttingPreview"
                  :link="'PuttingOverallLeaderboard'"
                  :position="'putting_position'"
                  :total="'total_putting_wins'"
                />
                <v-divider class="mt-2 mb-2" style="opacity:0;"></v-divider>
                <preview-button
                  :current="fauxCurrent"
                  :title="'Team Overall'"
                  :leaderboard="getTeamPreview"
                  :link="'TeamOverallLeaderboard'"
                  :position="'team_position'"
                  :total="'total_team_wins'"
                />
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout row wrap mt-4>
            <v-flex xs12>
              <preview-button
                :current="fauxCurrent"
                :title="'Money List'"
                :leaderboard="getMoneyPreview"
                :link="'OverallMoneyList'"
                :position="'money_position'"
                :total="'total_money'"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PreviewButton from '../../Leaderboards/PreviewButton'
import router from 'vue-router'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'OverallLeaderboards',
  props: ['current'],
  components: {
    PreviewButton
  },

  data (){
    return {
      fauxCurrent: {},
      swipeDirection: 'None',
      isPreview: true,
      isLoading: true,
      activeButton: 'active',
      inactiveButton: 'inactive',
    }
  },

  computed: {
    ...mapState({}),
    ...mapGetters({
      getStrokePreview: 'leaderboards/overall/getStrokePreview',
      getPuttingPreview: 'leaderboards/overall/getPuttingPreview',
      getSkinsPreview: 'leaderboards/overall/getSkinsPreview',
      getTeamPreview: 'leaderboards/overall/getTeamPreview',
      getMoneyPreview: 'leaderboards/overall/getMoneyPreview',
    })
  },

  methods: {},

  created () {
    this.$store.dispatch(
      'leaderboards/overall/LOAD_PREVIEW_LEADERBOARD'
    ).then(() => {
      this.isLoading = false
      this.fauxCurrent = { id: 1 }
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
