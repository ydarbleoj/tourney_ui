<template>
  <v-data-table
    :headers="headers"
    :items="teamLeaderboard"
    hide-actions
    class='team-table board-table'
    item-key="id"
  >
    <template slot="items" slot-scope="props">
      <tr @click="toPage(props.item.id)">
        <td class="font-weight-light text-xs-center">
          <h2>
            {{ props.item.attributes.position }}
          </h2>
        </td>
        <td class="text-xs-left mt-5">
          <h1
            class="font-weight-medium mb-2 team-stats"
            style="font-size:20px;"
          >
            {{ props.item.attributes.group }}
          </h1>
          <v-layout row wrap v-bind:class="{ hidden_row : preview }">
            <v-flex xs12 style="width:100%;">
              <ul
                style="width:100%;padding:0;"
              >
                <li
                  v-for="(item, i) in props.item.attributes.players"
                  id="this"
                  :key="i"
                  d-inline-flex
                  style="display:inline-block;margin:0;width:50%"
                  class="font-weight-regular"
                >
                  <h3>
                    {{ item.username }}
                    <span style="color:#777;font-size:12px;">{{ item.handicap }}</span>
                    <v-spacer></v-spacer>
                  </h3>
                </li>
              </ul>
            </v-flex>
          </v-layout>
        </td>
        <td
          class="text-xs-center mr-1 team-stats"
          style="font-size:24px;"
        >
          {{ props.item.attributes.total }}
        </td>
        <td
          class="text-xs-center"
          style="color:#777;font-size:16px;"
        >
          {{ props.item.attributes.total_net }}
        </td>
      </tr>
    </template>
  </v-data-table>

</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Table',
  props: ['preview'],
  computed: {
    ...mapState({
      teamLeaderboard: state => state.leaderboards.team.teamLeaderboard,
      currentTournament: state => state.tournament.currentTournament
    }),
  },

  data () {
    return {
      setStyle: {},
      headers: [
        {
          text: 'Pos',
          align: 'center',
          sortable: false,
          value: 'pos'
        },
        {
          text: 'Group',
          align: 'left',
          sortable: false,
          value: 'group',
        },
        {
          text: 'Total',
          align: 'center',
          sortable: false,
          value: 'total'
        },
        {
          text: 'Score',
          align: 'center',
          sortable: false,
          value: 'net_total'
        }
      ]
    }
  },

  methods: {
    toPage (teamId) {
      this.$store.commit("setPageTransition", "");
      this.$router.push({
        name: "TeamPage",
        params: {
          id: this.currentTournament.id,
          team_id: teamId
        }
      })
    }
  },

  watch: {
    preview () {
      let h = this.preview ? {} : { height: '18vh' }
      this.setStyle = Object.assign(h)
    }
  },

  created () {

  }

}
</script>
<style>
.team-stats {
  color: #FE8202;
}
.board-table {
  overflow:hidden;
}
.hidden_row {
  display: none;
}
.team-table table.theme--light thead {
  background-color: #ACA885;
}
.team-table table.theme--light thead tr th {
  color: #f1f1f1;
  font-size: 14px;
  letter-spacing: 1px;
}

table.v-table thead td:not(:nth-child(1)), table.v-table tbody td:not(:nth-child(1)), table.v-table thead th:not(:nth-child(1)), table.v-table tbody th:not(:nth-child(1)), table.v-table thead td:first-child, table.v-table tbody td:first-child, table.v-table thead th:first-child, table.v-table tbody th:first-child {
  padding: 1px;
}
</style>
