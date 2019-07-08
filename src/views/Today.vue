<template>
  <div id="today">
    <h1>Today is a new day.</h1>
    <h1>Check your ratings!</h1>
    <br>
    <h2>Graphs present your rating results. Today you have {{ today }} rates,</h2>
    <h2>check it on the dashboard.</h2>
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

</style>
