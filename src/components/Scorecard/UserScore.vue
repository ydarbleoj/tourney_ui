<template>
  <v-container class="pa-0" fluid>
    <v-toolbar flat dark color="primary" extended>
      <div class='headline'>Score Hole {{ this.cardData.number}} </div>
      <v-toolbar-title class="white--text" slot="extension">Shots</v-toolbar-title>
      <v-toolbar-title class="white--text" slot="extension">Putts</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-layout row wrap white>
      <v-flex xs6>
        <v-card flat>
          lskdf;lksd
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card flat>
          lskdf;lksd
        </v-card>
      </v-flex>
    </v-layout>
    <v-footer color="primary" fixed class="pa-0">
      <v-btn dark icon :to="{name: 'Scorecard', params: {tournId: this.tournId, scorecardId: this.cardData.scorecard_id }}">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <span class="white--text">Scorecard</span>
    </v-footer>
  </v-container>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
// import scoreList from './scoreList'

export default {
  name: 'UserScore',
  components: {
  },

  computed: {
    ...mapState([
      'UserScore',
    ]),
    ...mapGetters([
      'score',
      'scorecard'
    ])
  },

  data () {
    return {
      cardData: this.$route.params['user_sc'],
      tournId: this.$route.params.tournamentId,
      scores: [
        { name: '', }
      ]
    }
  },

  beforeUpdate: function() {
    console.log('before', this.scoreList)
  },

  beforeMount: function () {
    console.log('here', this.$route.params)
    // this.$store.dispatch('LOAD_SCORECARD', { tournId: this.$route.params.tournId, id: this.$route.params.scorecardId })
  }
}
</script>
<style>

</style>
