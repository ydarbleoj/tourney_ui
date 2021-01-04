<template>
  <v-card
    @click="toStrokeleaderboard"
    rounded
    class="lb-card bg-color container"
  >
    <v-card-title class="pa-0">
      <h2 class="text-xs-left font-weight-medium" >Stroke</h2>
    </v-card-title>
    <div class="text-xs-left">
      <h4 class="black--text font-weight-regular">Purse $<span>{{ purse }}</span></h4>
    </div>
    <v-list v-if="!isloading" dense class="bg-color">
      <v-list-item v-for="(item, index) in strokeLeaderboard" :key="index">
        <div>
          {{ item.attributes.position }}
        </div>
        <v-list-item-content>
          {{ item.attributes.username }}
        </v-list-item-content>
        <v-list-item-content class="text-xs-right" v-text="item.attributes.total_score">
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import StrokeTable from './Table'

export default {
  name: 'StrokeButton',
  computed: {
    ...mapState(['currentTournament', 'strokeLeaderboard']),
  },
  components: {
    StrokeTable
  },
  data () {
    return {
      isloading: true,
      isPreview: true,
      purse: 0,
      headers: [
        {
          text: 'Pos',
          align: 'center',
          sortable: false,
          value: 'pos'
        },
        {
          text: 'Players',
          align: 'left',
          sortable: false,
          value: 'username'
        },
        {
          text: 'Total',
          align: 'center',
          sortable: false,
          value: 'total_score'
        }
      ]
    }
  },
  methods: {
    toStrokeleaderboard () {
      this.$router.push({ name: 'StrokeLeaderboard', parmas: { id: this.currentTournament.id} })
    }
  },

  created: function () {
    this.$store.dispatch('LOAD_STROKE_LEADERBOARD', { id: this.currentTournament.id, preview: true })
      .then(response => {
        this.purse = this.currentTournament.num_players * 30
        this.isloading = false
      })
  },


}
</script>
<style scoped>
.bg-color {
  background-color: #9FB8CE;
}
.lb-card {
  border-radius: 20px;
  transition: all 0ms cubic-bezier(0.645, 0.045, 0.355, 1);
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
}
</style>