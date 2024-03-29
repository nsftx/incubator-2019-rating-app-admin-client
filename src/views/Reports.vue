<template>
  <div id="reports">
    <br>
    <div
      id="pickerWrap1" class="marginTop1"
      :class="{ marginTop2 : this.$parent.toggleNav }"
    >
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          sm6
          md4
        >
          <v-menu
            ref="menuBegin"
            v-model="menuBegin"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="dateBegin"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dateBegin"
                label="Beginning date..."
                prepend-icon="event"
                readonly
                dark
                v-on="on"
              />
            </template>
            <v-date-picker
              :max="getToday()"
              v-model="dateBegin"
              no-title
              scrollable
              dark
              reactive
            >
              <v-spacer />
              <v-btn
                flat
                color="@white"
                @click="menuBegin = false"
              >
                Cancel
              </v-btn>
              <v-btn
                flat
                color="@white"
                @click="createRange('begin');$refs.menuBegin.save(dateBegin);"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
      </v-layout>
    </div>
    <div
      id="pickerWrap2"
    >
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          sm6
          md4
        >
          <v-menu
            ref="menuEnd"
            v-model="menuEnd"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="dateEnd"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dateEnd"
                label="Ending date..."
                prepend-icon="event"
                readonly
                dark
                v-on="on"
              />
            </template>
            <v-date-picker
              :max="getToday()"
              v-model="dateEnd"
              no-title
              scrollable
              dark
              reactive
            >
              <v-spacer />
              <v-btn
                flat
                color="@white"
                @click="menuEnd = false"
              >
                Cancel
              </v-btn>
              <v-btn
                flat
                color="@white"
                @click="createRange('end');$refs.menuEnd.save(dateEnd);"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
      </v-layout>
    </div>
    <br>
    <div class="spacer" />
    <v-switch
      dark
      v-model="realTime"
      class="statistics"
      :label="`Real time statistics: ${realTimeText}`"
    >
    </v-switch>
    <div class="lineChart">
      <ratings-area-diagram />
    </div>
    <div class="pieChart">
      <ratings-pie-chart />
    </div>
    <br>
    <div class="dataTable">
      <data-table />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
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
      range: {
        date: this.getToday(),
        interval: 2,
      },
      menuBegin: false,
      dateBegin: this.getToday(),
      menuEnd: false,
      dateEnd: this.getToday(),
    };
  },
  created() {
    if (this.$store.getters.isLogged) {
      this.$disconnect();
      this.oneDayRange();
      this.createRange();
    }
  },
  methods: {
    oneDayRange() {
      this.dateBegin = moment().subtract(1, 'day').format('YYYY-MM-DD');
      this.dateEnd = this.getToday();
    },
    createRange(clickedDate) {
      let Today = {};
      if (this.dateBegin >= this.dateEnd) {
        if (clickedDate === 'begin') {
          this.dateEnd = this.dateBegin;
        } else {
          this.dateBegin = this.dateEnd;
        }
        Today = {
          startDate: this.dateBegin,
          endDate: this.dateEnd,
        };
        const interval = {
          date: this.dateBegin,
          interval: 2,
        };
        this.$store.dispatch('getDiagramToday', interval);
      } else {
        Today = {
          startDate: this.dateBegin,
          endDate: this.dateEnd,
        };
        this.$store.dispatch('getDiagramRange', Today);
      }
      this.$store.dispatch('getPieChartReport', Today);
    },
  },
  watch: {
    realTime() {
      if (this.realTime) {
        this.realTimeText = 'ON';
        this.oneDayRange();
        this.createRange();
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
.marginTop1{
  padding-top: 0px !important;
}
#pickerWrap1 {
  height: 50px;
  background: none;
  width: 200px;
  margin-left: 6%;
  padding-left: 30px;
  border-radius: 5px;
  float: left;
}
#pickerWrap1 input {
  color: @dark-grey;
  background: none;
  width: 150px;
}
#pickerWrap2 {
  height: 50px;
  background: none;
  width: 200px;
  margin-left: 0px;
  padding-left: 0px;
  border-radius: 5px;
  float: left;
}
#pickerWrap2 input {
  color: @dark-grey;
  background: none;
  width: 150px;
}
.statistics{
  margin-left: 150px;
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
#createBtn {
  float: left;
  margin-left: 150px;
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
.apexcharts-legend-text {
  color: @white !important;
}
.apexcharts-yaxis-texts-g text,
.apexcharts-xaxis-texts-g text {
  fill: @white !important;
}
input[type="text"] {
  color: @white !important;
}
.spacer {
  width: 100%;
  height: 50px;
}
.v-picker__actions.v-card__actions {
  background: @dark-grey;
}
.theme--dark.v-picker__body {
  background: @dark-grey;
}
@media only screen and (max-width: 1024px) {
  .marginTop1{
  padding-top: 0px ;
}
  .statistics{
    margin: 0;
  }
  .dataTable,
  .pieChart,
  .lineChart {
    width: 100%;
    float: center;
    margin: 0;
    margin-top: 10px;
  }
  #createBtn {
  left:0;
  right:0;
  margin: 0 auto;
  float: none;
}
  #pickerWrap1 {
    height: 50px;
    background: none;
    width: 100%;
    margin-left: 0;
    padding-left: 0;
    border-radius: 5px;
    float: none;
  }
  #pickerWrap1 input {
    color: @dark-grey;
    background: none;
    width: 90%;
  }
  #pickerWrap2 {
    height: 50px;
    background: none;
    width: 100%;
    margin-left: 0;
    padding-left: 0;
    border-radius: 5px;
    float: none;
  }
  #pickerWrap2 input {
    color: @dark-grey;
    background: none;
    width: 90%;
  }
}
</style>
