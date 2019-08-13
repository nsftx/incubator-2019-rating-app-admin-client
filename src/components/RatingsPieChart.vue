<template id="ratings-pie-chart">
  <apexcharts
    type="pie"
    height="350"
    :options="chartOptions"
    :series="chartSeries"
  />
</template>

<script>
import { map } from 'lodash';
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
        title: {
          text: 'Ratings',
          style: {
            color: '#fff',
          },
        },
      },
    };
  },
  methods: {
    createPieChart() {
      this.chartSeries = map(this.ratings.data, 'count');
      this.chartOptions.labels = map(this.ratings.data, 'emoticon.name');
    },
  },
  watch: {
    ratings: {
      handler() {
        this.createPieChart();
      },
      deep: true,
    },
  },
  computed: {
    ratings() {
      return this.$store.getters.pieChartData;
    },
  },
};
</script>

<style>

</style>
