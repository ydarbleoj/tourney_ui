<template>
  <v-card flat class="mb-5">
    <v-container class="bg">
      <v-layout row>
        <v-flex xs12 class="text-xs-center white--text">
          <h1 style="font-weight:300;">BANDON</h1>
        </v-flex>
      </v-layout>
      <v-layout row mt-3>
        <v-flex xs12>
          <h1 class="white--text text-xs-center">Services</h1>
        </v-flex>
      </v-layout>
    </v-container>
    <PlayerList />
    <BottomNavigation :view="'services'" />
  </v-card>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import PlayerList from './PlayerList'
import BottomNavigation from '../BottomNavigation'

export default {
  name: 'AdminServicePage',
  components: {
    BottomNavigation,
    PlayerList,
  },
  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament
    }),
  },

  data () {
    return {
      view: 'services',
      loading: true,
      userAdmin: false,
    }
  },
  methods: {
  },

  mounted () {
  }

}

</script>
<style scoped>
nav.v-toolbar div.v-toolbar__content {
  padding: 0;
}
a {
  color: black;
  text-decoration: none;
}
.tournament-wrapper {
  overflow:hidden;
  background-color: white;
}
.bg {
  background-color: #666;
}
</style>
