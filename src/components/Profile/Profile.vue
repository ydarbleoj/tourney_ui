<template>
 <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media src="/static/sand.jpg" height="300px">
          <v-layout column class="media">
            <v-card-title>
              <v-spacer></v-spacer>
              <!-- <v-btn dark icon class="mr-3"> -->
                <router-link :to="'/profile/edit/' + this.$auth.user().id"><v-icon color="white">edit</v-icon></router-link>
              <!-- </v-btn> -->
              <v-menu
                origin="center center"
                transition="scale-transition"
                bottom
              >
                <v-btn icon slot="activator" light>
                  <v-icon color='blue-grey darken-1'>more_vert</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile>
                    <v-list-tile-title>
                      <router-link :to="'home'">Home</router-link>
                    </v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title>
                      <a v-on:click="logout()" href="javascript:void(0);">logout</a>
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card-title class="white--text pl-1 pt-5">
              <div class="display-1 pl-5 pt-5">{{ this.$auth.user().username }}</div>
            </v-card-title>
          </v-layout>
        </v-card-media>
        <v-list two-line>
          <v-list-tile @click="">
            <v-list-tile-action>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ this.$auth.user().handicap }}</v-list-tile-title>
              <v-list-tile-sub-title>Handicap</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="orange">location_on</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ this.$auth.user().home }}</v-list-tile-title>
              <v-list-tile-sub-title>Home</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        <v-divider inset></v-divider>
          <v-list-tile @click="" :to="'tournaments'">
            <v-list-tile-action>
              <v-icon color="blue">dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Bandon</v-list-tile-title>
              <v-list-tile-sub-title></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Profile',
  props: [],

  data () {
    return {
      userId: this.$auth.user().id
    }
  },

  components: {
  },

  computed: {
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
    }
  },


  created: function () {
    // console.log('userid', this.data.userId)
  }
}
</script>
