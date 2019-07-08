<template>
  <div id="logout">
    <h3>Hello there...</h3>
    <button @click="logout()">Logout</button>
  </div>
</template>

<script>
export default {
mounted: {
    logged:false
},
data() {
    return{
    password:""
    }
},
methods: {
    logout() {
      if(confirm("Are you sure you want to logout?"))
      {
      alert("Success!");
      }
    }
}
}
</script>

<style>

</style>
