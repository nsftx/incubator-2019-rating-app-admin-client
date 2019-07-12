<template>
  <div id="today">
    <br><br>
    <h1>Today is a new day.</h1>
    <h1>Check your ratings!</h1>
    <br>
    <h2>Graphs present your rating results. Today you have {{ today }} rates,</h2>
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
    <div id="tableData">
		// eslint-disable-next-line
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

export default {
  components: {
    RatingsPieChart,
    RatingsAreaDiagram,
  },
	data(){
		return{
			today:450,
			headers: [
				{
					text: "Reactions",
					align: "left",
					sortable: true,
					value: "name"
				},
				{ text: "Number of reactions", value: "number" }
			],chartSeries: [200, 100, 75, 50, 25],
			diagramSeries: [{
				name: "Happy",
				data: [10, 20, 30, 40, 50, 60, 70]
			}, {
				name: "Happy-Meh",
				data: [5, 10, 15, 20, 25, 30, 35]
			},{
				name: "Meh",
				data: [11, 13, 15, 17, 19, 25, 29]
			}, {
				name: "Sad-Meh",
				data: [1, 1, 6, 8, 8, 9, 11]
			},{
				name: "Sad",
				data: [3, 13, 20, 40, 50, 70, 82]
			}],
			diagramOptions: {
				dataLabels: {
					enabled: false,
				},
				stroke: {
					width: 2,
				},
				legend: {
					onItemClick: {
						toggleDataSeries: false
					},
					labels: {
						colors: "#fff",
					},
				},
				xaxis: {
					labels: {
						style: {
							colors: "#fff",
						},
					},
					type: "datetime",
					categories: ["2019-09-10T00:00:00", "2019-09-10T03:00:00", "2019-09-10T07:00:00", "2019-09-10T11:00:00", "2019-09-10T15:00:00", "2019-09-10T019:00:00", "2019-09-10T023:59:00"],                
				},
				yaxis: {
					labels: {
						style: {
							color: "#fff",
						},
					},
				},
				title: {
					text: "Ratings",
					style: {
						color: "#fff"
					},
				},
			},
			chartOptions: {
				labels: ["Happy", "Happy-Meh", "Meh", "Sad-Meh", "Sad"],
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
			reactions: [
				{
					name: "Happy",
					number: 200
				},
				{
					name: "Happy-Meh",
					number: 100
				},
				{
					name: "Meh",
					number: 75
				},
				{
					name: "Meh-Sad",
					number: 50
				},
				{
					name: "Sad",
					number: 25
				}
			]
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
</style>
