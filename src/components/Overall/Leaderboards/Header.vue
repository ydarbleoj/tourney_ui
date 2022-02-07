<template>
  <v-container class="pb-0 pt-4">
    <v-layout class="mb-6" no-gutters>
      <v-flex md="4">
        <BackButton
          :routeName="'Tournament'"
          :routeParams="{ id: 'overall' }"
        />
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex class="pt-4 pb-2">
        <h1 class="text-xs-left font-weight-regular">Overall {{ name }}</h1>
        <h1 class="text-xs-left font-weight-medium mb-4">Leaderboard</h1>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex class="text-xs-right pb-2">
        <h3 class="font-weight-regular" style="color:#666;">Purse $
          <span style="font-size:20px;" class="font-weight-regular">{{ purse }}</span>
        </h3>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import BackButton from '../../BackButton'

export default {
  name: 'Header',
  props: ['purse', 'name'],
  components: {
    BackButton
  },

  data () {
    return {
      year: ""
    }
  },

  computed: {},
}
</script>