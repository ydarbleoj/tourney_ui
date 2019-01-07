<template>
  <v-data-table
    :headers="headers"
    :items="tournamentPlayers"
    hide-actions
    style="width:100wv;"
    item-key="id"
  >
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded">
        <td class="text-xs-center">{{ props.index + 1}}</td>
        <td class="text-xs-left pl-2">
          {{ props.item.attributes.first_name }} {{ props.item.attributes.last_name }}
        </td>
        <td class="text-xs-center">{{ props.item.attributes.handicap }}</td>
        <td class="text-xs-center">{{ props.item.attributes.role }}</td>
      </tr>
    </template>

    <template slot="expand" slot-scope="props">
      <v-card flat>
        <v-card-title class="pb-0 text-xs-center">
          <h3 class="font-weight-medium">Profile Edit</h3>
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
                        color="#E69DA7"
                        solo
                        flat
                        v-bind:value="handicap(props)"
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
                        :items="roles"
                        color="#E69DA7"
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
                        color="#E69DA7"
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
            <v-btn flat round class="admin--profile_button" @click="setParams(props.item)">Update</v-btn>
          </div>
        </v-card-actions>
      </v-card>
       <v-divider></v-divider>
      <v-card flat class="pb-3">
        <v-card-title class="pb-0 text-xs-center">
          <h3 class="font-weight-medium">Edit Scorecards</h3>
          <v-spacer></v-spacer>
          <span><v-icon color="#E69DA7" style="font-size:35px;">arrow_forward</v-icon></span>
        </v-card-title>
      </v-card>
      <v-divider></v-divider>
      <v-card flat class="pb-3">
        <v-card-title class="pb-0 text-xs-center">
          <h3 class="font-weight-medium">Delete Player</h3>
          <v-spacer></v-spacer>
          <div class="text-xs-right">
            <v-btn flat round class="admin--delete_button" @click="updatePlayer(props.item)">Delete</v-btn>
          </div>
        </v-card-title>
      </v-card>
      <v-divider></v-divider>
    </template>
  </v-data-table>

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PlayersTable',

  data () {
    return {
      editHandicap: '',
      editRole: '',
      DNF: false,
      playerForm: true,
      roles: ['admin', 'member'],
      updated: false,
      headers: [
        {
          text: '#',
          align: 'center',
          sortable: false,
          value: 'num',
          class: 'pl-2'

        },
        {
          text: 'Players',
          align: 'left',
          sortable: false,
          value: 'username',
          class: 'pl-2'

        },
        {
          text: 'Handicap',
          align: 'center',
          sortable: false,
          value: 'handicap'
        },
        {
          text: 'Role',
          align: 'center',
          sortable: false,
          value: 'role'
        },
      ]
    }
  },

  computed: {
    ...mapState(['tournamentPlayers', 'currentTournament']),
  },
  methods: {
    setParams (item) {
      let role = item.attributes.role
      let hcap = item.attributes.handicap
      let opts = {}

      if (this.editRole !== '' && this.editRole !== role) {
        opts['role'] = this.editRole
      }

      if (this.editHandicap !== '' && this.editHandicap !== hcap) {
        opts['handicap'] = this.editHandicap
      }

      if (Object.entries(opts).length !== 0) {
        this.updatePlayer(opts, item['id'])
      }
    },
    updatePlayer (opts, lbId) {
      this.$store.dispatch('UPDATE_PLAYER_ADMIN', { tournId: this.currentTournament.id, opts: opts, lbId: lbId }).then(response => {
        this.updated = true
      })
    },
    handicap (props) {
      if (Number.isInteger(props)) {
        this.editHandicap = props
        return props
      } else if (typeof props.item !== 'undefined') {
        let currentHandicap = props.item.attributes.handicap
        return currentHandicap
      }
    },
  },

  watch: {
  },

}
</script>
<style>
input {
  color: #E69DA7;
}
.v-input__slot {
  margin: 0;
}
div.dnf-switch .v-input__control .v-input__slot {
  padding-top: 10px;
  margin: 0;
}
.v-text-field__details {
  margin: 0;
  display: none;
}
.players-attrs {
  color: #E69DA7;
  text-align:center;
  font-size:28px;
}
.admin--profile_button {
  background-color: #74C9D7;
  color: #FBFCFD;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}
.admin--delete_button {
  background-color: #F7A072;
  color: #f1f1f1;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}
.board-table {
  overflow:hidden;
  border-radius: 0 0 20px 20px;
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
}
.table.theme--light thead tr th {
  color: #f1f1f1;
  font-size: 14px;
  letter-spacing: 1px;
}

table.v-table thead td:not(:nth-child(1)), table.v-table tbody td:not(:nth-child(1)), table.v-table thead th:not(:nth-child(1)), table.v-table tbody th:not(:nth-child(1)), table.v-table thead td:first-child, table.v-table tbody td:first-child, table.v-table thead th:first-child, table.v-table tbody th:first-child {
  padding: 0;
}
</style>