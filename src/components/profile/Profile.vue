<template>
  <v-card class="default-bg" flat>
    <v-navigation-drawer
      v-model="menuVisible"
      absolute
      right
      temporary
      class="hide-scrollbar"
      style="width:100%;height:100vh;overflow-y:scroll;overflow-x:hidden;position:fixed;"
    >
      <v-list>
        <v-list-item v-for="(item, index) in computedMenuItems" :key="index">
          <div v-if="!item.children" @click="navigateTo(item.route)">
            <h1 style="font-size:35px">{{ item.title }}
              <span class="pl-1" style="font-size:25px">
                <v-icon class="pl-2 pb-1 bandon-orange-color">mdi-chevron-right</v-icon>
              </span>
            </h1>
          </div>
          <v-list-group class="custom-list-group" v-else no-action>
            <template v-slot:activator="{ props }">
              <v-list-item class="pl-0" v-bind="props">
                <h1 style="font-size:35px">{{ item.title }}</h1>
              </v-list-item>
            </template>
            <v-row style="width:100%">
              <v-list-item
                v-for="(yearItem, yearIndex) in item.children"
                :key="yearIndex"
                :value="yearItem.title"
                @click="navigateTo(yearItem.id)"
                class="v-col v-col-6"
              >
                <h1 style="font-size:35px">
                  {{ yearItem.title }}
                  <span class="pl-1" style="font-size:25px">
                    <v-icon class="pl-2 pb-1 bandon-orange-color">mdi-chevron-right</v-icon>
                  </span>
                </h1>
              </v-list-item>
            </v-row>
          </v-list-group>
        </v-list-item>
      </v-list>
      <v-btn
        text
        @click="menuVisible = false"
        class="close-drawer-btn default-bg"
        style="font-size: 30px; color: #666; height:7vh"
      >
        Close
      </v-btn>
    </v-navigation-drawer>

    <div class="pt-3 pl-4">
      <v-icon @click="displayMenu()">
        <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 2H40" stroke="currentColor" stroke-width="4"/>
          <path d="M0 22H20" stroke="currentColor" stroke-width="4"/>
        </svg>
      </v-icon>
    </div>

    <v-container class="pa-0">
      <v-row class="mb-5 mt-5 text-center">
        <v-col cols="12">
          <ImageContainer
            v-if="loaded"
            :name="$auth.user().username"
            :subtext="$auth.user().home"
            :playerUrl="playerAvatar"
            :classType="'player-profile'"
          />
        </v-col>
      </v-row>
      <v-row class="pt-5">
        <v-col cols="12">
          <v-row>
            <v-col cols="12" class="less-neutral-gray">
              <h2 class="pl-3 font-weight-regular">Your Bandon</h2>
              <h2 class="pl-3 font-weight-regular">History</h2>
              <v-divider class="mt-3"></v-divider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <h3 class="pl-5 font-weight-regular">Appearances</h3>
              <h1 class="bandon-orange-color text-center">{{ appearances }}</h1>
            </v-col>
            <v-col cols="8" class="font-weight-regular text-center">
              <h3 class="font-weight-regular">Earnings</h3>
              <v-row>
                <v-col cols="6" class="text-center pb-0">
                  <h1 class="bandon-orange-color font-weight-regular">
                    <span class="dollar">$</span>{{ total_earnings }}
                  </h1>
                </v-col>
                <v-col cols="6" class="pb-0 text-center">
                  <h1 class="pb-0 bandon-orange-color font-weight-regular underline-text">
                    <span class="dollar">$</span>{{ avg_earnings }}
                  </h1>
                </v-col>
                <v-col cols="6" class="text-center pt-0">
                  <h3 class="font-weight-regular pt-0 neutral-gray">Total</h3>
                </v-col>
                <v-col cols="6" class="text-center">
                  <h3 class="font-weight-regular pt-0 neutral-gray">Avg</h3>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="mt-5 pa-5 font-weight-regular">
        <v-col cols="12" class="pa-5 rounded-border-tourney">
          <h2>Tourney</h2>
          <v-divider class="mt-3"></v-divider>
          <v-row>
            <v-col cols="7" class="mt-5 text-center pt-5">
              <h2 class="text-h2 pb-0 mb-0 bandon-orange-color mt-5">{{ net_avg }}</h2>
              <h4 class="less-neutral-gray">Per Round Avg</h4>
            </v-col>
            <v-col cols="5" class="mt-5 text-center">
              <h3 class="font-weight-regular bandon-dark-color underline-text mb-2">Finishing</h3>
              <div class="text-left pa-0">
                <h3 class="bandon-orange-color">
                  <span class="pr-4 less-neutral-gray">Best</span>{{ best_stroke_finish }}
                </h3>
                <h3 class="bandon-orange-color">
                  <span class="pr-2 less-neutral-gray">Worst</span>{{ worst_stroke_finish }}
                </h3>
                <h3 class="bandon-orange-color">
                  <span class="pr-5 less-neutral-gray">Avg</span>{{ average_stroke_finish }}
                </h3>
              </div>
            </v-col>
            <v-col cols="8" class="font-weight-regular text-center">
              <h3 class="font-weight-regular underline-text">Earnings</h3>
              <v-row>
                <v-col cols="6" class="text-center pb-0">
                  <h3 class="pb-0 bandon-orange-color font-weight-regular underline-text">
                    <span class="dollar pr-1">$</span>{{ total_stroke_earnings }}
                  </h3>
                </v-col>
                <v-col cols="6" class="pb-0 text-center">
                  <h3 class="pb-0 bandon-orange-color font-weight-regular underline-text">
                    <span class="dollar pr-1">$</span>{{ avg_stroke_earnings }}
                  </h3>
                </v-col>
                <v-col cols="6" class="text-center pt-0 mt-0">
                  <h3 class="font-weight-regular pt-0 neutral-gray">Total</h3>
                </v-col>
                <v-col cols="6" class="text-center pt-0 mt-0">
                  <h3 class="font-weight-regular pt-0 neutral-gray">Avg</h3>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="putting-bg bandon-dark-color mt-5">
        <v-col cols="12" class="pa-5">
          <h2 class="pl-5">Putting</h2>
          <v-divider class="mt-3"></v-divider>
        </v-col>
        <v-row class="pl-5">
          <v-col cols="5" class="pl-5 mt-5 text-center">
            <h3 class="font-weight-regular bandon-dark-color underline-text mb-2">Finishing</h3>
            <div class="text-left pa-0">
              <h3 class="default-color">
                <span class="less-neutral-gray pl-3 pr-3">Best</span>{{ best_putting }}
              </h3>
              <h3 class="default-color">
                <span class="pl-3 pr-1 less-neutral-gray">Worst</span>{{ worst_putting }}
              </h3>
              <h3 class="default-color">
                <span class="pl-3 pr-4 less-neutral-gray">Avg</span>{{ average_putting_finish }}
              </h3>
            </div>
          </v-col>
          <v-col cols="7" class="mt-5 text-center pt-5">
            <h2 class="text-h2 pb-0 mb-0 default-color mt-5">{{ average_putting }}</h2>
            <h4 class="pt-1 less-neutral-gray">Per Round Avg</h4>
            <h3 class="default-color">{{ average_three_putts }}<span class="pl-2 less-neutral-gray">3 putts</span></h3>
          </v-col>
          <v-col cols="4"></v-col>
          <v-col cols="8" class="mb-5 font-weight-regular text-center">
            <h3 class="font-weight-regular underline-text">Earnings</h3>
            <v-row>
              <v-col cols="6" class="text-center pb-0">
                <h3 class="pb-0 default-color font-weight-regular underline-text">
                  <span class="dollar pr-1">$</span>{{ total_putting_earnings }}
                </h3>
              </v-col>
              <v-col cols="6" class="pb-0 text-center">
                <h3 class="pb-0 default-color font-weight-regular underline-text">
                  <span class="dollar pr-1">$</span>{{ avg_putting_earnings }}
                </h3>
              </v-col>
              <v-col cols="6" class="text-center pt-0 mt-0">
                <h3 class="font-weight-regular pt-0 less-neutral-gray">Total</h3>
              </v-col>
              <v-col cols="6" class="text-center pt-0 mt-0">
                <h3 class="font-weight-regular pt-0 less-neutral-gray">Avg</h3>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-row>
      <v-row class="bandon-dark-color">
        <v-col cols="12" class="pa-5">
          <h2 class="pl-5">Skins</h2>
          <v-divider class="mt-3"></v-divider>
        </v-col>
        <v-col cols="5" class="pl-5 text-center">
          <h3 class="font-weight-regular bandon-dark-color underline-text mb-2">Tournament</h3>
          <div class="text-left pa-0">
            <h3 class="bandon-orange-color">
              <span class="less-neutral-gray pl-3 pr-1">Best</span>{{ best_skins }}
            </h3>
            <h3 class="bandon-orange-color">
              <span class="pl-3 pr-1 less-neutral-gray">Avg</span>{{ average_skins }}
            </h3>
          </div>
        </v-col>
        <v-col cols="7" class="mt-5 text-center pt-5">
          <h2 class="text-h2 pb-0 mb-0 bandon-orange-color">{{ all_time_skins }}</h2>
          <h4 class="pt-1 less-neutral-gray">All Time</h4>
        </v-col>
        <v-col cols="4"></v-col>
        <v-col cols="8" class="mb-5 font-weight-regular text-center">
          <h3 class="font-weight-regular underline-text">Earnings</h3>
          <v-row>
            <v-col cols="6" class="text-center pb-0">
              <h3 class="pb-0 bandon-orange-color font-weight-regular underline-text">
                <span class="dollar pr-1">$</span>{{ total_skins_earnings }}
              </h3>
            </v-col>
            <v-col cols="6" class="pb-0 text-center">
              <h3 class="pb-0 bandon-orange-color font-weight-regular underline-text">
                <span class="dollar pr-1">$</span>{{ average_skins_earnings }}
              </h3>
            </v-col>
            <v-col cols="6" class="text-center pt-0 mt-0">
              <h3 class="font-weight-regular pt-0 less-neutral-gray">Total</h3>
            </v-col>
            <v-col cols="6" class="text-center pt-0 mt-0">
              <h3 class="font-weight-regular pt-0 less-neutral-gray">Avg</h3>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <!-- <RecordsAndNotables
        :tournamentRecords="tournament_records"
        :courseRecords="[]"
      /> -->
      <v-row
        class="bx-shadow pa-3 mb-4"
        style="border-radius: 25px"
        @click="toSettings()"
      >
        <v-col cols="8">
          <h1 class="font-weight-medium" style="color: #666">Settings</h1>
        </v-col>
        <v-col cols="4" class="text-right">
          <v-icon color="#666"> mdi-chevron-right </v-icon>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog
      v-model="dialog"
      :class="[dialog == false ? 'hide-dialog' : 'display-dialog']"
    >
      <v-card>
        <v-row>
          <v-col cols="12">
            <h2 class="font-weight-regular pa-3 mb-1">
              It's game time! Bandon {{ this.currentTournament.year }}
            </h2>
            <h3 class="font-weight-regular pa-3">
              To get started, please enter your current handicap.
            </h3>
            <h3 class="font-weight-regular pa-3">
              If you don't have one, consider your average and then subtract 3.
            </h3>
            <h3 class="font-weight-regular pa-3">
              Your handicap for this year will be 90% of what you enter here.
            </h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" pa-4>
            <v-text-field
              name="handicap"
              label="Handicap"
              v-model="hcap"
              placeholder="max 36.2"
            >
            </v-text-field>
            <v-card-actions>
              <v-btn
                class="mt-3"
                style="border-radius: 15px; width: 100px"
                color="orange"
                @click="updateHandicap"
                >Save</v-btn
              >
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions } from 'pinia'
import { mapState } from 'pinia'
import { useProfileStore } from "@/store/profile";
import { useTournamentStore } from "@/store/tournament";
import RecordsAndNotables from "./RecordsAndNotables.vue";
import ImageContainer from "./ImageContainer.vue";

