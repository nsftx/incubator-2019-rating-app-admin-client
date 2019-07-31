<template id="ratings-area-diagram">
  <apexcharts
    type="area"
    height="400"
    :options="diagramOptions"
    :series="diagramSeries"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import ApexCharts from 'vue-apexcharts';
import { findIndex, indexOf, forEach } from 'lodash';

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
      this.diagramOptions.xaxis.categories.length = 0;
      this.diagramSeries.length = 0;
      this.populateDiagramSeriesNames();
      this.populateDiagramSeriesData();
      this.populateDiagramOptionsCategories();
    },
    populateDiagramSeriesNames() {
      let Rating = {};
      forEach(this.ratings.emoticons, (ratings) => {
        Rating = {
          name: ratings.name,
          data: [],
        };
        this.diagramSeries.push(Rating);
      });
    },
    populateDiagramSeriesData() {
      let index;
      let ids = [];
      let counts = [];
      forEach(this.ratings.data, (data) => {
        forEach(data.ratings, (ratings) => {
          const name = this.getRatedName(
            this.ratings.emoticons,
            ratings.emoticonId,
          );
          index = findIndex(this.diagramSeries, ['name', name]);
          if (index != -1) {
            ids.push(index);
            counts.push(ratings.count);
          }
        });
        let count = 0;
        forEach(this.diagramSeries, (series) => {
          index = indexOf(ids, count);
          if (index != -1) {
            series.data.push(counts[index]);
          } else {
            series.data.push(0);
          }
          count++;
        });
        ids = [];
        counts = [];
      });
    },
    populateDiagramOptionsCategories() {
      forEach(this.ratings.data, (ratings) => {
        this.diagramOptions.xaxis.categories.push(ratings.time);
      });
    },
    getRatedName(emoticons, id) {
      const index = findIndex(emoticons, ['id', id]);
      return emoticons[index].name;
    },
  },
  watch: {
    ratings: {
      handler() {
        this.populateDiagram();
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      ratings: 'diagramData',
    }),
  },
};
</script>

<style>
</style>
