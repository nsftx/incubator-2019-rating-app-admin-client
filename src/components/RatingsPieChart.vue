<template id="ratings-pie-chart">
  <apexcharts
    type="pie"
    height="350"
    :options="chartOptions"
    :series="chartSeries"
  />
</template>

<script>
import Vue from 'vue';
import { findIndex, forEach } from 'lodash';
import ApexCharts from 'vue-apexcharts';

export default {
  components: {
    apexcharts: ApexCharts,
  },
  template: '#ratings-pie-chart',
  data() {
    return {
      chartSeries: [],
      chartOptions: {
        labels: [],
        legend: {
          position: 'bottom',
          labels: {
            colors: '#fff',
          },
        },
      },
    };
  },
  methods: {
    updatePieChart() {
      const emoticonIndex = findIndex(this.ratings.data, ['id', this.newRating.emoticonId]);
      Vue.set(this.chartSeries, emoticonIndex, this.chartSeries[emoticonIndex] + 1);
    },
    createPieChart() {
      this.chartOptions.labels.length = 0;
      this.chartSeries.length = 0;
      forEach(this.ratings.data, (rating) => {
        this.chartSeries.push(rating.count);
        this.chartOptions.labels.push(rating.name);
      });
    },
  },
  watch: {
    ratings: {
      handler() {
        this.createPieChart();
      },
      deep: true,
    },
    newRating() {
      this.updatePieChart();
    },
  },
  computed: {
    ratings() {
      return this.$store.getters.pieChartData;
    },
    newRating() {
      return this.$store.getters.newRating;
    },
  },
};
</script>

<style>

</style>
