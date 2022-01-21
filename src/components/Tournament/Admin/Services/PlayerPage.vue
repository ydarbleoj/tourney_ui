<template>
  <v-card flat>
    <v-container class="bg">
      <v-layout row>
				<v-flex xs3>
          <BackButton
            :routeName="'AdminServicePage'"
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
                  Handicap {{ this.handicap }}
                </span>
              </h3>
						</v-flex>
            <v-flex xs5 class="text-xs-center" style="color:#F8C977">
              <div class="place-wrap">
              </div>
            </v-flex>
					</v-layout>
          <v-layout row align-end mt-5>
             <v-flex xs5 class="text-xs-left">
              <h2 style="font-weight:400;">
                Status:
                 <v-icon
                  style="height:24px;width:24px;border-radius:50%"
                  :class="[this.status ? 'success' : 'error']"
                >
                  {{ this.status ? 'mdi-check' : 'mdi-close' }}
                </v-icon>
              </h2>
            </v-flex>
          </v-layout>
				</v-flex>
			</v-layout>
		</v-container>
    <PlayerTable />
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
import PlayerTable from './PlayerTable'
import BackButton from '../../../BackButton'

export default {
  name: "PlayerServicePage",
  components: {
    PlayerTable,
    BackButton
  },
  data () {
    return {
      playerName: "",
      handicap: "",
      status: true
    }
  },

  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament,
      playerServices: state => state.admin.playerServices,
    })
  },

  methods: {
    getStatus () {
      const status = this.playerServices.status
      return status
    },
     backParams () {
      return { id: this.currentTournament.id }
    }
  },

  mounted () {
    this.$store.dispatch('admin/LOAD_PLAYER_SERVICES', {
      tournId: this.currentTournament.id,
      id: this.$route.params.leaderboard_id
    }).then(response => {
      this.playerName = this.playerServices.username
      this.handicap = this.playerServices.handicap
      this.status = this.playerServices.status
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
