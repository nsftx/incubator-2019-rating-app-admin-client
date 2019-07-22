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

export default {

  template: "#ratings-area-diagram",
  components: {
    apexcharts: ApexCharts,
  },
  props: ["ratings"],
  data() {
    return {
      range: {
        date: new Date().toISOString().substr(0, 10),
        interval: 2
      },
      diagramSeries: [],
      diagramOptions: {
        chart: {
        stacked: true,
        },
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
      this.diagramOptions.xaxis.categories.length = 0
      this.diagramSeries.length = 0
      this.populateDiagramSeriesNames(this.ratings.emoticons);
      this.populateDiagramOptionsCategories(this.ratings.data);
      for(let i = 0; i < this.ratings.data.length; i++) {
        for(let j = 0; j < this.ratings.data[i].ratings.length; j++) {
          let name = this.getRatedName(this.ratings.emoticons, this.ratings.data[i].ratings[j].emoticonId)
          index = _.findIndex(this.diagramSeries, ['name', name])
          if(index != -1) {
            ids.push(index);
            counts.push(this.ratings.data[i].ratings[j].count)
          }
        }
        for(let j = 0; j < this.diagramSeries.length; j++) {
          index = _.indexOf(ids, j)
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
    populateDiagramSeriesNames(emoticons) {
      for (let i = 0; i < emoticons.length; i++) {
        let Rating = {
          name: emoticons[i].name,
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
      let index = _.findIndex(emoticons, ["id", id])
      return emoticons[index].name
    }
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
