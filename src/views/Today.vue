<template>
  <div id="today">
    <h1>Today is a new day.</h1>
    <h1>Check your ratings!</h1>
    <br>
    <h2>Graphs present your rating results. Today you have {{ today }} rates,</h2>
    <h2>check it on the dashboard.</h2>
    <br>
    <div id="lineChart"><p>Place for line chart</p></div>
    <div id="pieChart"><p>Place for pie chart</p></div>
    <br>
    <div id="dataTable"><p>Place for data table</p></div>
  </div>
  
</template>

<script>
export default {
data:function(){
    return{
        today:0
    }
}
}
</script>

<style>
#lineChart{
  background:rgb(36, 40, 46);
  height:400px;
  width:55%;
  float:left;
  margin-left:150px;
  margin-right:20px;
}
#pieChart{
  background:rgb(36, 40, 46);
  width:30%;
  height:400px;
  float:left;
}
#dataTable{
  float:left;
  background:rgb(36, 40, 46);
  height:400px;
  width:45%;
  margin-left:150px;
  margin-top:25px;
}
</style>
