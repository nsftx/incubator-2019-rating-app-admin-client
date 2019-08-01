<template>
  <div id="today">
    <div class="parentImages">
      <img class="artworkBg" src="../assets/Oval.svg" />
      <img class="artwork" src="../assets/Artwork.svg" />
    </div>
    <br />
    <br />
    <h1>Today is a new day.</h1>
    <h1>Check your ratings</h1>
    <br />
    <h2>Graphs present your rating results. Today you have {{ todayCount }} rates,</h2>
    <h2>check it on the dashboard.</h2>
    <br />
    <div class="lineChart">
      <ratings-area-diagram />
    </div>
    <div class="pieChart">
      <ratings-pie-chart />
    </div>
    <br />
    <div class="dataTable">
      <data-table />
    </div>
  </div>
</template>

<script>
import { times } from 'lodash';
import RatingsAreaDiagram from '../components/RatingsAreaDiagram.vue';
import RatingsPieChart from '../components/RatingsPieChart.vue';
import DataTable from '../components/DataTable.vue';

export default {
  components: {
    RatingsAreaDiagram,
    RatingsPieChart,
    DataTable,
  },
  data() {
    return {
      interval: {
        date: new Date().toISOString().substr(0, 10),
        interval: 2,
      },
      todayCount: 0,
      Today: { date: new Date().toISOString().substr(0, 10) },
    };
  },
  created() {
    this.$store.dispatch('getPieChartToday', this.Today);
    this.$store.dispatch('getDiagramToday', this.interval);
  },
  methods: {
    countToday() {
      let counter = 0;
      let i = 0;
      times(
        this.ratings.data.length,
        () => (counter += parseInt(this.ratings.data[i++].count)),
      );
      this.todayCount = counter;
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
.lineChart {
  background: #2D3038;
  height: 400px;
  width: 55%;
  float: left;
  margin-left: 150px;
  margin-right: 20px;
}
.pieChart {
  background: #2D3038;
  width: 30%;
  height: 400px;
  float: left;
}
.dataTable {
  float: left;
  height: 300px;
  width: 45%;
  margin-left: 150px;
  margin-top: 25px;
}
.tableData,
.pieChart,
.lineChart {
  border-radius: 5px;
}
.parentImages {
  position: relative;
  left: 0;
  top: 0;
  margin-right: 20px;
  margin-bottom: 20px;
  z-index: -1;
  float: right;
}
.artwork {
  top: 0;
  right: 0;
  position: relative;
}
.artworkBg {
  position: absolute;
  right: -250px;
}
</style>
