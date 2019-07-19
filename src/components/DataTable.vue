<template id="data-table-temp">
  <v-data-table
    :headers="headers"
    :items="reactions"
    class="elevation-1"
    :dark="true"
  >
    <template v-slot:items="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">
        {{ props.item.number }}
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            headers: [
				{
					text: "Reactions",
					align: "left",
					sortable: true,
					value: "name"
				},
				{ text: "Number of reactions", value: "number" }
            ],
            reactions: [
				{
					name: "Happy",
					number: 200
				},
				{
					name: "Happy-Meh",
					number: 100
				},
				{
					name: "Meh",
					number: 75
				},
				{
					name: "Meh-Sad",
					number: 50
				},
				{
					name: "Sad",
					number: 25
				}
			]
        }
    },
    template: "#data-table-temp"
}
</script>

<style>

</style>
