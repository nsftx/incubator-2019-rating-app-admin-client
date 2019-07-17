<template>
  <div id="reports">
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
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="date"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Beginning date..."
                prepend-icon="event"
                readonly
                v-on="on"
                :dark="dark"
              />
            </template>
            <v-date-picker
              v-model="date"
              no-title
              scrollable
              :dark="dark"
              :reactive="reactive"
            >
              <v-spacer />
              <v-btn
                flat
                color="primary"
                @click="menu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                flat
                color="primary"
                @click="$refs.menu.save(date)"
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
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="date2"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date2"
                label="Ending date..."
                prepend-icon="event"
                readonly
                v-on="on"
                :dark="dark"
              />
            </template>
            <v-date-picker
              v-model="date2"
              no-title
              scrollable
              :dark="dark"
              :reactive="reactive"
            >
              <v-spacer />
              <v-btn
                flat
                color="primary"
                @click="menu2 = false"
              >
                Cancel
              </v-btn>
              <v-btn
                flat
                color="primary"
                @click="$refs.menu2.save(date2)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
      </v-layout>
    </div>
    <br>
    <div id="spacer"></div>
    <v-btn @click="createToday()" dark id="createBtn">Show me the reports</v-btn>
    <div id="spacer"></div>
    <br>
    <h2>Showing reports from {{ date }} to {{ date2 }}</h2>
    <br>
    <div id="lineChart">
      <ratings-area-diagram></ratings-area-diagram>
    </div>
    <div id="pieChart">
      <apexcharts id="apexPie" type="pie" height="350" :options="chartOptions" :series="chartSeries"></apexcharts>
    </div>
    <br>
    <div id="dataTable">
      <div id="tableData">
        <v-data-table :headers="headers" :items="reactions" class="elevation-1" :dark="true">
          <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.number }}</td>
          </template>
        </v-data-table>
      </div>
      </div>
  </div>
</template>

<script>
import RatingsPieChart from "../components/RatingsPieChart"
import RatingsAreaDiagram from "../components/RatingsAreaDiagram"
import ApiService from '@/services/ApiService'
import ApexCharts from "vue-apexcharts"
import { setTimeout } from 'timers';

export default {
	components: {
		RatingsPieChart,
    RatingsAreaDiagram,
    apexcharts: ApexCharts
	},
	data() {
		return {
			dark: true,
			reactive: true,
			logged: true,
			menu: false,
			password: "",
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
			date2: new Date().toISOString().substr(0, 10),
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
  methods: {
		createToday(){
			function Reaction(name, number) {
			this.name = name;
			this.number = number;
			let that=this;
			}
			const Today={
        startDate:this.date,
        endDate:this.date2,
				settingsId:8
			}
			ApiService.createNewReport(Today)
				.then((response)=> {
          console.log(response.data)
					for(let i in response.data)
					this.reactions.push(new Reaction(response.data[`${i}`].emoticon.name,response.data[i].count))
        })
      this.createPieChart();
    },
    createPieChart(){
      while(this.chartOptions.labels.length>0)
      {
        this.chartOptions.labels.pop();
      }
      this.reactions=[]
      this.chartSeries=[]
      let temp = []
      const Today={
				startDate:this.date,
        endDate:this.date2,
				settingsId:8
			}
      ApiService.createNewReport(Today)
				.then((response)=> {
          for(let i in response.data)
          {
            this.chartSeries.push(response.data[i].count)
            this.chartOptions.labels[i]=(response.data[`${i}`].emoticon.name)
          }
        })
        
    },
  },
	created() {
    this.createToday()
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
  background:rgb(36, 40, 46);
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
