<template>
  <div id="today">
    <br><br>
    <h1>Today is a new day.</h1>
    <h1>Check your ratings!</h1>
    <br>
    <h2>Graphs present your rating results. Today you have {{ today }} rates,</h2>
    <h2>check it on the dashboard.</h2>
    <br>
    <div id="lineChart"><p>Place for line chart</p></div>
    <div id="pieChart"><p>Place for pie chart</p></div>
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
export default {
	data:function(){
		return{
      today:450,
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
  background:rgb(36, 40, 46);
  height:300px;
  width:45%;
  margin-left:150px;
  margin-top:25px;
}
</style>
