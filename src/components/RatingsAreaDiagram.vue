<template id="ratings-area-diagram">
<div>
  <apexcharts
    type="area"
    height="400"
    :options="diagramOptions"
    :series="diagramSeries"
  />
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import ApexCharts from 'vue-apexcharts';
import { findIndex, indexOf, forEach } from 'lodash';
import ApiService from '../services/ApiService';

export default {

  template: '#ratings-area-diagram',
  components: {
    apexcharts: ApexCharts,
  },
  data() {
    return {
      range: {
        date: new Date().toISOString().substr(0, 10),
        interval: 2,
      },
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
      for (let i = 0; i < this.ratings.data.length; i++) {
        for (let j = 0; j < this.ratings.data[i].ratings.length; j++) {
          const name = this.getRatedName(
            this.ratings.emoticons,
            this.ratings.data[i].ratings[j].emoticonId,
          );
          index = findIndex(this.diagramSeries, ['name', name]);
          if (index != -1) {
            ids.push(index);
            counts.push(this.ratings.data[i].ratings[j].count);
          }
        }
        for (let j = 0; j < this.diagramSeries.length; j++) {
          index = indexOf(ids, j);
          if (index != -1) {
            this.diagramSeries[j].data.push(counts[index]);
          } else {
            this.diagramSeries[j].data.push(0);
          }
        }
        ids = [];
        counts = [];
      }
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