export default {
  name: "Profile",
  components: {
    ImageContainer,
    RecordsAndNotables,
  },
  data() {
    return {
      years: [
        { title: "2020", route: "/tournament/6" },
        { title: "2019", route: "/tournament/5" },
      ],
      menuVisible: false,
      hcap: "",
      loaded: false,
      show: false,
      dialog: false,
      userId: this.$auth.user().id,
      hcap_diff: 0,
      gross_avg: 0,
      total_net: 0,
      overall_rank: 0,
      current_rank: 0,
      course_name: "",
      year: "",
      appearances: 0,
      total_earnings: 0,
      avg_earnings: 0,
      average_stroke_finish: 0,
      best_stroke_finish: 0,
      best_finish_stroke_qty: 0,
      worst_stroke_finish: 0,
      net_avg: 0,
      avg_stroke_earnings: 0,
      total_stroke_earnings: 0,
      average_putting: 0,
      average_three_putts: 0,
      best_putting: 0,
      average_putting_finish: 0,
      worst_putting: 0,
      best_putting_quantity: 0,
      avg_putting_earnings: 0,
      total_putting_earnings: 0,
      average_skins: 0,
      best_skins: 0,
      all_time_skins: 0,
      average_skins_earnings: 0,
      total_skins_earnings: 0,
      tournament_records: [],
      username: "",
      playerAvatar: "",
      home: "Portland, OR",
    };
  },

  computed: {
    ...mapState(useProfileStore, ["userProfile", "menuData", "profileData"]),
    ...mapState(
      useTournamentStore,
      ["currentTournament", "handicapMessage", "renderHandicap"]
    ),
    computedMenuItems() {
      return [
        { title: "Profile", route: "/profile" },
        { title: "Records", route: "/tournament_records" },
        { title: "Past Tournaments", children: this.years },
      ];
    }
  },

  methods: {
    ...mapActions(useProfileStore, ["loadProfileData"]),
    ...mapActions(useTournamentStore, ["loadTournamentList"]),
    updateHandicap: function (event) {
      this.$store
        .dispatch("UPDATE_HANDICAP", {
          tournId: this.currentTournament.id,
          leaderboardId: this.$auth.user().id,
          handicap: this.hcap,
        })
        .then((res) => {
          this.dialog = false;
        });
    },
    fetch() {
      this.$auth.fetch({
        success() {
          console.log("success " + $auth.user());
        },
        error() {
          console.log("error " + this.context);
        },
      });
    },
    toScorecards() {
      if (this.getRenderHandicap) {
        this.dialog = true;
        return;
      }

      this.$router.push({
        name: "ProfileScorecards",
        params: {
          id: this.userId
        }
      });
    },
    toBandon() {
      if (this.getRenderHandicap) {
        this.dialog = true;
        return;
      }

      this.$router.push({
        name: "Tournament",
        params: {
          id: this.currentTournament.id,
        },
      });
    },
    toSettings() {
      if (this.getRenderHandicap) {
        this.dialog = true;
        return;
      }

      this.$router.push({
        name: "ProfileEdit",
        params: {
          id: this.userId,
        },
      });
    },
    displayMenu() {
      document.body.classList.add("no-scroll");
      const data = this.menuData.map((tournament) => ({
        title: tournament.year.toString(),
        id: tournament.id,
      }))

      this.years = data
      this.menuVisible = !this.menuVisible;
    },
    navigateTo(id) {
      console.log('id', id)
      this.$router.push({
        name: "Tournament",
        params: {
          id: id,
        },
      });

      this.menuVisible = false; // Close drawer after navigation
    },
    setProfileData() {
      if (this.profileData !== null) {
        const tournamentBreakdown = this.userProfile.tournament_breakdown;
        const tourney = this.userProfile.tourney_breakdown;
        console.log("tourney", this.userProfile)
        this.appearances = tournamentBreakdown.appearance;
        this.avg_earnings = tournamentBreakdown.average_earnings;
        this.total_earnings = tournamentBreakdown.total_earnings;
        this.best_stroke_finish = tourney.best_finish;
        this.best_finish_stroke_qty = tourney.best_finish_quantity;
        this.worst_stroke_finish = tourney.worst_finish;
        this.average_stroke_finish = tourney.average_finish;
        this.net_avg = tourney.average_net;
        this.avg_stroke_earnings = tourney.average_earnings;
        this.total_stroke_earnings = tourney.total_earnings;

        const puttingBreakdown = this.userProfile.putting_breakdown;
        this.average_putting = puttingBreakdown.average_putting;
        this.average_three_putts = puttingBreakdown.average_3_putts;
        this.best_putting = puttingBreakdown.best_putting;
        this.best_putting_quantity = puttingBreakdown.best_putting_quantity;
        this.worst_putting = puttingBreakdown.worst_putting;
        this.average_putting_finish = puttingBreakdown.average_finish;
        this.avg_putting_earnings = puttingBreakdown.average_putting_earnings;
        this.total_putting_earnings = puttingBreakdown.total_putting_earnings;

        const skinsBreakdown = this.userProfile.skins_breakdown;
        this.average_skins = skinsBreakdown.average_skins;
        this.best_skins = skinsBreakdown.best_skins;
        this.all_time_skins = skinsBreakdown.alltime;
        this.average_skins_earnings = skinsBreakdown.average_skins_earnings;
        this.total_skins_earnings = skinsBreakdown.total_skins_earnings;
        this.tournament_records = this.userProfile.tournament_records;
        this.playerAvatar = this.userProfile.avatar
        this.loaded = true;
      }
    },
  },

  created: function () {
    this.loadProfileData().then(() => {
      this.setProfileData();
      this.loadTournamentList()
    });
  },
};
</script>
<style>
html.no-scroll, html.no-scroll body {
  overflow: hidden !important;
  touch-action: none !important;
  height: 100% !important;
}
.scoring-row {
  background-color: #f7f7f7;
  padding: 5px;
}
.title-text {
  color:black;
  font-size: 20px;
}

.number-text {
  font-size: larger; /* Adjust as needed */
  font-weight: bold;
}

.handicap-diff {
  width: 40%;
}
.bx-shadow {
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
}
.rounded-border-tourney {
  border-radius: 10px;
  border: 2px solid #9FB8CE;
}
.hide-dialog {
  display: none;
}
.dollar {
  font-size: 20px;
  color: #666;
}
.display-dialog {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}
.close-drawer-btn {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.v-navigation-drawer {
  background-color: #f7f7f7;
  transition-duration: 0.5s; /* Adjust the duration as needed */
  transition-timing-function: ease; /* This creates a smooth transition */
}
.custom-list-group .v-icon {
  color: #cf8018; /* Replace with your desired color */
}
.hide-scrollbar {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;

  /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
