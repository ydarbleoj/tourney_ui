<template>
  <div class="default-bg mt-5">
    <v-row class="pr-1 pl-1">
      <v-col cols="12" class="text-left">
        <div class="chart-container">
          <BarChart :chart-data="chartData" :options="chartOptions" />
        </div>
      </v-col>
    </v-row>
    <v-row class="text-center mb-5 bandon-dark-color">
      <v-col cols="4">
        <h3 class="underline-text stroke-color">Lowest</h3>
        <h4 class="pt-2">
          Min: <span>{{ this.courseData.lowest_min }}</span>
        </h4>
        <h4>
          Max: <span>{{ this.courseData.lowest_max }}</span>
        </h4>
        <h4>
          Avg: <span>{{ this.courseData.lowest_avg }}</span>
        </h4>
      </v-col>
      <v-col cols="4">
        <h3 class="underline-text">Average</h3>
        <h4 class="pt-2">
          Min: <span class="neutral-color">{{ this.courseData.min_average }}</span>
        </h4>
        <h4>
          Max: <span class="neutral-color">{{ this.courseData.max_average }}</span>
        </h4>
        <h4>
          Avg: <span class="neutral-color">{{ this.courseData.avg_avg }}</span>
        </h4>
      </v-col>
      <v-col cols="4">
        <h3 class="underline-text bandon-orange-color">Highest</h3>
        <h4 class="pt-2">
          Min: <span class="less-neutral-gray">{{ this.courseData.highest_min }}</span>
        </h4>
        <h4>
          Max: <span class="less-neutral-gray">{{ this.courseData.highest_max }}</span>
        </h4>
        <h4>
          Avg: <span class="less-neutral-gray">{{ this.courseData.highest_avg }}</span>
        </h4>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  components: {
    BarChart,
  },
  props: {
    courseData: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      chartData: {
        labels: [], // Tournament years
        datasets: [
          {
            label: 'Lowest Score',
            data: [], // Lowest scores per year
            backgroundColor: '#9FB8CE',
          },
          {
            label: 'Average Score',
            data: [], // Average scores per year
            backgroundColor: '#999',
          },
          {
            label: 'Highest Score',
            data: [], // Highest scores per year
            backgroundColor: '#cf8018',
          }
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
              display: false,
            },
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
          },
          x: {
            categoryPercentage: 0.8,
            ticks: {
              maxTicksLimit: 6,
              maxRotation: 0,
              color: "#666",
              font: {
                size: 16,
                weight: 400,
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
        barPercentage: 1.3,
      },
    };
  },

  mounted () {
    console.log(this.courseData);
    const course = this.courseData
    const courseChart = course.chart_data

    this.chartData.labels = courseChart.map((data) => data.labels);
    this.chartData.datasets[2].data = courseChart.map((data) => data.highest);
    this.chartData.datasets[1].data = courseChart.map((data) => data.average);
    this.chartData.datasets[0].data = courseChart.map((data) => data.lowest);
  },

};
</script>

<style scoped>
.chart-container {
  width: 100%;
}
</style>
