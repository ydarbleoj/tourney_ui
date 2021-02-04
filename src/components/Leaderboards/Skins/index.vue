<template>
  <v-card
    class="skins-lb-card"
  >
    <v-card-title class="skins--title pa-0 pt-2 pl-2">
      <Header :purse="skinsPurse" :name="'Skins'" />
    </v-card-title>
    <v-card-text v-if="!isloading" class="pa-0">
      <skins-table />
    </v-card-text>
  </v-card>
</template>
<script>


import { mapState, mapGetters } from 'vuex'
import SkinsTable from './Table'
import Header from '../Header'

export default {
  name: 'index',
  props: ['current'],
  components: {
    SkinsTable,
    Header
  },
  data () {
    return {
      skinsPurse: 0,
      isloading: true,
    }
  },

  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament
    })
  },
  watch: {
    current: function () {
      this.$store.dispatch('LOAD_SKINS', { id: this.currentTournament.id, preview: false })
        .then(response => {
          this.isloading = false
        })
    }
  },

  created: function () {
    this.$store.dispatch('LOAD_SKINS', { id: this.currentTournament.id, preview: false })
      .then(response => {
        this.skinsPurse = this.currentTournament.num_players * 30
        this.isloading = false
      })
  },
}
</script>
<style scoped>
.skins-lb-card {
  border-radius: 0;
  top: 0;
  left: 0;
  z-index: 1000 !important;
  width: 100vw;
  transition: all 0ms cubic-bezier(0.645, 0.045, 0.355, 1);
  height: 100vh;
  overflow: scroll;
  color: #f1f1f1;
  background-color: #FFCB47;
}
</style>