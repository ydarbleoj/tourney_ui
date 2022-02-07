<template>
  <leaderboards />
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Leaderboards from './Leaderboards/index'
import TournamentMenu from '../../components/TournamentMenu'
import BackButton from '../BackButton'

export default {
  name: 'TournamentOverall',
  components: {
    BackButton,
    Leaderboards,
    TournamentMenu
  },

  data () {
    return {}
  },

  mounted () {
    console.log("overall")
  }
}
</script>
<style>
a {
  color: black;
  text-decoration: none;
}
.tournament-wrapper {
  overflow:hidden;
  background-color: white;
}
</style>