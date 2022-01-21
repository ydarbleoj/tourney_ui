<template>
  <tr>
    <td class="text-xs-center">-</td>
    <td class="text-xs-left ">
      <h4 class="font-weight-regular">
        {{ this.service.item }}
      </h4>
    </td>
    <td>
      <v-icon
        style="height:24px;width:24px;border-radius:50%"
        :class="[this.playerServices.round_one[this.service.item]? 'success' : 'error']"
      >
        {{ this.playerServices.round_one[this.service.item] ? 'mdi-check' : 'mdi-close' }}
      </v-icon>
    </td>
    <td>
      <v-icon
        style="height:24px;width:24px;border-radius:50%"
        :class="[this.playerServices.round_two[this.service.item] ? 'success' : 'error']"
      >
        {{ this.playerServices.round_two[this.service.item] ? 'mdi-check' : 'mdi-close' }}
      </v-icon>
    </td>
    <td>
      <v-icon
        style="height:24px;width:24px;border-radius:50%"
        :class="[this.playerServices.round_three[this.service.item] ? 'success' : 'error']"
      >
        {{ this.playerServices.round_three[this.service.item] ? 'mdi-check' : 'mdi-close' }}
      </v-icon>
    </td>
    <td class="text-xs-center">
      <v-icon color="#999">
        mdi-chevron-right
      </v-icon>
    </td>
  </tr>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Service',
  props: ['service'],
  data () {
    return {}
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

  methods: {},

  mounted() {
     console.log("hiut", this.playerServices)
  }
}
</script>
<style>
.error {
  background-color: #bb4353;
  padding-left: 2px;
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
