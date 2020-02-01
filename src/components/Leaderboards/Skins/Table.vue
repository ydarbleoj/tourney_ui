<template>
  <v-data-table
    :headers="headers"
    :items="skins_leaderboard"
    hide-actions
    class='skins-table board-table'
    item-key="id"
  >
    <template slot="items" slot-scope="props" >
      <tr @click="preview ? !props.expanded : props.expanded = !props.expanded" v-bind:class="displayRow(props)">
        <td class="text-xs-center">{{ props.item.attributes.position }}</td>
        <td class="text-xs-left">{{ props.item.attributes.username }}
          <v-spacer></v-spacer>
          <span class="grey--text">handicap {{ props.item.attributes.handicap }}</span>
        </td>
        <td class="text-xs-center">${{ props.item.attributes.skins_money ? props.item.attributes.skins_money.total : null }}</td>
        <td v-bind:class="{ hidden_row : preview }" class="text-xs-center">{{ preview ? null : cardFilter(props.item.attributes.cards, 'round_1')['total'] }}</td>
        <td v-bind:class="{ hidden_row : preview }" class="text-xs-center">{{ preview ? null : cardFilter(props.item.attributes.cards, 'round_2')['total'] }}</td>
        <td v-bind:class="{ hidden_row : preview }" class="text-xs-center">{{ preview ? null : cardFilter(props.item.attributes.cards, 'round_3')['total'] }}</td>
        <td class="text-xs-center">{{ props.item.attributes.total_skins }}</td>
      </tr>
    </template>
    <template slot="expand" slot-scope="props">
      <v-layout row wrap class="font-weight-regular pt-3 pb-3 pr-2" align-center>
        <v-flex xs12 mb-2 ml-3>
          <h3 class="text-xs-left grey--text font-weight-regular">Money & Holes</h3>
        </v-flex>

        <v-flex xs4>
          <v-layout row align-center>
            <v-flex xs3 class="text-xs-right">
              <h3 class="font-weight-regular">R1</h3>
            </v-flex>
            <v-flex xs9>
              <h1 class="skins-total">
                <span class="dollar-sign">$</span>{{ props.item.attributes.skins_money.round_one}}
              </h1>
            </v-flex>
          </v-layout>
        </v-flex>

         <v-flex xs4>
          <v-layout row align-center>
            <v-flex xs3 class="text-xs-right">
              <h3 class="font-weight-regular">R2</h3>
            </v-flex>
            <v-flex xs9>
              <h1 class="skins-total">
                <span class="dollar-sign">$</span>{{ props.item.attributes.skins_money.round_two }}
              </h1>
            </v-flex>
          </v-layout>
        </v-flex>

         <v-flex xs4>
          <v-layout row align-center>
            <v-flex xs2 class="text-xs-right">
              <h3 class="font-weight-regular">R3</h3>
            </v-flex>
            <v-flex xs9>
              <h1 class="skins-total">
                <span class="dollar-sign">$</span>{{ props.item.attributes.skins_money.round_three }}
              </h1>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout row align-right>
        <v-flex xs4>
          <v-layout row align-center>
            <v-flex v-if="props.item.attributes.skins_money.round_one > 0" xs12 style="width:100%;">
              <v-divider class="mb-3"></v-divider>
              <ul
                style="width:100%;padding:0;"
              >
                <li
                  v-for="(item, i) in cardFilter(props.item.attributes.cards, 'round_1')['holes_won']"
                  id="this"
                  :key="i"
                  d-inline-flex
                  style="display:inline-block;margin:0 2px;"

                >
                  {{ item }}
                  <span
                    v-if="i !== cardFilter(props.item.attributes.cards, 'round_1')['holes_won'].length - 1"
                  >,</span>
                </li>
              </ul>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs4>
          <v-layout row align-center>
            <v-flex v-if="props.item.attributes.skins_money.round_two > 0" xs12 style="width:100%;">
              <v-divider class="mb-3"></v-divider>
              <ul
                style="width:100%;padding:0;"
              >
                <li
                  v-for="(item, i) in cardFilter(props.item.attributes.cards, 'round_2')['holes_won']"
                  id="this"
                  :key="i"
                  d-inline-flex
                  style="display:inline-block;margin:0 2px;"

                >
                  {{ item }},
                </li>
              </ul>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs4>
          <v-layout row align-right>
            <v-flex v-if="props.item.attributes.skins_money.round_three > 0" xs12 style="width:100%;">
              <v-divider class="mb-3"></v-divider>
              <ul
                style="width:100%;padding:0;"
              >
                <li
                  v-for="(item, i) in cardFilter(props.item.attributes.cards, 'round_3')['holes_won']"
                  id="this"
                  :key="i"
                  d-inline-flex
                  style="display:inline-block;margin:0 2px;"

                >
                  {{ item }},
                </li>
              </ul>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Table',
  props: ['preview'],

  data () {
    return {

      headers: [
        {
          text: 'Pos',
          align: 'center',
          sortable: false,
          value: 'pos',
          class: 'white--text '
        },
        {
          text: 'Players',
          align: 'left',
          sortable: false,
          value: 'username',
          class: 'white--text '
        },
        {
          text: 'Money',
          align: 'center',
          sortable: false,
          value: '',
          class: 'white--text'
        },
        {
          text: 'R1',
          align: 'center',
          sortable: false,
          class: 'skins-row white--text hidden_row',
          value: 'rnd1'
        },
        {
          text: 'R2',
          align: 'center',
          sortable: false,
          class: 'skins-row white--text hidden_row',
          value: 'rnd2'
        },
        {
          text: 'R3',
          align: 'center',
          sortable: false,
          class: 'skins-row white--text hidden_row',
          value: 'rnd3'
        },
        {
          text: 'Total',
          align: 'center',
          sortable: false,
          value: 'total',
          class: 'white--text '
        },
      ]
    }
  },

  computed: mapState(['skins_leaderboard']),

  methods: {
    displayRow (props) {
      let klass;
      if (this.preview) {
        klass = props.index < 3 || props.item.attributes.username == this.$auth.user().username ? '' : 'hidden_row'
      } else {
        klass = ''
      }
      return klass
    },
    cardFilter (cards, rnd) {
      let nn = cards.filter(el => el[rnd])
      if (nn === undefined || !nn.length) return {};
      return nn[0][rnd]

    },
    checkIfPreview (props) {
      this.preview ? null : props.expanded = !props.expanded
    }
  },

  watch: {
    preview () {
      let array = [0, 1, 2]
      let headers = document.getElementsByClassName('skins-row');
      array.map(num => headers[num].classList.toggle('hidden_row'))
    }
  },

  created: function (current) {
    // console.log('skins leaderboards', this.skins_leaderboard)
  }


}
</script>
<style>
.skins-total {
  color: #FFCB47;
}
.dollar-sign {
  font-weight: 200;
  color: #2E2F2F;
  font-size: 20px;
}
.board-table {
  overflow:hidden;
  border-radius: 0 0 20px 20px;
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
}
.skins-table table.theme--light thead {
  background-color: #FFCB47;
}
.skins-table table.theme--light thead tr th {
  color: #f1f1f1;
  font-size: 14px;
  letter-spacing: 1px;
}

table.table thead td:not(:nth-child(1)), table.table tbody td:not(:nth-child(1)), table.table thead th:not(:nth-child(1)), table.table tbody th:not(:nth-child(1)), table.table thead td:first-child, table.table tbody td:first-child, table.table thead th:first-child, table.table tbody th:first-child {
  padding: 0;
}
</style>