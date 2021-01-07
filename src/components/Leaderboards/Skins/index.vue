<template>
  <v-card
    class="skins-lb-card"
  >
    <v-card-title class="skins--title pa-0 pt-2 pl-2">
      <h2 class="text-align-left font-weight-medium white--text" >Skins</h2>
      <h2 class="ml-2 font-weight-medium text-xs-left white--text" transition="fade-transition">Leaderboard</h2>
      <v-spacer></v-spacer>
      <span class="text-xs-right pr-2">
        <v-icon color="white">clear</v-icon>
      </span>
    </v-card-title>
     <div class="skins--title text-xs-left pl-2 pt-0 pb-3">
      <h4 class="font-weight-regular" style="color:black;">Purse $<span>{{ purse }}</span></h4>
    </div>
    <v-card-text v-if="!isloading" class="pa-0 mb-5">
      <skins-table />
    </v-card-text>
  </v-card>
</template>
<script>


import { mapState, mapGetters } from 'vuex'
import SkinsTable from './Table'

export default {
  name: 'index',
  props: ['current'],
  components: {
    SkinsTable
  },
  data () {
    return {
      isloading: true,
      purse: 0
    }
  },

  computed: {
    ...mapState(['skins_leaderboard']),
  },
  methods: {
  },
  watch: {
    current: function () {
      this.$store.dispatch('LOAD_SKINS', { id: this.current.id, preview: false })
        .then(response => {
          this.isloading = false
        })
    }
  },

  created: function () {
    this.$store.dispatch('LOAD_SKINS', { id: this.current.id, preview: false })
      .then(response => {
        this.purse = this.current.num_players * 30
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
}

.skins--title {
  color: #f1f1f1;
  background-color: #FFCB47;
}
</style>