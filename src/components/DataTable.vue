<template id="data-table-temp">
  <div id="dataTable">
    <div id="tableData">
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  template: '#data-table-temp',
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
    ...mapGetters({
      ratings: 'pieChartData',
    }),
  },
};
</script>

<style>

</style>
