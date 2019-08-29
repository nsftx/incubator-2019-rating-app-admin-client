<template>
  <div id="today">
    <div class="parentImages">
      <img class="artworkBg" src="../assets/Oval.png" />
      <img class="artwork" src="../assets/Artwork.png" />
    </div>
    <div class="padding-top">
    <h1 class="marginTop1"
        :class="{ marginTop2 : this.$parent.toggleNav }"
    >Today is a new day.</h1>
    </div>
    <h1 class="margin-h-btm">Check your ratings</h1>
    <h2>Graphs present your rating results. Today you have {{ todayCount }} rates,</h2>
    <h2>check it on the dashboard.</h2>
    <v-switch
      dark
      v-model="realTime"
      class="statistic"
      :label="`Real time statistics: ${realTimeText}`"
    >
    </v-switch>
    <div class="lineChart">
      <ratings-area-diagram />
    </div>
    <div class="pieChart">
      <ratings-pie-chart />
    </div>
    <div class="dataTable">
      <data-table />
    </div>
  </div>
</template>

<script>
import { sumBy } from 'lodash';
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
      realTime: false,
      realTimeText: 'OFF',
      interval: {
        date: this.getToday(),
        interval: 2,
      },
      todayCount: 0,
      Today: { date: this.getToday() },
    };
  },
  created() {
    if (this.$store.getters.isLogged) {
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
    newRating() {
      return this.$store.getters.newRating;
    },
  },
  watch: {
    ratings() {
      this.countToday();
    },
    newRating() {
      this.todayCount++;
    },
    realTime() {
      if (this.realTime) {
        this.realTimeText = 'ON';
        this.$store.dispatch('getPieChartToday', this.Today);
        this.$store.dispatch('getDiagramToday', this.interval);
        this.$connect('wss://ratingsapp.ddns.net:7000');
      } else {
        this.realTimeText = 'OFF';
        this.$disconnect();
      }
    },
  },
};
</script>

<style lang="less">
@import '../styles/main.less';
.margin-h-btm {
  padding-bottom:20px;
}
.padding-top {
  padding-top:40px;
}
.apexcharts-legend-text {
  color: @white !important;
}
.apexcharts-yaxis-texts-g text,
.apexcharts-xaxis-texts-g text {
  fill: @white !important;
}
.statistic{
  margin-left: 150px;
  margin-top: 10%;
}
.accent--text {
  color: @malibu !important;
  caret-color: @malibu !important;
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
  padding-top: 25px;
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
  .statistic{
    margin: 0;
    margin-top: 10%;
  }
  .dataTable,
  .pieChart,
  .lineChart {
    width: 100%;
    float: center;
    margin: 0;
    margin-top: 10px;
  }
  .marginTop1{
    padding-top: 0px;
    margin-top: 60px ;
  }
  .padding-top {
    padding-top: 0;
  }
}
</style>
