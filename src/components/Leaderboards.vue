<template>
  <v-container class="pl-0 pr-0 pt-5 pb-5">
    <v-row>
      <v-col cols="12" class="pb-5">
        <h1 class="pl-5 pb-5">Leaderboards</h1>
        <Carousel
          :itemsToShow="1.5"
          :mouseDrag="true"
          :hideArrows="true"
          :hideDots="true"
          :dragSpeed="900"
        >
          <Slide v-for="(item, index) in items" :key="index">
            <div style="width:100%;" class="ml-2 mr-2">
              <PreviewButton
                :current="current"
                :leaderboard="item.leaderboard"
                :link="item.link"
                :position="item.position"
                :title="item.title"
                :total="item.total"
              />
            </div>
          </Slide>
        </Carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useTournamentStore } from "@/store/tournament";
import { useLeaderboardsStore } from "@/store/leaderboards";
import PreviewButton from "./leaderboards/PreviewButton.vue"
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

export default {
  name: "Leaderboards",
  components: {
    Carousel,
    Slide,
    PreviewButton
  },

  data (){
    return {
      swipeDirection: 'None',
      isPreview: true,
      isLoading: true,
      activeButton: 'active',
      inactiveButton: 'inactive',
      current: {},
      items: [
        {
          title: 'Stroke',
          leaderboard: [],
          link: 'StrokeLeaderboard',
          position: 'stroke_position',
          total: 'total_score'
        },
        {
          title: 'Putting',
          leaderboard: [],
          link: 'PuttingLeaderboard',
          position: 'putting_position',
          total: 'total_putts'
        },
        {
          title: 'Skins',
          leaderboard: [],
          link: 'SkinsLeaderboard',
          position: 'count',
          total: 'skins_total'
        },
        {
          title: 'Money List',
          leaderboard: [],
          link: 'MoneyList',
          position: 'money_position',
          total: 'total_money'
        },
      ]
    }
  },

  computed: {
		...mapState(useTournamentStore, ["currentTournament", "tournaments"]),
		...mapState(
      useLeaderboardsStore,
      ["strokePreview", "skinsPreview", "puttingPreview", "teamPreview", "moneyPreview"]
    ),
  },

  methods: {
		...mapActions(useLeaderboardsStore,["loadPreviewLeaderboards"]),
	},

  created () {
    this.loadPreviewLeaderboards(this.$route.params.id).then((result) => {
      this.items[0].leaderboard = this.strokePreview
      this.items[1].leaderboard = this.puttingPreview
      this.items[2].leaderboard = this.skinsPreview
      this.items[3].leaderboard = this.moneyPreview

      this.current = this.currentTournament
      this.isLoading = false
    });
  }
}
</script>
<style >
.v-tabs__items {
  overflow: visible;
}
.hide {
  display: none;
}
.title-color {
  color: #4ABDAC;
}
.rounded-card {
  border-radius: 20px;
}
#leaderboard-container {
  z-index: 1;
  background-color: white;
}
small.purse-color {
  color: #666;
}
.no-back {
  background-color: transparent;
}
.team-preview, .team-leaderboard {
  background-color: #f44336;
  color: #f1f1f1;
  font-size: 16px;
}
.vue3-carousel__track {
  /* transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1); */
}
/* .slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
} */


.carousel__slide--sliding {
  transition: 0.5s;
}
</style>
