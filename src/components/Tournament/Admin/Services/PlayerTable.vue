<template>
  <v-data-table
    :headers="headers"
    :items="playerServices.services"
    hide-actions
    style="width:100wv;"
    item-key="id"
  >
    <template slot="items" slot-scope="props">
      <ServiceRow :service="props" />
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'
import ServiceRow from './Service'

export default {
  name: 'PlayerTable',
  components: {
    ServiceRow
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
          text: 'Services',
          align: 'left',
          sortable: false,
          value: 'service',

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
      playerServices: state => state.admin.playerServices
    }),
    classSuccess(item) {
      const newClass = item ? "success" : "error"
      return newClass;
    }
  },

  methods: {
    leaderboardSuccess (item) {
      return item;
    },
    setUser (props) {
      return props
    },
  },

  mounted () {
    this.playerServices
    console.log("he", this.playerServices)
  }
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
