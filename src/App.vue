<template>
  <div id="app">
    <logged></logged>
  </div>
</template>
<script>
import Logged from './components/Logged.vue';

export default {
  components: {
    Logged,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.$store.dispatch('newRating');
  },
};
</script>

<style lang="less">
@import './styles/main.less';
p {
  color: @white;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: @white;
}
body {
  background: @cinder;
}
a{
  text-decoration: none;
}
.elevation-1 > * {
    border-radius: 5px !important;
}
.v-datatable__actions {
    border-radius: 5px;
}
table.v-datatable.v-table.theme--dark {
    background: @dark-grey;
}
.v-datatable__actions {
    background: @dark-grey !important;
}
button.v-btn.theme--dark {
    background: @dark-grey !important;
}
span.v-chip__content {
    background: @dark-grey !important;
}
button.v-btn.theme--light {
    background: @dark-grey !important;
    color: @white;
}
.v-list.theme--dark {
    background: @dark-grey !important;
}
.apexcharts-menu-item.exportSVG:hover, .apexcharts-menu-item.exportPNG:hover {
    background: @arsenic !important;
}
.apexcharts-menu.open {
    background: @dark-grey;
}
.apexcharts-tooltip {
  color: @silver;
}
.error .v-snack__content {
  background: red;
}
.success .v-snack__content {
  background: green;
}
</style>
