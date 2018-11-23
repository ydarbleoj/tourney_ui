<template>
  <v-data-table
    :headers="headers"
    :items="putting_leaderboard"
    hide-actions
    class='putting rounded-card'
    item-key="user_id"
  >
    <template slot="items" slot-scope="props" >
      <tr @click="props.expanded = !props.expanded" v-if="isPreview ? displayRow(props) : ''">
        <td class="text-xs-center">{{ props.item.attributes.position }}</td>
        <td class="text-xs-left">{{ props.item.attributes.username }}</td>
        <td class="text-xs-center">{{ props.item.attributes.total_3_putts }}</td>
       <!--  <td v-if="isPreview ? hide-row : ''" class="text-xs-center">{{ props.item.attributes.rnd1_putts }}</td>
        <td v-if="isPreview ? hide-row : ''" class="text-xs-center">{{ props.item.attributes.rnd2_putts }}</td>
        <td v-if="isPreview ? hide-row : ''" class="text-xs-center">{{ props.item.attributes.rnd3_putts }}</td> -->
        <td class="text-xs-center">{{ props.item.attributes.total_putts }}</td>
      </tr>
    </template>
    <template slot="expand" slot-scope="props">
      <v-card flat>
        <v-card-text>Peek-a-boo!</v-card-text>
      </v-card>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Table',
  props: ['current'],

  data () {
    return {
      isPreview: true,
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
          text: '3 Putts',
          align: 'center',
          sortable: false,
          value: 'total_3_putts'
        },
        {
          text: 'R1',
          align: 'center',
          sortable: false,
          value: 'rnd1_putts',
          class: 'hide-row'
        },
        {
          text: 'R2',
          align: 'center',
          sortable: false,
          value: 'rnd2_putts',
          class: 'hide-row'
        },
        {
          text: 'R3',
          align: 'center',
          sortable: false,
          value: 'rnd3_putts',
          class: 'hide-row'
        },
        {
          text: 'Total',
          align: 'center',
          sortable: false,
          value: 'net_total'
        }
      ]
    }
  },

  computed: mapState(['putting_leaderboard']),

  methods: {
    displayRow: function (props) {
      let klass = props.item.attributes.position < 6 || props.item.attributes.username == this.$auth.user().username ? 'hide-row' : ''
      return klass
    }
  },

  created: function (current) {
  }


}
</script>
<style>
.hide-row {
  display: none;
}
.putting thead {
  background-color: #ffa726;
}
table.table thead th {
  font-size: 12px;
}
table.table thead td:not(:nth-child(1)), table.table tbody td:not(:nth-child(1)), table.table thead th:not(:nth-child(1)), table.table tbody th:not(:nth-child(1)), table.table thead td:first-child, table.table tbody td:first-child, table.table thead th:first-child, table.table tbody th:first-child {
  padding: 0 3px;
}
</style>