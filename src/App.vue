<template>
<div id="app">
    <div id="login" v-show="!logged">
      <br>
      <h2 style="text-align:center; margin:0;">Password</h2><br>
      <input type="password" v-model="password" style="font-size:24px; border: 1px solid rgb(190, 190, 190); padding: 10px 20px; border-radius: 5px; margin-right: 10px;">
      <button @click="login()" style="font-size:24px; border: 1px solid rgb(190, 190, 190); padding: 10px 20px; border-radius: 5px;">Login</button>
    </div>
  <div v-show="logged">
    <div class="buttonUser">
       <router-link to="/logout"><v-chip v-show="logged" :dark="true">
          <v-avatar>
            <img src="https://img.icons8.com/bubbles/2x/user.png" alt="admin">
          </v-avatar><b>Administrator</b>
        </v-chip></router-link>
      </div>
      <br>
    <div id="dash-nav" v-show="logged">
       <router-link to="/"><div id="buttonToday">
      <img src="./assets/today.png" class="icons">
      <p style="text-align='center'">Today</p>
      </div></router-link>
      <router-link to="/reports"><div id="buttonReports">
      <img src="./assets/report.png" class="icons">
      <p style="text-align='center'">Reports</p>
      </div></router-link>
      <router-link to="/settings"><div id="buttonSettings">
      <img src="./assets/settings.png" class="icons">
      <p style="text-align='center'">Settings</p>
      </div></router-link>
    </div>
    <router-view></router-view> 
  </div>
</div>
</template>
<script>
export default{
	data() {
		return {
			logged: false,
			password: ""
		}
	},
	methods: {
		login(){
			if(this.password==="admin")
			{
				alert("Welcome administrator!")
				this.logged=true
			}
			else
			{
				alert("Wrong password!")
			}
		}
	}
}
</script>
<style lang="less">
p {
  color:white;
}
#buttonToday{
  margin-top:20px;
}
#buttonSettings{
  margin-top:750px;
}
#buttonToday:hover,
#buttonReports:hover,
#buttonSettings:hover{
  background: #616161;
  cursor: pointer;
}
#buttonToday,
#buttonReports,
#buttonSettings{
  height: 100px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(190, 190, 190);
}
#dash-nav {
  top: 0;
  left: 0;
  width: 6%;
  height: 100%;
  position: fixed;
  background: #444444;
  
}
body {
  background: rgb(18, 20, 22);
}
.icons{
height:30px; 
width:auto;
margin-top:20px;
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
.buttonUser {
    float: right;
    margin-right: 10px;
    margin-top:10px;
    margin-bottom:20px;
}
</style>
