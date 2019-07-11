<template id="ratings-pie-chart">
    <apexcharts type="pie" height="350" :options="chartOptions" :series="chartSeries"></apexcharts>
</template>

<script>
import ApexCharts from "vue-apexcharts"

export default {
    template: "#ratings-pie-chart",
    components: {
        apexcharts: ApexCharts
    },
    data() {
        return {
            chartSeries: [200, 100, 75, 50, 25],
            chartOptions: {
                labels: ["Happy", "Happy-Meh", "Meh", "Sad-Meh", "Sad"],
                legend: {
                    position: "bottom",
                    labels: {
                        colors: "#fff",
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
