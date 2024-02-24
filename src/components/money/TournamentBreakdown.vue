<template>
  <v-container class="default-bg">
    <v-row>
      <v-col cols="12">
        <h1 class="pl-5 pt-5">The Purse</h1>
      </v-col>
    </v-row>
    <v-row class="pa-5 pt-0">
      <v-col cols="5" class="bandon-dark-color">
        <div>
          <h2 class="text-left font-weight-regular">
            Total
          </h2>
          <h3 class="font-weight-regular less-neutral-gray text-right">
            $ {{ total }}
          </h3>
        </div>
      </v-col>
      <v-col cols="5">
        <div>
          <h2 class="text-left font-weight-regular">
            Earned
          </h2>
          <h2 class="font-weight-regular less-neutral-gray text-right">
            $ {{ yourShare }}
          </h2>
        </div>
      </v-col>
      <v-col cols="5" class="bandon-dark-color">
        <div>
          <h2 class="text-left font-weight-regular">
            Remaining
          </h2>
          <h3 class="font-weight-regular bandon-orange-color text-right">
            $ {{ remaining }}
          </h3>
        </div>
      </v-col>
      <v-col cols="5">
        <div>
          <h2 class="text-left font-weight-regular">
            Contributed
          </h2>
          <h2 class="font-weight-regular bandon-orange-color text-right">
            $ {{ yourContributions }}
          </h2>
        </div>
      </v-col>
    </v-row>
    <v-divider class="divider"></v-divider>
    <h3 class="pl-5 mt-5">
      The money breakdown is as follows:
    </h3>
    <v-row class="pl-5 pb-5 mt-2 mb-5">
      <v-col cols="4" class="pt-5">
        <div>
          <h4 class="text-left font-weight-regular">
            Tourney $
            <span class="less-neutral-gray">
              {{ tourney }}
            </span>
          </h4>
          <ul class="pl-2" style="text-decoration:none; list-style-type: none;">
            <li>
              1st: ${{ tourney * 0.4 }}
            </li>
            <li>
              2nd: ${{ tourney * 0.3 }}
            </li>
            <li>
              3rd: ${{ tourney * 0.2 }}
            </li>
            <li>
              4th: ${{ tourney * 0.1 }}
            </li>
          </ul>
        </div>
      </v-col>
      <v-col cols="8" class="pt-5 pl-0">
        <div>
          <h4 class="text-left font-weight-regular">
            Putting $
            <span class="bandon-orange-color">
              {{ putting }}
            </span>
          </h4>
          <p class="pl-2">Fewest putts wins the 3 putt pot!</p>
        </div>
        <div>
          <h4 class="text-left font-weight-regular">
            Team $
            <span class="less-neutral-gray">
              {{ team }}
            </span>
          </h4>
          <p class="pl-2">$50 a player for the winning side.</p>
        </div>
        <div>
          <h4 class="text-left font-weight-regular">
            Skins $
            <span class="less-neutral-gray">
              {{ skins }}
            </span>
          </h4>
          <p class="pl-2">$100 a day / number of skins divvied out to each winner.</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "pinia";
import { useLeaderboardsStore } from "../../store/leaderboards";

export default {
  name: "TournamentBreakdown",
  computed: {
    ...mapState(useLeaderboardsStore, ["moneyBreakdown"]),
  },
  data() {
    return {
      total: 0,
      remaining: 0,
      putting: 0,
      tourney: 0,
      skins: 0,
      team: 0,
      yourShare: 0,
      yourContributions: 0,
    };
  },
  mounted() {
    const breakdown = this.moneyBreakdown;
    console.log(breakdown);
    if (!breakdown) return;

    this.total = breakdown.total;
    this.remaining = breakdown.remaining;
    this.putting = breakdown.putting;
    this.tourney = breakdown.tourney;
    this.skins = breakdown.skins;
    this.team = breakdown.team;
    this.yourShare = breakdown.your_share;
    this.yourContributions = breakdown.your_contributions;
  },
};
</script>
