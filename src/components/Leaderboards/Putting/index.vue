<template>
  <v-card
    class="putting-lb-card"
  >
    <v-card-title class="putting--title pb-0 pt-1 pl-2">
      <h2 class="text-align-left font-weight-medium" >Putting</h2>
      <h2 class="ml-2 font-weight-medium text-xs-left" v-if="!isPreview" transition="fade-transition">Leaderboard</h2>
      <v-spacer></v-spacer>
      <span class="text-xs-right">
        <v-icon color="white">clear</v-icon>
      </span>
    </v-card-title>
    <div class="putting--title text-xs-left pl-2 pt-0 pb-3">
      <h4 class="font-weight-regular" style="color:black;">Purse $<span>{{ purse }}</span></h4>
    </div>
    <v-card-text v-if="!isloading" class="pa-0 mb-5">
      <putting-table />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import PuttingTable from './Table'

export default {
  name: 'index',
  props: ['current'],
  components: {
    PuttingTable
  },

  data () {
    return {
      purse: 0,
      isloading: true
    }
  },

  computed: mapState(['putting_leaderboard', 'puttingPurse']),
  methods: {
  },
  watch: {
    current: function () {
      this.$store.dispatch('LOAD_PUTTING_LEADERBOARD', { id: this.current.id, preview: false })
        .then(response => {
          this.purse = this.puttingPurse
          this.isloading = false
        })
    }
  },

  created: function (current) {
    this.$store.dispatch('LOAD_PUTTING_LEADERBOARD', { id: this.current.id, preview: false })
      .then(response => {
        this.purse = this.puttingPurse
        this.isloading = false
      })
  }


}
</script>
<style scoped>
.putting-lb-card {
  width: 100%;
  border-radius: 20px;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
}
.putting-lb-card.open {
  width: 100vw;
  border-radius: 0;
  top: 0;
  left: 0;
  z-index: 1000 !important;
  height: 100vh;
  overflow: scroll;
}

.putting--title {
  color: #f1f1f1;
  background-color: #A8C256;
}

</style>