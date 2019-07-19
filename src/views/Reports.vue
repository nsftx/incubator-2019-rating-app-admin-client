<template>
  <div id="reports">
    <br>
    <div id="pickerWrap">
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
                color="primary"
                @click="menuBegin = false"
              >
                Cancel
              </v-btn>
              <v-btn
                flat
                color="primary"
                @click="$refs.menuBegin.save(dateBegin)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
      </v-layout>
    </div>
    <div id="pickerWrap">
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
                color="primary"
                @click="menuEnd = false"
              >
                Cancel
              </v-btn>
              <v-btn
                flat
                color="primary"
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
    <div id="spacer" />
    <v-btn
      id="createBtn"
      dark
      @click="createRange()"
    >
      Show reports
    </v-btn>
    <div id="spacer" />
    <br>
    <h2>Showing reports from {{ dateBegin }} to {{ dateEnd }}</h2>
    <br>
    <div id="lineChart">
      <ratings-area-diagram v-bind:response="response"></ratings-area-diagram>
    </div>
    <div id="pieChart">
      <apexcharts
        id="apexPie"
        type="pie"
        height="350"
        :options="chartOptions"
        :series="chartSeries"
      />
    </div>
    <br>
    <div id="dataTable">
      <div id="tableData">
        <v-data-table
          :headers="headers"
          :items="reactions"
          class="elevation-1"
          :dark="true"
        >
          <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">
              {{ props.item.number }}
            </td>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
import RatingsAreaDiagram from "../components/RatingsAreaDiagram"
import ApiService from '@/services/ApiService'
import ApexCharts from "vue-apexcharts"
// eslint-disable-next-line
import { setTimeout } from "timers"

export default {
	components: {
    RatingsAreaDiagram,
    apexcharts: ApexCharts
	},
	data() {
		return {
      range: {
        date: new Date().toISOString().substr(0, 10),
        interval: 2
      },
      response: {},
			dark: true,
			reactive: true,
      logged: true,
      password: "",
			menuBegin: false,
      dateBegin: new Date().toISOString().substr(0, 10),
      menuEnd: false,
      dateEnd: new Date().toISOString().substr(0, 10),
      settingId:12,
			headers: [
				{
					text: "Reactions",
					align: "left",
					sortable: true,
					value: "name"
				},
				{ text: "Number of reactions", value: "number" }
      ],
      reactions: [],
      chartSeries: [],
            chartOptions: {
                labels: [],
                noData: {
                    text: "No data for selected date interval",
                    style: {
                      color: "#fff"
                    },
                },
                legend: {
                    position: "bottom",
                    labels: {
                        colors: "#fff",
                    },
                },
                title: {
                    text: "Ratings",
                    style: {
                        color: "#fff"
                    },
                },
            },
    }
  },
	created() {
    this.getSetId()
    this.createRange()
	},
  methods: {
		createRange() {
			function Reaction(name, number) {
			this.name = name,
			this.number = number
			}
			const Today = {
        startDate:this.dateBegin,
        endDate:this.dateEnd,
				settingsId:this.settingId
			}
			ApiService.createNewReport(Today)
				.then((response)=> {
          let i=0
          _.times(response.data.length, ()=> this.reactions.push(new Reaction(response.data[`${i}`].emoticon.name,response.data[i++].count)))          
        })
      this.createPieChart()
    },

    getDiagramData() {
      ApiService.createReportForDays(Today).then(response => {
        this.response = response;
      })
    },
    createPieChart() {
      this.chartOptions.labels.length=0
      this.reactions=[]
      this.chartSeries=[]
      const Today={
				startDate:this.dateBegin,
        endDate:this.dateEnd,
				settingsId:this.settingId
			}
      ApiService.createNewReport(Today)
				.then((response)=> {
          console.log(response)
          let i=0,j=0
          _.times(response.data.length, ()=> this.chartSeries.push(response.data[i++].count))
          _.times(response.data.length, ()=> this.chartOptions.labels.push(response.data[`${j++}`].emoticon.name))
        })
    },
    getSetId(){
      ApiService.getActiveSettings()
        .then((response) => {
          this.settingId=response.data.id
        })
    }
  }
}

</script>

<style>
#pickerWrap {
    height: 50px;
    background:none;
    width:200px;
    margin-left:120px;
    border-radius: 5px;
    float:left;
}
#pickerWrap input{
    color:rgb(36, 36, 36);
    background:none;
    width:150px;    
}
#lineChart{
  background:#444444;
  height:400px;
  width:55%;
  float:left;
  margin-left:150px;
  margin-right:20px;
}
#createBtn{
  float:left;
  margin-left:150px;

}
#pieChart{
  background:#444444;
  width:30%;
  height:400px;
  float:left;
}
#dataTable{
  float:left;
  height:300px;
  width:45%;
  margin-left:150px;
  margin-top:25px;
}
.apexcharts-legend-text{
  color:white !important;
}
.apexcharts-yaxis-texts-g text,.apexcharts-xaxis-texts-g text{
  fill:white !important;
}
input[type="text"]{
	color:rgb(190, 190, 190) !important;
}
#spacer{
  width:100%;
  height:50px;
}
</style>
