<template>
  <div id="today">
    <div class="parentImages">
      <img class="artworkBg" src="../assets/Oval.png" />
      <img class="artwork" src="../assets/Artwork.png" />
    </div>
    <h1 class="margin-h-top">Today is a new day.</h1>
    <h1 class="margin-h-btm">Check your ratings</h1>
    <h2>Graphs present your rating results. Today you have {{ todayCount }} rates,</h2>
    <h2>check it on the dashboard.</h2>
    <div class="lineChart">
      <ratings-area-diagram />
    </div>
    <div class="pieChart">
      <ratings-pie-chart />
    </div>
    <div class="dataTable">
      <data-table />
    </div>
    <api-snackbar></api-snackbar>
  </div>
</template>

<script>
import { sumBy } from 'lodash';
import RatingsAreaDiagram from '../components/RatingsAreaDiagram.vue';
import RatingsPieChart from '../components/RatingsPieChart.vue';
import DataTable from '../components/DataTable.vue';
import ApiSnackbar from '../components/ApiSnackbar.vue';

export default {
  components: {
    RatingsAreaDiagram,
    RatingsPieChart,
    DataTable,
    ApiSnackbar,
  },
  data() {
    return {
      interval: {
        date: this.getToday(),
        interval: 2,
      },
      todayCount: 0,
      Today: { date: this.getToday() },
    };
  },
  created() {
    if (this.$parent.logged) {
      this.$store.dispatch('getPieChartToday', this.Today);
      this.$store.dispatch('getDiagramToday', this.interval);
    }
  },
  methods: {
    countToday() {
      this.todayCount = sumBy(this.ratings.data, 'count');
    },
  },
  computed: {
    ratings() {
      return this.$store.getters.pieChartData;
    },
  },
  watch: {
    ratings() {
      this.countToday();
    },
  },
};
</script>

<style lang="less">
@import '../styles/main.less';
.margin-h-btm {
  padding-bottom:20px;
}
.margin-h-top {
  padding-top:40px !important;
}
.apexcharts-legend-text {
  color: @white !important;
}
.apexcharts-yaxis-texts-g text,
.apexcharts-xaxis-texts-g text {
  fill: @white !important;
}
.lineChart {
  background: @dark-grey;
  height: 400px;
  width: 55%;
  float: left;
  margin-left: 150px;
  margin-right: 20px;
}
.pieChart {
  background: @dark-grey;
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
  margin-bottom: 30px;
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
  left:-20%;
}
@media only screen and (max-width: 1024px) {
  .parentImages {
    display: none;
  }
  .dataTable,
  .pieChart,
  .lineChart {
    width: 100%;
    float: center;
    margin: 0;
    margin-top: 10px;
  }
  .margin-h-top{
    padding-top: 0px;
    margin-top: 60px;
  }
}
</style>
