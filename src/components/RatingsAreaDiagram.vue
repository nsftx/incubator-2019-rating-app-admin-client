<template id="ratings-area-diagram">
  <apexcharts
    type="area"
    height="400"
    :options="diagramOptions"
    :series="diagramSeries"
  />
</template>

<script>
import Vue from 'vue';
import ApexCharts from 'vue-apexcharts';
import {
  forEach, find, includes, indexOf, map,
} from 'lodash';

const NO_RATING = 0;
export default {

  template: '#ratings-area-diagram',
  components: {
    apexcharts: ApexCharts,
  },
  data() {
    return {
      diagramSeries: [],
      diagramOptions: {
        chart: {
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 2,
        },
        xaxis: {
          type: 'datetime',
          categories: [],
        },
        yaxis: {
          min: 0,
        },
      },
    };
  },
  methods: {
    updateDiagram() {
      if (localStorage.getItem('activePath') === 'reports') {
        this.rating.time = this.rating.time.substr(0, 10);
      }
      let timeIndex;
      for (let i = 0; i < this.diagramOptions.xaxis.categories.length - 1; i++) {
        if (this.rating.time > this.diagramOptions.xaxis.categories[i]
            && this.rating.time <= this.diagramOptions.xaxis.categories[i + 1]) {
          timeIndex = i + 1;
          break;
        }
      }
      const ratedEmoticon = find(this.diagramData.emoticons, ['id', this.rating.emoticonId]);
      const emoticonIndex = indexOf(this.diagramSeries, find(this.diagramSeries, ['name', ratedEmoticon.name]));

      Vue.set(this.diagramSeries[emoticonIndex].data, timeIndex,
        this.diagramSeries[emoticonIndex].data[timeIndex] + 1);
    },
    populateDiagramOptionsCategories() {
      this.diagramOptions.xaxis.categories.length = 0;
      forEach(this.diagramData.data, (rating) => {
        this.diagramOptions.xaxis.categories.push(rating.time);
      });
    },
    populateDiagramSeriesNames() {
      this.diagramSeries.length = 0;
      forEach(this.diagramData.emoticons, (ratings) => {
        this.diagramSeries.push({ name: ratings.name, data: [] });
      });
    },
    populateDiagramSeriesData() {
      let rated = [];
      const emoticons = map(this.diagramData.emoticons, 'id');
      const ratings = map(this.diagramData.data, 'ratings');
      forEach(ratings, (rating) => {
        forEach(rating, (rate) => {
          rated.push(rate.emoticonId);
        });
        let counter = 0;
        forEach(emoticons, (id) => {
          const index = indexOf(emoticons, id);
          if (includes(rated, id)) {
            this.diagramSeries[index].data.push(rating[counter].count);
            counter++;
          } else {
            this.diagramSeries[index].data.push(NO_RATING);
          }
        });
        rated = [];
      });
    },
  },
  watch: {
    diagramData: {
      handler() {
        this.populateDiagramOptionsCategories();
        this.populateDiagramSeriesNames();
        this.populateDiagramSeriesData();
      },
      deep: true,
    },
    rating() {
      this.updateDiagram();
    },
  },
  computed: {
    rating() {
      return this.$store.getters.newRating;
    },
    diagramData() {
      return this.$store.getters.diagramData;
    },
  },
};
</script>

<style>
</style>
