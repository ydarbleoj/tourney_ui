<template>
  <v-card
    class="lb-card"
   >
    <v-card-title class="stroke--title pa-0 pt-2 pl-2">
      <h2 class="text-xs-left font-weight-medium" >Stroke</h2>
      <h2 class="ml-2 font-weight-medium text-xs-left">Leaderboard</h2>
      <v-spacer></v-spacer>
      <span class="text-xs-right pr-2">
        <v-icon color="white">clear</v-icon>
      </span>
    </v-card-title>
    <div class="stroke--title text-xs-left pb-3 pl-2 pt-0">
      <h4 class="black--text font-weight-regular">Purse $<span>{{ purse }}</span></h4>
    </div>
    <v-card-text v-if="!isloading" class="pa-0 mb-5">
      <stroke-table />
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import StrokeTable from './Table'

export default {
  name: 'index',
  props: ['current'],
  components: {
    StrokeTable
  },
  data () {
    return {
      purse: 0,
      isloading: true
    }
  },

  computed: {
    ...mapGetters(['getTournament']),
  },
  methods: {
    closeLeaderboard () {
      this.isPreview = true
    }
  },
  watch: {
    current () {
      this.$store.dispatch('LOAD_STROKE_LEADERBOARD', { id: this.getTournament.id, preview: false })
        .then(response => {
          this.isloading = false
        })
    }
  },
  mounted: function () {
    this.$store.dispatch('LOAD_STROKE_LEADERBOARD', { id: this.getTournament.id, preview: false })
      .then(response => {
        this.purse = this.getTournament.num_players * 30
        this.isloading = false
      })
  }
}
</script>
<style>
.lb-card {
  border-radius: 0;
  top: 0;
  left: 0;
  z-index: 1000 !important;
  height: 100vh;
  overflow: scroll;
  width: 100vw;
  transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.stroke--title {
  color: #f1f1f1;
  background-color: #9FB8CE;
}
</style>