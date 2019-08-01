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
import { mapGetters } from 'vuex';

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
    populateTable() {
      this.reactions = [];
      // Refactor
      function Reaction(name, number) {
        this.name = name;
        this.number = number;
      }
      let i = 0;
      _.times(this.ratings.data.length, () => this.reactions.push(
        new Reaction(
          this.ratings.data[i].emoticon.name,
          this.ratings.data[i++].count,
        ),
      ));
    },
  },
  watch: {
    ratings: {
      handler() {
        this.populateTable();
      },
      deep: true,
    },
  },
  computed: {
    // No need to load mapGetters for single getter
    ...mapGetters({
      ratings: 'pieChartData',
    }),
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
