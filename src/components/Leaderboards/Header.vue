<template>
  <v-container class="pb-0 pt-4">
    <v-layout class="mb-6" no-gutters>
      <v-flex md="4">
        <BackButton />
      </v-flex>
    </v-layout>
    <v-layout no-gutters>
      <v-flex md="6" offset-md="3">
        <h3 class="text-xs-center font-weight-regular"> {{ year }} {{ name }}</h3>
        <h2 class="text-xs-center font-weight-medium mb-4">Leaderboard</h2>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex md="6" class="text-xs-right">
        <h4 class="font-weight-regular">Purse $
          <span class="font-weight-medium">{{ purse }}</span>
        </h4>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import BackButton from '../BackButton'

export default {
  name: 'Header',
  props: ['purse', 'name'],
  components: {
    BackButton
  },

  data () {
    return {
      year: "",
    }
  },

  computed: {
    ...mapState(['currentTournament']),
    ...mapGetters(['getTournament'])
  },

  mounted: function () {
    this.year = this.currentTournament.year
  }
}
</script>