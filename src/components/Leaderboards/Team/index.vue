<template>
  <v-card class="team-lb-card" @click="isPreview ? previewToggle() : null">
    <v-card-title class="team--title pa-0 pt-2 pl-2">
      <h2 class="text-xs-left font-weight-medium" >Team</h2>
      <h2 class="ml-2 font-weight-medium text-xs-left" v-if="!isPreview" transition="fade-transition">Leaderboard</h2>
      <v-spacer></v-spacer>
      <span v-if="!isPreview" class="text-xs-right pr-2" @click="closeLeaderboard()">
        <v-icon color="white">clear</v-icon>
      </span>
    </v-card-title>

    <v-card-text v-if="!loading" class="team--title pa-0">
      <h3 class="text-xs-center font-weight-medium">Round {{ roundNumber }}</h3>
      <team-table :preview="isPreview"/>
    </v-card-text>
    <v-bottom-nav
    v-if="!isPreview"
      absolute
      :active.sync="roundNumber"
      :value="true"
      style="background-color:#FF9D72;"
    >
      <v-btn flat value="1" style="color:#fff; opacity:0.7;">
        <h3>ONE</h3>
      </v-btn>
      <v-btn flat value="2" style="color:#fff;opacity:0.7;">
        <h3>TWO</h3>
      </v-btn>
      <v-btn flat value="3" style="color:#fff;opacity:0.7;">
        <h3>THREE</h3>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>
<script>


import { mapState, mapGetters } from 'vuex'
import TeamTable from './Table'

export default {
  name: 'index',
  props: ['current'],
  components: {
    TeamTable
  },
  data () {
    return {
      isPreview: true,
      loading: true,
      closed: true,
      roundNumber: 1,
      roundId: null,
    }
  },

  computed: {
    ...mapState(['teamLeaderboard', 'teamRounds']),
  },

  methods: {
    closeLeaderboard () {
      this.isPreview = true
    },
    previewToggle () {
      if (this.isPreview && this.closed) {
        this.getFullField()
      } else if (this.isPreview && !this.closed) {
        this.closed = !this.closed
      } else {
        return null
      }

    },
    toggleParent () {
      this.$parent.$el.style.margin = this.isPreview ? '0 auto' : '0';
      this.$parent.$el.style.width = this.isPreview ? '90%' : '100%';
    },
    getFullField () {
      this.$store.dispatch('LOAD_TEAM_LEADERBOARD', { tournId: this.current.id, roundId: this.roundId, preview: false })
        .then(response => {
          this.closed = false
          this.isPreview = false
        })
    },
    roundFilter (rounds, num) {
      let r = rounds.filter(el => el.roundNumber == num)
      this.roundId = r[0].roundId
    }
  },
  watch: {
    current () {
      this.$store.dispatch('LOAD_TEAM_LEADERBOARD', { tournId: this.current.id, roundId: this.roundId, preview: true })
        .then(response => {
          this.loading = false
        })
    },
    isPreview () {
      this.toggleParent()
      this.$el.classList.toggle('open')
      this.$emit('event')
    },
    roundNumber () {
      console.log('round number', this.teamLeaderboard)
      this.roundFilter(this.teamRounds, this.roundNumber)
      this.$store.dispatch('LOAD_TEAM_LEADERBOARD', { tournId: this.current.id, roundId: this.roundId, preview: false })
        .then(response => {
          this.closed = false
          this.isPreview = false
        })
    }

  },
  created: function () {
    this.roundFilter(this.teamRounds, this.roundNumber)
    this.$store.dispatch('LOAD_TEAM_LEADERBOARD', { tournId: this.current.id, roundId: this.roundId, preview: true })
      .then(response => {
        this.loading = false
      })
  },
}
</script>
<style>
.team-lb-card {
  border-radius: 20px;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}
.team-lb-card.open {
  border-radius: 0;
  top: 0;
  left: 0;
  z-index: 1000 !important;
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
  height: 100vh;
  overflow: scroll;
}

.team--title {
  color: #f1f1f1;
  background-color: #FF9D72;
}

</style>