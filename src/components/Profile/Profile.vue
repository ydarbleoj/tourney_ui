<template>
  <v-card flat style="height:100vh;">
    <v-container fluid>
      <v-layout row wrap fill-height align-center style="height:30vh;">
        <v-flex xs6 justify-space-between>
          <div >
            <v-img src="/static/sand.jpg" height="80px" style="width:80px;border-radius:50%;margin:0 auto;"></v-img>
          </div>
        </v-flex>
        <v-flex xs6>
          <v-card-title class="pa-0">
            <h2 class="font-weight-regular align-center">{{ $auth.user().username }}</h2>
          </v-card-title>
          <p class="align-center ma-0">{{ $auth.user().home }}</p>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout row wrap fill-height align-center style="" class="text-xs-center pt-4 pb-4">
        <v-flex xs4>
          <h1 class="font-weight-regular" style="color:#74C9D7">
            {{ hcap_diff }}
          </h1>
          <h5 class="font-weight-regular">Handicap</h5>
          <h5 class="font-weight-regular">Differential</h5>
        </v-flex>
        <v-flex xs4>
          <h1 class="font-weight-regular" style="color:#F8C977">
            {{ net_avg }}
          </h1>
          <h5 class="font-weight-regular">Net</h5>
          <h5 class="font-weight-regular">Average</h5>
        </v-flex>
        <v-flex xs4>
           <h1 class="font-weight-regular" style="color:#F7A072">
            {{ gross_avg }}
          </h1>
          <h5 class="font-weight-regular">Gross</h5>
          <h5 class="font-weight-regular">Average</h5>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout row wrap class="text-xs-center pt-4 pb-4">
        <v-flex xs12 >
          <h4 class="font-weight-regular">Lowest Round</h4>
        </v-flex>
         <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs12 class="text-xs-center">
              <h1 class="font-weight-regular pt-2" style="color:#F7A072;font-size:35px;">{{ total_net }}</h1>
              <h4 class="font-weight-regular">{{ course_name }}
                {{ year }}
              </h4>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <v-divider></v-divider>
    <v-card-actions class="pa-3 text-xs-center align-center">
      <v-layout row wrap fill-height align-center style="" class="text-xs-center pt-4 pb-4">
        <v-flex xs6>
          <div class="text-xs-center">
            <v-btn flat round class="admin--profile_button font-weight-regular" color="white" :to="'tournament'">Bandon</v-btn>
          </div>
        </v-flex>
        <v-flex xs6>
          <div class="text-xs-center">
            <v-btn flat round class="admin--edit_button font-weight-regular" color="white" :to="'/profile/edit/' + this.$auth.user().id">Settings</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Profile',
  props: [],

  data () {
    return {
      userId: this.$auth.user().id,
      isLoaded: false,
      hcap_diff: 0,
      net_avg: 0,
      gross_avg: 0,
      total_net: 0,
      course_name: '',
      year: '',
    }
  },

  computed: {
    ...mapState({
      profileData: state => state.profile.profileData,
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
    logout () {
      this.$auth.logout({
        params: {},
        data: {},
        redirect: '/login'
      })
    },
    loadProfileData () {
      this.hcap_diff = this.profileData.attributes.hcap_diff
      this.net_avg = this.profileData.attributes.net_avg
      this.gross_avg = this.profileData.attributes.gross_avg
      this.total_net = this.profileData.attributes.lowest_round.total_net
      this.course_name = this.profileData.attributes.lowest_round.course_name
      this.year = this.profileData.attributes.lowest_round.year

    }
  },

  created: function () {
    console.log('created profile', this.$auth.user())
    this.$store.dispatch('profile/LOAD_PROFILE_DATA').then((response) => {
      console.log('hith', response)
      if (response) {
        this.loadProfileData()
      }
      this.isLoaded = true
    })
  }
}
</script>
<style>
.admin--delete_button {
  background-color: #F7A072;
  color: #f1f1f1;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}
.admin--delete_button:active {
  top: 1px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}
.admin--edit_button {
  background-color: #F8C977;
  color: #f1f1f1;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}
.admin--edit_button:active {
  top: 1px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}
.admin--profile_button {
  background-color: #74C9D7;
  color: #FBFCFD;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 2s ease, box-shadow 2s ease;
}
.admin--profile_button:active {
  top: 1px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 2s ease, box-shadow 1s ease;
}
</style>