<template>
  <v-card flat v-if="loading" class="white" color="white"> loading... </v-card>
  <v-card flat v-else>
    <v-container class="stroke-bg">
      <v-row>
        <v-col cols="3">
          <BackButton
            :routeName="'StrokeLeaderboard'"
            :routeParams="{ id: currentTournament.id }"
          />
        </v-col>
        <v-col cols="6" class="text-center">
          <h2 style="font-weight: 300">Player Profile</h2>
        </v-col>
      </v-row>
      <v-row class="mt-3">
        <v-col cols="12">
          <v-row align="center">
            <v-col cols="8">
              <img src="" class="profile-image" align="left" />
              <h2 class="">
                {{ playerName }}
                <br />
                <span class="info-span text-left">
                  Handicap {{ handicapIndex }}
                </span>
              </h2>
            </v-col>
            <v-col cols="4" class="text-left">
              <div class="place-wrap bandon-orange-color">
                <h1 style="font-weight: 300; font-size: 80px">
                  {{ getPosition() }}
                  <span>{{ getOrdinal() }}</span>
                </h1>
                <h3 class="bandon-dark-color">Movement</h3>
                <h1 style="font-size: 30px" class="default-color font-weight-regular">
                  <v-icon v-if="movementUp()" color="green" style="font-size: 40px">
                    mdi-arrow-up
                  </v-icon>
                  <v-icon v-if="movementDown()" color="red" style="font-size: 40px">
                    mdi-arrow-down
                  </v-icon>
                  {{
                    strokePlayer.movement == 0 || strokePlayer.dnf
                      ? ""
                      : strokePlayer.movement
                  }}
                </h1>
              </div>
            </v-col>
          </v-row>
          <v-row align="end" class="mt-3">
            <v-col cols="7" class="text-left">
              <h2 style="font-weight: 400">
                Status:
                <span class="white--text">{{ getStatus() }}</span>
              </h2>
            </v-col>
            <v-col cols="5" class="text-center">
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-row align="center" class="text-center pt-2 pb-4 mt-3 mr-3 ml-3">
      <v-col cols="12" class="text-left ml-2">
        <h2 class="pl-2 mb-2 font-weight-regular">Historical Averages</h2>
      </v-col>
      <v-row wrap align="center">
        <v-col cols="12">
          <v-row wrap ml-3>
            <v-col cols="4">
              <h1 class="font-weight-regular">
                {{ avg1 }}
              </h1>
              <h3 style="color: #444" class="font-weight-regular">Round 1</h3>
            </v-col>
            <v-col cols="4">
              <h1 class="font-weight-regular">
                {{ avg2 }}
              </h1>
              <h3 style="color: #444" class="font-weight-regular">Round 2</h3>
            </v-col>
            <v-col cols="4">
              <h1 class="font-weight-regular">
                {{ avg3 }}
              </h1>
              <h3 style="color: #444" class="font-weight-regular">Round 3</h3>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-row>
    <h2 class="font-weight-regular pl-4 ml-2 pb-3 pt-2">Weekly Averages</h2>
    <v-row
      align="center"
      class="text-center pt-2 pb-4 mt-2 mb-4 mr-3 ml-3"
      style="background-color: #999; border-radius: 10px"
    >
      <v-col cols="12" class="text-left ml-2">
        <h3 class="white--text pl-2 mb-2 font-weight-regular">Greens in Reg</h3>
      </v-col>
      <v-row>
        <v-col cols="4" class="text-right pl-1">
          <h1 class="font-weight-regular stroke-color" style="font-size: 45px">
            {{ gnr }}%
          </h1>
        </v-col>
        <v-col cols="8" class="pr-5">
          <v-row>
            <v-col cols="4">
              <h1 class="font-weight-regular" style="color: white">{{ gnr1 }}%</h1>
              <h3 style="color: #444" class="font-weight-regular">Round 1</h3>
            </v-col>
            <v-col cols="4">
              <h1 class="font-weight-regular" style="color: white">{{ gnr2 }}%</h1>
              <h3 style="color: #444" class="font-weight-regular">Round 2</h3>
            </v-col>
            <v-col cols="4">
              <h1 class="font-weight-regular" style="color: white">{{ gnr3 }}%</h1>
              <h3 style="color: #444" class="font-weight-regular">Round 3</h3>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-row>
    <v-row align="center" class="text-center pt-2 pb-4 mt-2 mb-5 mr-3 ml-3">
      <v-col cols="12" class="text-left ml-2">
        <h3 class="pl-2 mb-2 font-weight-regular">Broken down by Par:</h3>
      </v-col>
      <v-row wrap align="center">
        <v-col cols="12">
          <v-row wrap ml-3>
            <v-col cols="4">
              <h1 class="font-weight-regular" :class="[par3Avg < 3 ? 'under-par' : '']">
                {{ par3Avg }}
              </h1>
              <h3 style="color: #444" class="font-weight-regular">Par 3's</h3>
            </v-col>
            <v-col cols="4">
              <h1 class="font-weight-regular" :class="[par4Avg < 4 ? 'under-par' : '']">
                {{ par4Avg }}
              </h1>
              <h3 style="color: #444" class="font-weight-regular">Par 4's</h3>
            </v-col>
            <v-col cols="4">
              <h1 class="font-weight-regular" :class="[par5Avg < 5 ? 'under-par' : '']">
                {{ par5Avg }}
              </h1>
              <h3 style="color: #444" class="font-weight-regular">Par 5's</h3>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-row>
  </v-card>
