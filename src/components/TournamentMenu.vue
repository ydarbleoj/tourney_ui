<template>
  <v-card flat class="tournament-menu-cards">
    <v-card-title pa-0 ma-0>
      <h1 class="black-text font-weight-regular">Bandon</h1>
      <h3
        class="black-text font-weight-medium"
        style="border-bottom: 1px solid #f8c977"
      >
        {{ displayYear }}
      </h3>
    </v-card-title>
    <v-card-text v-if="open">
      <v-card
        :class="{ overlay: open }"
        class="d-flex flex-column"
        align="end"
        flat
        transition="fade-transition"
      >
        <v-col cols="12" pr-2>
          <v-card
            v-for="item in items"
            class="flex pt-3 pb-3 pr-5 text-right"
            :key="item['id']"
            @click="updateTournament(item)"
            flat
            transition="fade"
            reverse-trasition="fade"
          >
            <h1
              style="font-size: 28px"
              class="font-weight-regular"
              :class="{ active: isActive(item.attributes.year) }"
            >
              {{ item.attributes.year }}
            </h1>
          </v-card>
          <v-card class="flex pt-3 pb-3 pr-5 text-right" @click="toOverall()" flat>
            <h1 style="font-size: 28px" class="font-weight-regular">Overall</h1>
          </v-card>
          <v-card-text>
            <v-card class="flex pt-4 text-center" @click="toggleMenu" flat>
              <h1 style="font-size: 28px" class="font-weight-regular">Close</h1>
            </v-card>
          </v-card-text>
        </v-col>
      </v-card>
    </v-card-text>
    <v-spacer></v-spacer>
  </v-card>
</template>

<script>
import { mapState } from "pinia";
import { mapActions } from "pinia";
import { useTournamentStore } from "@/store/tournament";

export default {
  name: "TournamentMenu",
  computed: {
    ...mapState(useTournamentStore, ["currentTournament", "tournaments"]),
  },

  data() {
    return {
      open: false,
      loading: false,
      overlay: "overlay",
      active: false,
      items: [],
      displayYear: "",
    };
  },

  methods: {
    ...mapActions(useTournamentStore, ["updateCurrentTournament"]),
    toggleMenu() {
      this.open = !this.open;
    },
    isActive(year) {
      return year === this.currentTournament.year;
    },
    updateItemsList() {
      let tourns = this.tournaments.slice().reverse();
      this.items = tourns;
    },
    toOverall() {
      // this.loading = true
      // this.$store.dispatch(
      //   'leaderboards/overall/loadPreviewLeaderboard'
      // ).then(response => {
      //   this.loading = false
      //   this.open = false
      //   this.displayYear = "Overall"
      //   this.$router.push(
      //     {
      //       name: "Tournament",
      //       params: {
      //         id: "overall"
      //       }
      //     }
      //   )
      //   this.$emit("overallPage", true)
      // })
    },
    updateTournament(item) {
      console.log("thismenu", item)
      this.loading = true;
      this.updateCurrentTournament(item);
      this.loading = false;
      this.displayYear = this.currentTournament.year;
      this.open = false;
      this.$router.push({
        name: "Tournament",
        params: {
          id: item.id,
        },
      });
    },
  },

  mounted: function () {
    if (this.$route.params.id === "overall") {
      this.displayYear = "Overall";
    } else {
      this.displayYear = this.currentTournament.year;
    }
    this.updateItemsList();
  },
};
</script>
<style>
.tournament-menu-card {
  position: relative;
  height: 60px;
}
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 1;
  z-index: 10;
  background-color: #f8c977;
}
.active {
  color: #f8c977;
}
.fade-enter-active,
.fade-leave-active {
  transition-timing-function: ease-out;
  transition: 0.25s;
  transform: translateY(0);
}
/* transition: opacity 1s; */
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
