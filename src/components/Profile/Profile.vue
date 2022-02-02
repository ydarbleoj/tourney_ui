<template>
  <v-card flat style="height:100vh;">
    <v-container class="bg">
      <v-layout row wrap class="mb-3">
        <v-flex xs12>
          <image-container
            :name="$auth.user().username"
            :subtext="$auth.user().home"
            :classType="'player-profile'"
          />
        </v-flex>
      </v-layout>
      <v-layout
        row wrap
        align-center
        class="text-xs-center pt-2 pb-4"
      >
        <v-flex xs6>
          <h3 class="font-weight-regular">Appearances</h3>
          <h1 style="color:#666">{{ appearances }}</h1>
        </v-flex>
        <v-flex xs6>
          <h3 class="font-weight-regular">Avg Finish</h3>
          <h1 style="color:#666">{{ average_finish }}</h1>
        </v-flex>
      </v-layout>
      <v-layout
        row wrap
        align-center
        class="text-xs-center pt-2 pb-4 mb-5"
        style="background-color:#666;border-radius: 10px;"
      >
        <v-flex xs12 class="text-xs-left ml-2">
          <h2 class="white--text pl-2 mb-2 font-weight-regular">Notable Stats</h2>
        </v-flex>
        <v-flex xs4>
          <h1 class="font-weight-regular" style="color:#74C9D7">
            {{ hcap_diff }}
          </h1>
          <h4 class="font-weight-medium" style="color:#999">Handicap</h4>
          <h4 class="font-weight-medium" style="color:#999">Differential</h4>
        </v-flex>
        <v-flex xs4>
          <h1 class="font-weight-regular" style="color:#F8C977">
            {{ net_avg }}
          </h1>
          <h4 class="font-weight-medium" style="color:#999">Net</h4>
          <h4 class="font-weight-medium" style="color:#999">Average</h4>
        </v-flex>
        <v-flex xs4>
           <h1 class="font-weight-regular" style="color:#F7A072">
            {{ gross_avg }}
          </h1>
          <h4 class="font-weight-medium" style="color:#999">Gross</h4>
          <h4 class="font-weight-medium" style="color:#999">Average</h4>
        </v-flex>
      </v-layout>
      <v-layout
        row wrap align-center
        class="bx-shadow pa-3 mb-4"
        style="border-radius:25px;"
        @click="toBandon()"
      >
        <v-flex xs6>
          <h1 class="font-weight-medium" style="color:#74C9D7">Bandon</h1>
        </v-flex>
        <v-flex xs6 class="text-xs-right">
          <v-icon color="#666">
            mdi-chevron-right
          </v-icon>
        </v-flex>
      </v-layout>
      <v-layout
        row wrap align-center
        class="bx-shadow pa-3 mb-4"
        style="border-radius:25px;"
         @click="toScorecards()"
      >
         <v-flex xs6>
          <h1 class="font-weight-medium" style="color:#F8C977">Scorecards</h1>
        </v-flex>
        <v-flex xs6 class="text-xs-right">
          <v-icon color="#666">
            mdi-chevron-right
          </v-icon>
        </v-flex>
      </v-layout>
      <v-layout
        row wrap align-center
        class="bx-shadow pa-3 mb-4"
        style="border-radius:25px;"
        @click="toSettings()"
      >
        <v-flex xs6>
          <h1 class="font-weight-medium" style="color:#666">Settings</h1>
        </v-flex>
        <v-flex xs6 class="text-xs-right">
          <v-icon color="#666">
            mdi-chevron-right
          </v-icon>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ImageContainer from './ImageContainer'

export default {
  name: 'Profile',
  components: { ImageContainer },
  data () {
    return {
      dialog: false,
      userId: this.$auth.user().id,
      isLoaded: false,
      hcap_diff: 0,
      net_avg: 0,
      gross_avg: 0,
      total_net: 0,
      course_name: '',
      year: '',
      appearances: 0,
      average_finish: 0
    }
  },

  computed: {
    ...mapState({
      profileData: state => state.profile.profileData,
      userProfile: state => state.profile.userProfile,
      currentTournament: state => state.tournament.currentTournament
    }),
    ...mapGetters({
      getTournament: 'tournament/getTournament'
    })
  },

  methods: {
    fetch() {
      this.$auth.fetch({
        success() {
          console.log('success ' + $auth.user());
        },
        error() {
          console.log('error ' + this.context);
        }
      });
    },
    toScorecards() {
      this.$store.commit("setPageTransition");
      this.$router.push({ name: 'ProfileScorecards' })
    },
    toBandon() {
      this.$store.commit("setPageTransition");
      this.$router.push({
        name: 'Tournament',
        params: {
          id: this.currentTournament.id
        }
      })
    },
    toSettings() {
      this.$store.commit("setPageTransition");
      this.$router.push({
        name: 'ProfileEdit',
        params: {
          id: this.userId
        }
      })
    },
    loadProfileData () {
      if (this.profileData !== null) {
        this.hcap_diff = this.profileData.attributes.hcap_diff
        this.net_avg = this.profileData.attributes.net_avg
        this.gross_avg = this.profileData.attributes.gross_avg
        this.appearances = this.userProfile.appearances
        this.average_finnish = this.userProfile.average_finish
      }
    }
  },

  created: function () {
    this.$store.dispatch('profile/LOAD_PROFILE_DATA').then((response) => {
      if (response) {
        this.loadProfileData()
        this.$store.dispatch('tournament/LOAD_TOURNAMENT_LIST')
          .then(response => {
            this.isLoaded = true
          })
      }
    })
  }
}
</script>
<style>
.bx-shadow {
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
}
</style>
