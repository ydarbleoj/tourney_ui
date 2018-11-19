<template>
  <v-card class="rounded-card elevation-24">
    <v-card-title class="skins">
      <h4 class="text-align-left mb-0 ml-2" >Skins</h4>
    </v-card-title>
    <v-card-text class="skins">
      <div class="loading" v-if="loading">
        Loading...
      </div>
      <div class="loaded" v-else>
        <skins-table />
      </div>
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
    StrokeTable
  },
  data () {
    return {
      loading: true,
    }
  },

  computed: {
    ...mapState(['skins_leaderboard']),
  },

  watch: {
    current: function () {
      this.$store.dispatch('LOAD_SKINS', { id: this.current.id })
        .then(response => {
          this.loading = false
        })
    },
  },

  created: function () {
    this.$store.dispatch('LOAD_STROKE', { id: this.current.id })
      .then(response => {
        this.loading = false
      })
  },
}
</script>
<style>
.rounded-card {
  border-radius: 9px;
}
.skins {
  background-color: #62bcfa;
  padding: 0;
  font-size: 16px;
  color: #666;
}
</style>