<template id="ratings-area-diagram">
  <apexcharts
    type="area"
    height="400"
    :options="diagramOptions"
    :series="diagramSeries"
  />
</template>

<script>
import ApexCharts from 'vue-apexcharts';
import {
  map, includes, find, indexOf, forEach,
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
      },
    };
  },
  methods: {
    populateDiagram() {
      this.populateDiagramOptionsCategories();
      this.populateDiagramSeriesNames();
      this.populateDiagramSeriesData();
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
    populateDiagramOptionsCategories() {
      this.diagramOptions.xaxis.categories.length = 0;
      forEach(this.diagramData.data, (rating) => {
        this.diagramOptions.xaxis.categories.push(rating.time);
      });
    },
    getRatedName(emoticons, id) {
      return find(emoticons, ['id', id]).name;
    },
  },
  watch: {
    diagramData: {
      handler() {
        this.populateDiagram();
      },
      deep: true,
    },
  },
  computed: {
    diagramData() {
      return this.$store.getters.diagramData;
    },
  },
};
</script>

<style>
</style>
