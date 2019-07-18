<template id="ratings-area-diagram">
  <div>
    <apexcharts type="area" height="400" :options="diagramOptions" :series="diagramSeries"></apexcharts>
  </div>
</template>

<script>
import ApexCharts from "vue-apexcharts";
import ApiService from "../services/ApiService";

export default {
  template: "#ratings-area-diagram",
  components: {
    apexcharts: ApexCharts,
    ApiService
  },
  data() {
    return {
      range: {
        date: new Date().toISOString().substr(0, 10),
        interval: 2
      },
      diagramSeries: [
        {
          name: "",
          data: []
        },
        {
          name: "",
          data: []
        },
        {
          name: "",
          data: []
        },
        {
          name: "",
          data: []
        },
        {
          name: "",
          data: []
        }
      ],
      diagramOptions: {
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 2
        },
        legend: {
          onItemClick: {
            toggleDataSeries: false
          },
          labels: {
            colors: "#444444"
          }
        },
        xaxis: {
          format: "HH/DD",
          labels: {
            style: {
              colors: "#444444"
			},
          },
          type: "datetime",
          categories: []
        },
        yaxis: {
          labels: {
            style: {
              color: "#444444"
            }
          }
        },
        title: {
          text: "Ratings",
          style: {
            color: "#444444"
          }
        }
      }
    };
  },
  methods: {
    createNewRange() {
      let ratedEmotionsPerHour = [];
      ApiService.createNewRange(this.range).then(response => {
        this.populateDiagramSeriesNames(response.emoticons);
        this.populateDiagramOptionsCategories(response.data);
        for (let i = 0; i < response.data.length; i++) {
          for (let j = 0; j < response.data[i].length; j++) {
            let nameIndex = _.findIndex(this.diagramSeries, [
              "name", response.data[i][j].emoticon.name
            ]);
            this.diagramSeries[nameIndex].data.push(response.data[i][j].count);
            ratedEmotionsPerHour.push(nameIndex);
          }
          for (let z = 0; z < this.diagramSeries.length; z++) {
            if (!_.includes(ratedEmotionsPerHour, z)) {
              this.diagramSeries[z].data.push(0);
            }
          }
          ratedEmotionsPerHour = [];
        }
      });
    },
    populateDiagramSeriesNames(emoticons) {
      for (let i = 0; i < this.diagramSeries.length; i++) {
        this.diagramSeries[i].name = emoticons[i].name;
      }
    },
    populateDiagramOptionsCategories(ratings) {
      for (let i = 0; i < ratings.length; i++) {
        this.diagramOptions.xaxis.categories.push(ratings[i][0].end);
      }
      console.log(this.diagramOptions.xaxis.categories)
    },
  },
  created() {
	this.createNewRange();
  }
};
</script>

<style>
</style>
