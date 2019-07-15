<template>
  <div id="today">
    <br><br>
	<img id="artwork" src="../assets/Artwork.svg">
    <h1>Today is a new day.</h1>
    <h1>Check your ratings!</h1>
    <br>
    <h2>Graphs present your rating results. Today you have {{ todayCount }} rates,</h2>
    <h2>check it on the dashboard.</h2>
    <br>
    <div id="lineChart">
      <ratings-area-diagram></ratings-area-diagram>
    </div>
    <div id="pieChart">
      <ratings-pie-chart></ratings-pie-chart>
    </div>
    <br>
    <div id="dataTable">
	<!-- <data-table-temp></data-table-temp> -->
    <div id="tableData">
        <v-data-table :headers="headers" :items="reactions" class="elevation-1" :dark="true">
          <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.number }}</td>
          </template>
        </v-data-table>
      </div>
	  <br><br>
    </div>
  </div>
  
</template>

<script>
import RatingsPieChart from "../components/RatingsPieChart"
import RatingsAreaDiagram from "../components/RatingsAreaDiagram"
import ApiService from '@/services/ApiService'

export default {
  components: {
    RatingsPieChart,
    RatingsAreaDiagram,
  },
	data(){
		return{
			todayCount:450,
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
				date:this.today,
				settingsId:8
			}
			ApiService.createNewDaily(Today)
				.then((response)=> {
					for(let i in response.data)
					this.reactions.push(new Reaction(response.data[i]["emoticon.name"],response.data[i].count))
				console.log(this.reactions)})
		}
	},
	created() {
		this.createToday()
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
#artwork{
	z-index:-1;
	float: right;
	margin-right: 20px;
	margin-bottom: 20px;
}
</style>
