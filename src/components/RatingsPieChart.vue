<template id="ratings-pie-chart">
  <apexcharts
    type="pie"
    height="350"
    :options="chartOptions"
    :series="chartSeries"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import { times } from 'lodash';
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
      this.chartSeries = [];
      this.chartOptions.labels.length = 0;
      let i = 0;
      let j = 0;
      times(this.ratings.data.length, () => this.chartSeries.push(
        this.ratings.data[i++].count,
      ));
      times(this.ratings.data.length, () => this.chartOptions.labels.push(
        this.ratings.data[`${j++}`]['emoticon.name'],
      ));
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
    ...mapGetters({
      ratings: 'pieChartData',
    }),
  },
};
</script>

<style>

</style>