</template>
<script>
import { mapState } from "pinia";
import { mapActions } from "pinia";
import { useTournamentStore } from "@/store/tournament";
import { useLeaderboardsStore } from "@/store/leaderboards";
import BackButton from "@/components/BackButton.vue";

export default {
  name: "StrokePlayerPage",
  components: {
    BackButton,
  },
  data() {
    return {
      loading: true,
      playerName: "",
      handicapIndex: 0,
      position: 0,
      gnr: 0,
      gnr1: 0,
      gnr2: 0,
      gnr3: 0,
      par3Avg: 0,
      par4Avg: 0,
      par5Avg: 0,
      avg1: 0,
      avg2: 0,
      avg3: 0,
    };
  },

  computed: {
    ...mapState(useTournamentStore, ["currentTournament"]),
    ...mapState(useLeaderboardsStore, ["strokePlayer", "isLoaded"]),
  },

  methods: {
    ...mapActions(useLeaderboardsStore, ["loadStrokePlayer", "resetStrokePlayer"]),
    getStatus() {
      const status = this.strokePlayer.dnf ? "DNF" : "Active";
      return status;
    },
    getOrdinal() {
      if (this.position !== undefined) {
        let newString = this.position.toString().replace(/[0-9]/g, "");
        return newString;
      }
    },
    getPosition() {
      return parseInt(this.position);
    },
    movementUp() {
      if (this.strokePlayer.movement > 0) {
        return true;
      }
    },
    movementDown() {
      if (this.strokePlayer.dnf) {
        return false;
      }
      if (this.strokePlayer.movement < 0) {
        return true;
      }
    },
		loadInfo() {
			this.playerName = this.strokePlayer.username;
			this.handicapIndex = this.strokePlayer.handicap;
			this.position = this.strokePlayer.current_position;
			this.gnr = this.strokePlayer.greens_in_reg;
			this.gnr1 = this.strokePlayer.round1_gnr;
			this.gnr2 = this.strokePlayer.round2_gnr;
			this.gnr3 = this.strokePlayer.round3_gnr;
			this.par3Avg = this.strokePlayer.par3_average;
			this.par4Avg = this.strokePlayer.par4_average;
			this.par5Avg = this.strokePlayer.par5_average;
			this.avg1 = this.strokePlayer.round1_average;
			this.avg2 = this.strokePlayer.round2_average;
			this.avg3 = this.strokePlayer.round3_average;
		}
  },
  created() {
    this.loadStrokePlayer(this.currentTournament.id, this.$route.params.leaderboard_id).then(() => {
		  this.loadInfo();
      this.loading = false;
    });
  },
	unmounted() {
		this.resetStrokePlayer();
	}
};
</script>
<style scoped>
.bg {
  background-color: #9fb8ce;
}
.under-par {
  color: red;
}
.wrap-info {
  margin-top: 10px;
  font-weight: 400;
  font-size: 20px;
  color: white;
}
.info-span {
  font-size: 16px;
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
