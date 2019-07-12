<template>
  <div id="logout">
    <br>
    <h1 style="text-align='center'">Want to logout?</h1>
    <button id="logoutBttn" @click="logout()">Logout</button>
  </div>
</template>

<script>
export default {
	mounted: {
		logged:false,
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
				this.$parent.logged=false
			}
		}
	}
}
</script>

<style>
#logoutBttn{
  font-size:24px;
  border: 1px solid rgb(190, 190, 190);
  padding: 10px 20px;
  border-radius: 5px;
}
</style>
