<template>
  <v-data-table
    v-bind:items="moneyList"
    hide-actions
    hide-headers
    class='money'
    item-key="username"
  >
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded">
        <td class="text-xs-center">{{ props.item.pos }}</td>
        <td class="text-xs-left">
          {{ props.item.username }}
        </td>
        <td class="text-xs-center">$ {{ props.item.stroke }}</td>
        <td class="text-xs-center">$ {{ props.item.putting }}</td>
        <td class="text-xs-center">$ {{ props.item.team }}</td>
        <td class="text-xs-center">$ {{ props.item.skins }}</td>
        <td class="text-xs-center">$ {{ props.item.total }}</td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MoneyList',
  props: ['current'],

  computed: mapState([
    'moneyList'
  ]),

  data () {
    return {

    }
  },

  watch: {
    current: function () {
      this.$store.dispatch('LOAD_MONEY_LIST', { tournId: this.current.id })
    }
  },

  created: function (current) {
    this.$store.dispatch('LOAD_MONEY_LIST', { tournId: this.current.id })
  }
}
</script>
<style>
div.table__overflow.money {
  padding-top: 105px;
}
.money thead {
  background-color: #62bcfa;
}
table.table thead th {
  font-size: 12px;
}
table.table thead td:not(:nth-child(1)), table.table tbody td:not(:nth-child(1)), table.table thead th:not(:nth-child(1)), table.table tbody th:not(:nth-child(1)), table.table thead td:first-child, table.table tbody td:first-child, table.table thead th:first-child, table.table tbody th:first-child {
  padding: 0 3px;
}
</style>