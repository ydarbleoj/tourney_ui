<template>
  <v-app class="home-container" color="white">
    <main>
      <v-container height="100%" color="white" text-xs-center class="pa-0">
        <component :is="view" @toggleView="changeView" />
      </v-container>
    </main>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Build from '../Create/Build'
import Round from '../Create/Round'

export default {
  name: 'index',
  components: {
    Build,
    Round
  },
  computed: {
    ...mapState(['roundList']),
  },

  data () {
    return {
      view: "build",
    }
  },

  methods: {
    changeView (v) {
      this.view = v
    },
  },

  created: function () {

  },

}

</script>
<style>
.admin--profile_button {
  background-color: #74C9D7;
  color: #FBFCFD;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}
.rounded-card {
  border-radius: 9px;
}
.home-container {
  background-color: white;
}
</style>