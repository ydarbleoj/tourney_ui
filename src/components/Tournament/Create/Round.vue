<template>
  <v-card flat class="pt-2" @click="">
    <h3 class="font-weight-regular">Add Round Info</h3>
    <v-container>
      <v-layout row wrap justify-space-between>
        <v-flex xs12 class="ma-1">
          <add-course
            v-for="(item, index) in listInfo"
            :info="item"
            ref="roundData"
            :key="index"
            />
        </v-flex>
      </v-layout>
    </v-container>
    <v-card-actions class="pa-3">
      <div class="text-xs-right" style="width:100%;">
        <v-btn flat round class="admin--profile_button" @click="createRounds()">Add</v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import AddCourse from '../Create/AddCourse'

export default {
  name: 'Round',
  components: {
    AddCourse,
  },
  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament,
      userInviteList: state => state.userInviteList,
      courseMenuList: state => state.courseMenuList
    }),
  },

  data () {
    return {
      listInfo: [],
    }
  },

  methods: {
    ...mapMutations({
      resetCurrentTournament: 'tournament/RESET_CURRENT_TOURNAMENAT'
    }),
    createRounds () {
      let rounds = this.$refs.roundData.map(el => el.save())
      this.$store.dispatch(
        'CREATE_TOURNAMENT_ROUNDS',
        {
          tournId: this.currentTournament.id,
          payload: rounds
        }
      ).then(response => {
        if (response) {
          this.$router.push({
            name: 'TournamentAdmin',
            params: {
              id: this.currentTournament.id
            }
          })
        }
      })
    },

  },

  created: function () {
    console.log('current', this.currentTournament)
    this.listInfo = this.currentTournament.round_info
  },

}

</script>
<style>
.admin--profile_button {
  background-color: #74C9D7;
  color: #FBFCFD;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}
.rounded-card {
  border-radius: 9px;
}
.home-container {
  background-color: white;
}
</style>