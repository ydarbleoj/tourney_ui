<template>
  <v-row style="height:60vh" class="mt-5 skins-bg pa-0">
    <v-col cols="12">
      <v-row
         :style="backgroundStyle">
        <v-col cols="12" class="text-left pl-5">
          <h1 class="default-color">{{ position1Name }}</h1>
          <h1 class="default-color">Round {{ position1Number }}</h1>
        </v-col>
        <div class="date-details pl-5 default-color">
          <h2>{{ position1Date }}</h2>
        </div>
        <div class="more-details default-color pr-2">
          <h3 class="underline-text mb-3" @click="toScorecard()">Scorecard
            <span class="pl-5">
              <v-icon>mdi-chevron-right</v-icon>
            </span>
          </h3>

          <h3 class="underline-text" @click="toRound()">More Details
            <span>
              <v-icon>mdi-chevron-right</v-icon>
            </span>
          </h3>
        </div>
      </v-row>
      <v-row class="bandon-dark-color pt-5 text-center">
        <v-col cols="6">
          <h2>{{ position2Name}}</h2>
          <h4>
            Round {{ position2Number }}
            <span class="pl-5 default-color">
              <v-icon>mdi-chevron-right</v-icon>
            </span>
          </h4>
        </v-col>
        <v-col cols="6">
          <h2>{{ position3Name }}</h2>
          <h4>Round {{ position3number }}
            <span class="pl-5 default-color">
              <v-icon>mdi-chevron-right</v-icon>
            </span>
          </h4>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "pinia";
import { useLeaderboardsStore } from "@/store/leaderboards";

export default {
  components: {
  },
  computed: {
    ...mapState(useLeaderboardsStore, ["courseInfo"]),
    backgroundStyle() {
      return {
        height: '60%',
        backgroundImage: `url(${this.backgroundImageUrl})`,
        backgroundSize: 'cover'
      };
    }
  },
  data() {
    return {
      loading: true,
      nextScorecardId: null,
      position1Name: "Bandon Dunes",
      position1Number: 1,
      position1Date: "Fri",
      position2Name: "Pacific Dunes",
      position2Number: 2,
      position3Name: "Bandon Trails",
      position3number: 3,
      backgroundImageUrl: "https://www.bandondunesgolf.com/wp-content/uploads/2022/04/BandonDunes_CoursePreview.jpg"
    }
  },
  methods: {
    findByPosition(position) {
      return this.courseInfo.find((course) => course.position === position);
    },
    toScorecard() {
      console.log("toScorecard", this.nextScorecardId)
      console.log("id", this.$route.params.id)
      this.$router.push({
        name: "Scorecard",
        params: {
          id: this.$route.params.id,
          scorecard_id: this.nextScorecardId
        }
      });
    },
    toRound() {
      this.$router.push({
        name: "RoundInfo",
        params: {
          id: this.$route.params.id,
          round_id: this.nextScorecardId
        }
      });
    }
  },
  mounted() {
    console.log("courseInfo", this.courseInfo)
    if (this.courseInfo.length === 0) {
      this.$router.push({
        name: "Tournament",
        params: {
          id: this.$route.params.id
        }
      });
    }

    const position1 = this.findByPosition(1);
    const position2 = this.findByPosition(2);
    const position3 = this.findByPosition(3);

    this.nextScorecardId = position1.next_card_id;
    this.position1Name = position1.name;
    this.position1Number = position1.number
    this.position1Date = position1.date;
    this.position2Name = position2.name;
    this.position2Number = position2.number;
    this.position3Name = position3.name;
    this.position3number = position3.number;
    this.backgroundImageUrl = `../../../src/assets/${position1.course_id}course.jpg`;
    this.loading = false;
  }


}
</script>
<style scoped>
.relative {
  position: relative;
}
.more-details {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.date-details {
  position: absolute;
  bottom: 10px;
  left: 10px;
}
</style>