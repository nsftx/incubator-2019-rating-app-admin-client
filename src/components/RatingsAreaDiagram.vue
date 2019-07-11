<template id="ratings-area-diagram">
    <apexcharts type="area" height="400" :options="diagramOptions" :series="diagramSeries"></apexcharts>
</template>

<script>
import ApexCharts from "vue-apexcharts"

export default {
    template: "#ratings-area-diagram",
    components: {
        apexcharts: ApexCharts
    },
    data() {
        return {
            diagramSeries: [{
				name: "Happy",
				data: [10, 20, 30, 40, 50, 60, 70]
			}, {
				name: "Happy-Meh",
				data: [5, 10, 15, 20, 25, 30, 35]
			},{
				name: "Meh",
				data: [11, 13, 15, 17, 19, 25, 29]
			}, {
				name: "Sad-Meh",
				data: [1, 1, 6, 8, 8, 9, 11]
			},{
				name: "Sad",
				data: [3, 13, 20, 40, 50, 70, 82]
			}],
			diagramOptions: {
				dataLabels: {
					enabled: false,
				},
				stroke: {
					width: 2,
				},
				legend: {
					onItemClick: {
						toggleDataSeries: false
					},
					labels: {
						colors: "#fff",
					},
				},
				xaxis: {
					labels: {
						style: {
							colors: "#fff",
						},
					},
					type: "datetime",
					categories: ["2019-09-10T00:00:00", "2019-09-10T03:00:00", "2019-09-10T07:00:00", "2019-09-10T11:00:00", "2019-09-10T15:00:00", "2019-09-10T019:00:00", "2019-09-10T023:59:00"],                
				},
				yaxis: {
					labels: {
						style: {
							color: "#fff",
						},
					},
				},
				title: {
					text: "Ratings",
					style: {
						color: "#fff"
					},
				},
			},
        }
    },
}
</script>

<style>

</style>
