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
    populateDiagram() {
      let index;
      let ids = [];
      let counts = [];
      ApiService.createNewRange(this.range).then(response => {
        console.log("Response", response.data)
        this.populateDiagramSeriesNames(response.emoticons);
        this.populateDiagramOptionsCategories(response.data);
        for(let i = 0; i < response.data.length; i++) {
          for(let j = 0; j < response.data[i].ratings.length; j++) {
            let name = this.getRatedName(response.emoticons, response.data[i].ratings[j].emoticonId)
            index = _.findIndex(this.diagramSeries, ['name', name])
            if(index != -1) {
              ids.push(index);
              counts.push(response.data[i].ratings[j].count)
            }
          }
          for(let j = 0; j < this.diagramSeries.length; j++) {
            index = _.indexOf(ids, j)
            if (index != -1) {
              this.diagramSeries[j].data.push(counts[index])
            }
              this.diagramSeries[j].data.push(0)
          }
          ids = []
          counts = []
        }
      });
    },
    populateDiagramSeriesNames(emoticons) {
      for (let i = 0; i < this.diagramSeries.length; i++) {
        this.diagramSeries[i].name = (emoticons[i].name);
      }
    },
    populateDiagramOptionsCategories(ratings) {
      for (let i = 0; i < ratings.length; i++) {
        this.diagramOptions.xaxis.categories.push(ratings[i].end);
      }
    },
    getRatedName(emoticons, id) {
      let index = _.findIndex(emoticons, ["id", id])
      return emoticons[index].name
    }
  },
  created() {
	this.populateDiagram();
  }
};
</script>

<style>
</style>
