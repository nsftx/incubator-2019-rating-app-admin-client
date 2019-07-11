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
                label="Pick a date..."
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
    <br>
    <h2>Showing reports for {{ date }}</h2>
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
	data() {
		return {
			dark: true,
			reactive: true,
			logged: true,
			menu: false,
			password: "",
			date: new Date().toISOString().substr(0, 10),
			headers: [
				{
					text: "Reactions",
					align: "left",
					sortable: false,
					value: "name"
				},
				{ text: "Number of reactions", value: "number" }
			],
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
			],
		}
	},
}

</script>

<style>
#pickerWrap{
    height: 50px;
    background:none;
    width:200px;
    margin-left:120px;
    border-radius: 5px;
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
</style>
