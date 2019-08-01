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
};
</script>

<style lang="less">
p {
  color:white;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(190, 190, 190);
}
body {
  background: #1B1E24;
}
::-webkit-scrollbar {
    display: none;
}
a{
  text-decoration: none;
  color: rgb(190, 190, 190);
}
h1{
  font-size:55px;
}
h1,h2{
  text-align:left;
  margin-left: 200px;
}
.elevation-1 > * {
    border-radius: 5px !important;
}
.v-datatable__actions {
    border-radius: 5px;
}
.logoWhite {
  width: 35%;
  margin-top: 20px;
  margin-bottom: 15px;
}
table.v-datatable.v-table.theme--dark {
    background: #2D3038;
}
.v-datatable__actions {
    background: #2D3038 !important;
}
button.v-btn.theme--dark {
    background: #2D3038 !important;
}
span.v-chip__content {
    background: #2D3038 !important;
}
button.v-btn.theme--light {
    background: #2D3038 !important;
    color: white;
}
</style>
