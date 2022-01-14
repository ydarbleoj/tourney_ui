<template>
  <v-data-table
    :headers="headers"
    :items="tournamentPlayers"
    hide-actions
    style="width:100wv;"
    item-key="id"
  >
    <template slot="items" slot-scope="props">
      <tr v-bind:ref="'row' + props.item.id">
        <td class="text-xs-center">{{ props.index + 1}}</td>
        <td class="text-xs-left pl-2">
          <h4 class="font-weight-regular" v-if="props.item.attributes.first_name">{{ props.item.attributes.first_name }} {{ props.item.attributes.last_name }}</h4>
          <h4 class="font-weight-regular" v-else>{{ props.item.attributes.email }}</h4>
          <v-spacer></v-spacer>
          <span class="grey--text" v-if="props.item.attributes.pending">pending</span>
        </td>
        <td class="text-xs-center" @click="playerPage(props.item.id)">
          <v-icon color="#F8C977">edit</v-icon>
        </td>
      </tr>
    </template>

    <template slot="expand" slot-scope="props">
      <component :is="view" :user="setUser(props)" @toggleView="newView" />
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'
import PlayerEdit from '../Admin/PlayerEdit'
import PlayerScorecards from '../Admin/PlayerScorecards'

export default {
  name: 'PlayersTable',
  components: {
    PlayerEdit,
    PlayerScorecards
  },
  data () {
    return {
      view: 'player-edit',
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
          text: '',
          align: 'center',
          sortable: false,
          value: 'role'
        },
      ]
    }
  },

  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament,
      tournamentPlayers: state => state.admin.tournamentPlayers
    })
  },

  methods: {
    playerPage (id) {
      this.$store.commit("setPageTransition");
      this.$router.push({
        name: 'AdminPlayerPage',
        params: {
          tournId: this.currentTournament.id,
          leaderboard_id: id
        }
      })
    },
    newView (v) {
      console.log('here', this.props)
      console.log('this', v)
      this.view = v.view
      this.setUser(v.user)
    },
    setUser (props) {
      return props
    },
    expandRow (props, event) {
      // let el = this.$refs['row' + props.item.id]
      // el.style.top = '0';
      // el.style.left = '0';
      // console.log('props', props)
      // console.log('event', this.$refs['row' + props.item.id])
      props.expanded = !props.expanded
    }
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