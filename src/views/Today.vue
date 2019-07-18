<template>
  <div id="today">
    <div id="parentImages">
      <img 
        id="artworkBg"
        src="../assets/Oval.svg"
      >
      <img
        id="artwork"
        src="../assets/Artwork.svg"
      >
    </div>
    <br><br>
    <h1>Today is a new day.</h1>
    <h1>Check your ratings!</h1>
    <br>
    <h2>Graphs present your rating results. Today you have {{ todayCount }} rates,</h2>
    <h2>check it on the dashboard.</h2>
    <br>
    <div id="lineChart">
      <ratings-area-diagram />
    </div>
    <div id="pieChart">
      <apexcharts
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
      <br><br>
    </div>
  </div>
</template>

<script>
import RatingsAreaDiagram from "../components/RatingsAreaDiagram"
import ApiService from '@/services/ApiService'
import ApexCharts from "vue-apexcharts"

export default {
  components: {
    RatingsAreaDiagram,
    apexcharts: ApexCharts
  },
	data() {
		return{
			todayCount:0,
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
      today: new Date().toISOString().substr(0, 10),
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
	created() {
    this.createToday(),
    this.createPieChart(),
    this.countToday()
	},
	methods: {
		createToday(){
			function Reaction(name, number) {
			this.name = name,
			this.number = number
			}
			const Today={
				date:this.today,
				settingsId:8
			}
			ApiService.createNewDaily(Today)
				.then((response)=> {
          let i=0
          _.times(response.data.length, ()=> this.reactions.push(new Reaction(response.data[`${i}`]["emoticon.name"],response.data[i++].count)))
          })
    },
    createPieChart() {
      this.chartSeries=[]
      this.chartOptions.labels=[]
      const Today={
				date:this.today,
				settingsId:8
			}
      ApiService.createNewDaily(Today)
				.then((response)=> {
          let i=0,j=0
          _.times(response.data.length, ()=> this.chartSeries.push(response.data[i++].count))
          _.times(response.data.length, ()=> this.chartOptions.labels.push(response.data[`${j++}`]["emoticon.name"]))
        });
    },
    countToday() {
      let counter=0
      const Today={
				date:this.today,
				settingsId:8
			}
      ApiService.createNewDaily(Today)
				.then((response)=> {
          let i=0
          _.times(response.data.length, ()=> counter+=parseInt(response.data[i++].count))
          this.todayCount = counter
        });
    }
	}
}
</script>

<style>
#lineChart{
  background:#444444;
  height:400px;
  width:55%;
  float:left;
  margin-left:150px;
  margin-right:20px;
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
#tableData, #pieChart, #lineChart{
	border-radius: 5px;
}
#parentImages {
  position: relative;
  left:0;
  top:0;
	margin-right: 20px;
	margin-bottom: 20px;
  z-index: -1;
  float:right;
}
#artwork{
  top:0;
  right:0;
	position: relative;
}
#artworkBg{
  position: absolute;
}
</style>
