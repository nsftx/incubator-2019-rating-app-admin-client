<template id="ratings-area-diagram">
  <apexcharts
    type="area"
    height="400"
    :options="diagramOptions"
    :series="diagramSeries"
  />
</template>

<script>
import ApexCharts from "vue-apexcharts";
import ApiService from "../services/ApiService"
import {findIndex, indexOf} from "lodash"

export default {

  template: "#ratings-area-diagram",
  components: {
    apexcharts: ApexCharts,
  },
  props: ["ratings"],
  data() {
    return {
      activeEmoticons: [],
      range: {
        date: new Date().toISOString().substr(0, 10),
        interval: 2
      },
      diagramSeries: [],
      diagramOptions: {
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 2
        },
        legend: {
          labels: {
            colors: "#444444"
          }
        },
        xaxis: {
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
  created() {
    this.getActiveEmoticons()
  },
  methods: {
    populateDiagram() {
      let index;
      let ids = [];
      let counts = [];
      this.diagramOptions.xaxis.categories.length = 0
      this.diagramSeries.length = 0
      this.populateDiagramSeriesNames();
      this.populateDiagramOptionsCategories(this.ratings.data);
      for(let i = 0; i < this.ratings.data.length; i++) {
        for(let j = 0; j < this.ratings.data[i].ratings.length; j++) {
          let name = this.getRatedName(this.ratings.emoticons, this.ratings.data[i].ratings[j].emoticonId)
          index = findIndex(this.diagramSeries, ['name', name])
          if(index != -1) {
            ids.push(index);
            counts.push(this.ratings.data[i].ratings[j].count)
          }
        }
        for(let j = 0; j < this.diagramSeries.length; j++) {
          index = indexOf(ids, j)
          if (index != -1) {
            this.diagramSeries[j].data.push(counts[index])
          } else {
            this.diagramSeries[j].data.push(0)
          }
        }
        ids = []
        counts = []
      }
    },
    populateDiagramSeriesNames() {
      for (let i = 0; i < this.activeEmoticons.length; i++) {
        let Rating = {
          name: this.activeEmoticons[i].name,
          data: []
        }
        this.diagramSeries.push(Rating)
      }
    },
    populateDiagramOptionsCategories(ratings) {
      for (let i = 0; i < ratings.length; i++) {
        this.diagramOptions.xaxis.categories.push(ratings[i].time);
      }
    },
    getRatedName(emoticons, id) {
      let index = findIndex(emoticons, ["id", id])
      return emoticons[index].name
    },
    getActiveEmoticons() {
      ApiService.getActiveSettings().then(response => {
        this.activeEmoticons = response.emoticons
      })
    },
  },
  watch: {
    ratings() {
      this.populateDiagram()
    }
  }
};
</script>

<style>
</style>
