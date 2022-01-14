<template>
  <v-card flat>
    <v-container class="bg">
      <v-layout row>
				<v-flex xs3>
          <BackButton
            :routeName="'TournamentAdmin'"
            :routeParams="this.backParams()"
          />
        </v-flex>
        <v-flex xs6 class="text-xs-center white--text">
          <h2 style="font-weight:300;">Player Profile</h2>
        </v-flex>
      </v-layout>
			<v-layout row mt-3>
				<v-flex xs12>
					<v-layout row align-center>
						<v-flex xs7>
              <img src="/static/sand.jpg" class="profile-image" align="left" />
              <h3 class="wrap-info">
                {{ this.playerName }}
                <br>
                <span class="info-span text-xs-left">
                  Handicap {{ this.handicapIndex }}
                </span>
              </h3>
						</v-flex>
            <v-flex xs5 class="text-xs-center" style="color:#F8C977">
              <div class="place-wrap">
                <h1 style="font-weight:300;font-size:60px;">
                  {{ getPosition() }}
                  <span>{{ getOrdinal() }}</span>
                </h1>
              </div>
            </v-flex>
					</v-layout>
          <v-layout row align-end mt-5>
             <v-flex xs5 class="text-xs-left">
              <h2 style="font-weight:400;">
                Status:
                <span class="white--text">{{ getStatus() }}</span>
              </h2>
            </v-flex>
          </v-layout>
				</v-flex>
			</v-layout>
		</v-container>
    <PlayerEdit :user="this.playerPage" />
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
import PlayerEdit from '../PlayerEdit'
import BackButton from '../../../BackButton'

export default {
  name: "AdminPlayerPage",
  components: {
    PlayerEdit,
    BackButton
  },
  data () {
    return {
      playerName: "",
      handicapIndex: 0,
      position: 1,
    }
  },

  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament,
      playerPage: state => state.admin.adminPlayerPage,
    })
  },

  methods: {
    getStatus () {
      const status = this.playerPage.pending ? "Pending" : "Active";
      return status
    },
    getOrdinal () {
      let newString = this.position.toString().replace(/[0-9]/g, '');
      return newString
    },
    getPosition () {
      return parseInt(this.position)
    },
    backParams () {
      return { id: this.currentTournament.id }
    }
  },

  mounted () {
    console.log("back", this.backParams())
    this.$store.dispatch('admin/LOAD_PLAYER', {
      tournId: this.currentTournament.id,
      id: this.$route.params.leaderboard_id
    }).then(response => {
      this.playerName = this.playerPage.username
      this.handicapIndex = this.playerPage.handicap
      this.position = this.playerPage.current_position
    })
  }
}
</script>
<style lang="scss" scoped>
.bg {
  background-color: #449ce9;
}
.wrap-info {
  margin-top: 10px;
  font-weight: 400;
  font-size: 20px;
  color: white;
}
.info-span {
  font-size: 15px;
}
.profile-image {
  height: 75px;
  width: 75px;
  border-radius: 25px;
  margin-right: 10px;
}
.place-wrap {
  position: relative;
  display: inline-block;
}
.place-wrap span {
  position: absolute;
  font-size: 35px;
  margin-top: 10px;
}
</style>
