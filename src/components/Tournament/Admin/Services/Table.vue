<template>
  <v-data-table
    :headers="headers"
    :items="services"
    hide-actions
    style="width:100wv;"
    item-key="id"
  >
    <template slot="items" slot-scope="props">
      <tr v-bind:ref="'row' + props.item.id">
        <td class="text-xs-center">{{ props.index + 1}}</td>
        <td class="text-xs-left ">
          <h4 class="font-weight-regular" v-if="props.item.attributes.first_name">
            {{ props.item.attributes.username }}
          </h4>
        </td>
        <td>
          <v-icon
            style="height:24px;width:24px;border-radius:50%"
            :class="[props.item.attributes.round_one ? 'success' : 'error']"
          >
            {{ props.item.attributes.round_one ? 'mdi-check' : 'mdi-close' }}
          </v-icon>
        </td>
        <td>
          <v-icon
            style="height:24px;width:24px;border-radius:50%"
            :class="[props.item.attributes.round_two ? 'success' : 'error']"
          >
             {{ props.item.attributes.round_two ? 'mdi-check' : 'mdi-close' }}
          </v-icon>
        </td>
        <td>
          <v-icon
            style="height:24px;width:24px;border-radius:50%"
            :class="[props.item.attributes.round_three ? 'success' : 'error']"
          >
             {{ props.item.attributes.round_three ? 'mdi-check' : 'mdi-close' }}
          </v-icon>
        </td>
        <td class="text-xs-center" @click="playerPage(props.item.id)">
          <v-icon color="#999">
            mdi-chevron-right
          </v-icon>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Table',
  components: {
  },
  data () {
    return {
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

        },
        {
          text: 'R1',
          sortable: false,
          value: 'role'
        },
        {
          text: 'R2',
          sortable: false,
          value: 'role'
        },
        {
          text: 'R3',
          sortable: false,
          value: 'role'
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
      services: state => state.admin.services
    }),
    classSuccess(item) {
      const newClass = item ? "success" : "error"
      return newClass;
    }
  },

  methods: {
    playerPage (id) {
      this.$store.commit("setPageTransition");
      this.$router.push({
        name: 'PlayerServicePage',
        params: {
          tournId: this.currentTournament.id,
          leaderboard_id: id
        }
      })
    },
    leaderboardSuccess (item) {
      return item;
    },
    setUser (props) {
      return props
    },
  },
}
</script>
<style>
.error {
  background-color: #bb4353;
}
.success {
  background-color: rgb(65, 122, 58);
}
.v-input__slot {
  margin: 0;
}
div.dnf-switch .v-input__control .v-input__slot {
  padding-top: 10px;
  margin: 0;
}
</style>
