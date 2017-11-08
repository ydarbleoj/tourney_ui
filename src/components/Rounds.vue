<template>
  <v-flex xs12 sm12 lg6>
    <v-card flat color="transparent" class="grey--text">
      <v-card-title primary-title>
        <h5>Round Info</h5>
      </v-card-title >
      <v-container fluid grid-list-lg class="transparent">
        <v-layout row wrap>
          <v-flex lg12>
            <v-card>
              <v-card-actions class="grey lighten-4">
                <v-spacer></v-spacer>
                <v-btn flat>
                  <span>Round 1</span>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn flat>
                  <span>Round 2</span>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn flat>
                  <span>Round 3</span>
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
              <v-card-media
                src="/static/trails.jpg"
                height='200px'
              >
              <v-card-title primary-title>
                <div>
                  <div class="headline white--text">Bandon Trails</div>
                  <div class="subheading white--text">Round One</div>
                </div>
              </v-card-title>
              </v-card-media>
            </v-card>
          </v-flex>
          <v-flex xs8 sm9>
            <v-card>
              <v-card-media
                src="/static/trails.jpg"
                height='200px'
              >
              <v-card-title primary-title>
                <div>
                  <div class="headline white--text">Bandon Trails</div>
                  <div class="subheading white--text">Round One</div>
                </div>
              </v-card-title>
              </v-card-media>
            </v-card>
          </v-flex>
          <v-flex xs4 sm3>
            <v-card height='200px' class="light-green lighten-2">
              <v-card-title primary-title >
                <div>
                  <div class="white--text">Scorecard</div>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
import TournamentCourses from '../components/TournamentCourses'
import { mapState } from 'vuex'

export default {
  name: 'Rounds',
  props: ['current'],
  components: {
    TournamentCourses
  },

  data () {
    return {
      currentView: '',
      courseImage: '/static/Bandon-Trails.jpg'
    }
  },

  computed: {
    ...mapState(['currentTournament'])
  },

  beforeUpdate (current) {
  },

  mounted: function (current) {
  }
}