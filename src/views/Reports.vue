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
      <apexcharts type=area height=400 :options="diagramOptions" :series="diagramSeries"></apexcharts>
    </div>
    <div id="pieChart">
      <apexcharts type=pie height=400 :options="chartOptions" :series="chartSeries"></apexcharts>
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
import ApexCharts from "vue-apexcharts"

export default {
  components: {
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
      headers: [
        {
          text: "Reactions",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Number of reactions", value: "number" }
      ],
      chartSeries: [200, 100, 75, 50, 25],
      diagramSeries: [{
          name: 'Happy',
          data: [10, 20, 30, 40, 50, 60, 70]
        }, {
          name: 'Happy-Meh',
          data: [5, 10, 15, 20, 25, 30, 35]
        },{
          name: 'Meh',
          data: [11, 13, 15, 17, 19, 25, 29]
        }, {
          name: 'Sad-Meh',
          data: [1, 1, 6, 8, 8, 9, 11]
        },{
          name: 'Sad',
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
        },
        xaxis: {
          type: 'datetime',
          categories: ["2019-09-10T00:00:00", "2019-09-10T03:00:00", "2019-09-10T07:00:00", "2019-09-10T11:00:00", "2019-09-10T15:00:00", "2019-09-10T019:00:00", "2019-09-10T023:59:00"],                
        }
      },
      chartOptions: {
        labels: ["Happy", "Happy-Meh", "Meh", "Sad-Meh", "Sad"],
        legend: {
          position: "bottom"
        }
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
  },
}

</script>

<style>
#pickerWrap{
    height: 50px;
    color:rgb(214, 214, 214);
    background:rgb(180, 180, 180);
    width:200px;
    margin-left:120px;
    border-radius: 5px;
}
#pickerWrap input{
    color:rgb(36, 36, 36);
    background:rgb(180, 180, 180);
    width:150px;    
}
#lineChart{
  background:rgb(36, 40, 46);
  height:400px;
  width:55%;
  float:left;
  margin-left:150px;
  margin-right:20px;
}
#dataTable{
  float:left;
  background:rgb(36, 40, 46);
  height:400px;
  width:45%;
  margin-left:150px;
  margin-top:25px;
}
</style>
