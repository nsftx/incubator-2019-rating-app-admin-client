<template id="ratings-pie-chart">
  <apexcharts
    type="pie"
    height="350"
    :options="chartOptions"
    :series="chartSeries"
  />
</template>

<script>
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
};
</script>

<style>

</style>
