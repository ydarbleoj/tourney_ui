<template>
  <div class="stroke-bg" v-if="record">
    <div class="less-neutral-gray">
      <BackButton :routeName="'TournamentRecords'" :routeParams="{}" />
      <h1 class="text-h3 pl-5 font-weight-regular">
        {{ record.name }}
      </h1>
      <h3 class="pl-5">
        Last set: <span class="setat">{{ record.set_at }}</span>
      </h3>
    </div>
    <v-row class="pa-5 pr-1 mb-5">
      <v-col cols="12" class="pl-5 pb-5 text-left">
        <div class="chart-container">
          <BarChart :chart-data="chartData" :options="chartOptions" />
        </div>
      </v-col>
    </v-row>
    <v-divider class="divider"></v-divider>
    <v-row class="pl-5 pt-3">
      <v-col cols="12" class="text-left">
        <div v-for="(record, index) in records" :key="index" class="record-container">
          <v-row>
            <v-col cols="2" class="pt-0 text-center">
              <div class="pt-2 font-weight-medium">
                <h2 class="less-neutral-gray">
                  {{ record.value }}
                </h2>
              </div>
            </v-col>
            <v-col cols="10" class="text-left pl-0 pt-0">
              <div class="pt-3 font-weight-regular">
                <h3 class="bandon-dark-color">
                  {{ record.user }}
                </h3>
              </div>
              <div class="pb-2 font-weight-light">
                <p>
                  Set in: {{ record.set_at }}
                  {{ record.unset_at ? `Broken in ${record.unset_at}` : "" }}
                </p>
              </div>
              <v-divider class="sm-divider"></v-divider>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
  <div v-else>
    <!-- Loading or empty state here -->
  </div>
</template>

<script>
import { mapState } from "pinia";
import { mapActions } from "pinia";
import BackButton from "./BackButton.vue";
import { useTournamentStore } from "@/store/tournament";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
  components: {
    BackButton,
    BarChart,
  },
  data() {
    return {
      record: null,
      records: [],
      chartData: {
        labels: [], // Tournament years
        datasets: [
          {
            data: [], // Scores for the first place
            backgroundColor: "#f7f7f7",
          },
        ],
      },
      chartOptions: {
        plugins: {
          legend: {
            display: false, // Hides the legend
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value, index, ticks) {
                // Show only the first and last y-axis value
                return index === ticks.length - 1 ? value : null;
              },
              color: "#666",
              font: {
                size: 100,
                weight: 300,
              },
            },
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
          },
          x: {
            ticks: {
              maxTicksLimit: 6,
              maxRotation: 0,
              color: "#666",
              font: {
                size: 14,
                weight: 500,
              },
            },
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
          },
        },
      },
    };
  },
  computed: {
    ...mapState(useTournamentStore, ["tournamentRecord"]),
  },
  created() {
    const id = this.$route.params.id;
    this.loadTournamentRecord(id).then(() => {
      this.record = this.tournamentRecord;
      this.records = this.tournamentRecord.records;
      this.chartData.labels = this.tournamentRecord.chart_data.labels;
      this.chartData.datasets[0].data = this.tournamentRecord.chart_data.first_place;
    });
  },
  methods: {
    ...mapActions(useTournamentStore, ["loadTournamentRecord"]),
  },
};
</script>

<style scoped>
.current-value {
  font-size: 5em;
  font-weight: 400;
  color: #999;
}
.setat {
  color: #666;
  font-size: 20px;
  font-weight: 400;
}
.chart-container {
  height: 40vh; /* 40% of the viewport height */
  width: 100%; /* You can adjust the width as needed */
}
.divider {
  border-top: 10px solid #999;
}
.sm-divider {
  border-top: 2px solid #999;
}
</style>
