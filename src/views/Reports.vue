<template>
  <div id="reports">
    <br>
    <div
      id="pickerWrap"
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
                :dark="dark"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="dateBegin"
              no-title
              scrollable
              :dark="dark"
              :reactive="reactive"
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
                @click="$refs.menuBegin.save(dateBegin)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
      </v-layout>
    </div>
    <div
      id="pickerWrap"
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
                :dark="dark"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="dateEnd"
              no-title
              scrollable
              :dark="dark"
              :reactive="reactive"
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
                @click="$refs.menuEnd.save(dateEnd)"
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
    <v-btn
      id="createBtn"
      dark
      @click="createRange()"
    >
      Show reports
    </v-btn>
    <div class="spacer" />
    <br>
    <h2>Showing reports from {{ dateBegin }} to {{ dateEnd }}</h2>
    <br>
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
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
    >
      {{ snackbarMsg }}
      <v-btn
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
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
      snackbar: false,
      range: {
        date: this.getToday(),
        interval: 2,
      },
      dark: true,
      reactive: true,
      menuBegin: false,
      dateBegin: this.getToday(),
      menuEnd: false,
      dateEnd: this.getToday(),
    };
  },
  created() {
    if (this.$parent.logged) {
      this.getYesterdayDate();
      this.createRange();
    }
  },
  methods: {
    getYesterdayDate() {
      const todayTimeStamp = new Date();
      const oneDayTimeStamp = 1000 * 60 * 60 * 24;
      const diff = todayTimeStamp - oneDayTimeStamp;
      this.dateBegin = new Date(diff).toISOString().substr(0, 10);
    },
    createRange() {
      const Today = {
        startDate: this.dateBegin,
        endDate: this.dateEnd,
      };
      this.$store.dispatch('getPieChartReport', Today);
      this.$store.dispatch('getDiagramRange', Today);
    },
  },
  watch: {
    snackbarMsg() {
      this.snackbar = true;
    },
  },
  computed: {
    snackbarMsg() {
      return this.$store.getters.notifications;
    },
  },
};
</script>

<style lang="less">
@import '../styles/main.less';
#pickerWrap {
  height: 50px;
  background: none;
  width: 200px;
  margin-left: 120px;
  padding-left: 30px;
  border-radius: 5px;
  float: left;
}
#pickerWrap input {
  color: @dark-grey;
  background: none;
  width: 150px;
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
</style>
