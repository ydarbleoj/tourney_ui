<template>
  <v-container class="pa-4">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card flat style="background-color:#666;border-radius: 25px;" class="white--text">
          <v-card-title class="pb-0 text-xs-center">
            <h3 class="font-weight-medium black--text">Profile Edit</h3>
          </v-card-title>
          <v-card-text class="pt-0 pb-0">
            <v-layout row wrap class="font-weight-regular pb-2">
              <v-flex xs12>
                <v-form
                  v-model="playerForm"
                >
                  <v-container class="pa-0">
                    <v-layout align-center row fill-height wrap>
                      <v-flex xs10 class="pb-0">
                        <div class="text-xs-left pa-0">
                          <h3 class="font-weight-regular">Handicap</h3>
                        </div>
                      </v-flex>
                      <v-flex xs2 class="pa-0">
                        <v-text-field
                          class="players-attrs"
                          style="padding:0;height: 50px;"
                          color="#E69DA7"
                          background-color="#666"
                          solo
                          flat
                          v-bind:value="handicap(user)"
                          @input="handicap(parseInt($event))"
                        >
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-layout align-center row fill-height wrap>
                      <v-flex xs8 class="pb-0">
                        <div class="text-xs-left pa-0">
                          <h3 class="font-weight-regular">Role</h3>
                        </div>
                      </v-flex>
                      <v-flex xs4 class="pa-0">
                        <v-select
                          v-model="editRole"
                          :label="rolez(user)"
                          :items="roles"
                          background-color="#666"
                          color="#F8C977"
                          solo
                          flat
                        ></v-select>
                      </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-layout align-center justify-center row fill-height wrap>
                      <v-flex xs10 class="pb-0">
                        <div class="text-xs-left pa-0">
                          <h3 class="font-weight-regular">Did Not Finish</h3>
                        </div>
                      </v-flex>
                      <v-flex xs2 class="pa-0">
                        <v-switch
                          class="dnf-switch"
                          color="#F8C977"
                          v-model="DNF"
                        ></v-switch>
                      </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                  </v-container>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions class="pa-3">
            <div class="text-xs-right" style="width:100%;">
              <v-btn flat round class="admin--update_button" @click="setParams(user.item)" v-bind:loading="btnLoading">
                {{ updateMessage }}
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
        <v-divider></v-divider>
        <v-card flat class="pb-3 mt-3 mb-3">
          <v-card-title class="pb-0 text-xs-center">
            <h2 class="font-weight-medium">Edit Scorecards</h2>
            <v-spacer></v-spacer>
            <span @click="scorecardsView"><v-icon color="#F8C977" style="font-size:35px;" >arrow_forward</v-icon></span>
          </v-card-title>
        </v-card>
        <v-divider></v-divider>
        <v-card flat class="pt-5 pb-5 text-xs-center">
          <v-btn flat round
            class="admin--add_button"
            @click="removePlayer(user.item)"
            v-bind:loading="btnDelete"
          >
            Delete
          </v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'PlayerEdit',
  props: ['user'],
  components: {
  },

  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament,
    })
  },

  data () {
    return {
      btnLoading: false,
      btnDelete: false,
      updateMessage: 'Update',
      editHandicap: '',
      editRole: '',
      DNF: false,
      playerForm: true,
      roles: ['admin', 'member'],
      updated: false,
      loading: true,
    }
  },

  methods: {
    setParams (item) {
      let role = item.role
      let hcap = item.handicap
      let dnf  = item.dnf
      let opts = {}
      console.log('hi', this.DNF)

      if (this.editRole !== '' && this.editRole !== role) {
        opts['role'] = this.editRole
      }

      if (this.editHandicap !== '' && this.editHandicap !== hcap) {
        opts['handicap'] = this.editHandicap
      }

      if (this.DNF !== '' && this.DNF !== dnf) {
        opts['dnf'] = this.DNF
      }

      if (Object.entries(opts).length !== 0) {
        this.updatePlayer(opts, item['id'])
      }
    },
    updatePlayer (opts, lbId) {
      this.btnLoading = true
      this.$store.dispatch('admin/UPDATE_PLAYER', {
        tournId: this.currentTournament.id,
        opts: opts,
        lbId: lbId
      }).then(response => {
        if (response) {
          this.updated = true
          this.updateMessage = 'Success'
        } else {
          this.updateMessage = 'Failed'
        }
        setTimeout(() => this.updateMessage = 'Update', 3000)
        this.btnLoading = false
      })
    },
    removePlayer (item) {
      this.btnDelete = true
      this.$store.dispatch('admin/DELETE_PLAYER', {
        tournId: this.currentTournament.id, id: item.id
      }).then(response => {
        this.btnDelete = false
      })
    },
    scorecardsView () {
      this.$emit('toggleView', { view: 'player-scorecards', user: this.user })
    },
    handicap (props) {
      if (Number.isInteger(props)) {
        this.editHandicap = props
        return props
      } else if (typeof props !== 'undefined') {
        let currentHandicap = props.handicap
        return currentHandicap
      }
    },
    rolez (props) {
      this.editRole = props.role
    },
  },

  created () {
    this.DNF = this.user.dnf
  }

}
</script>
<style lang="scss" scoped>
.admin--add_button {
  background-color: #d7a474;
  color: #FBFCFD;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}
.admin--update_button {
  background-color: #494846;
  color: #FBFCFD;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}
.players-attrs.v-text-field .v-input__control .v-input__slot .v-text-field__slot input {
  padding: 0;

}
</style>