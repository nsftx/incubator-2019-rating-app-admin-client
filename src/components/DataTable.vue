<template id="data-table">
  <v-data-table
    :headers="headers"
    :items="reactions"
    class="elevation-1"
    :dark="true"
  >
    <template v-slot:items="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-center">
        {{ props.item.number }}
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { findIndex, forEach } from 'lodash';

export default {
  template: '#data-table',
  data() {
    return {
      headers: [
        {
          text: 'Reactions',
          align: 'center',
          sortable: true,
          value: 'name',
        },
        {
          text: 'Number of reactions',
          value: 'number',
          align: 'center',
        },
      ],
      reactions: [],
    };
  },
  methods: {
    updateTable() {
      const emoticonIndex = findIndex(this.ratings.data, ['id', this.newRating.emoticonId]);
      this.reactions[emoticonIndex].number++;
    },
    populateTable() {
      this.reactions = [];
      forEach(this.ratings.data, (data) => {
        this.reactions.push({ name: data.name, number: data.count });
      });
    },
  },
  watch: {
    ratings: {
      handler() {
        this.populateTable();
      },
      deep: true,
    },
    newRating() {
      this.updateTable();
    },
  },
  computed: {
    ratings() {
      return this.$store.getters.pieChartData;
    },
    newRating() {
      return this.$store.getters.newRating;
    },
  },
};
</script>

<style>
.v-menu__content.theme--dark.v-menu__content--auto.menuable__content__active{
    transform-origin: left top;
    z-index: 8;
    top: 0 !important;
    left: 0 !important;
}
</style>
