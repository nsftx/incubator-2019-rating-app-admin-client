<template>
  <div id="app">
    <div
      v-show="!logged"
      id="login"
    >
      <v-snackbar
        v-model="snackbar2"
        :bottom="y === 'bottom'"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :right="x === 'right'"
        :timeout="timeout"
        :top="y === 'top'"
        :vertical="mode === 'vertical'"
      >
        {{ text2 }}
        <v-btn
          color="pink"
          flat
          @click="snackbar2 = false"
        >
          Close
        </v-btn>
      </v-snackbar>
      <br>
      <h1>Login</h1>
      <br>
      <p style="text-align: left; margin-left:200px; color:rgb(190, 190, 190);">
        Welcome to the Rating Dashboard! Please enter your credentials
      </p>
      <br>
      <v-flex
        xs12
        sm6
      >
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'visibility' : 'visibility_off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 5 characters"
          counter
          dark
          color="grey"
          style="margin-left: 200px;"
          @click:append="show1 = !show1"
        />
      </v-flex>
      <v-btn
        dark
        style="float: left; margin-left: 200px;"
        @click="login()"
      >
        Login
      </v-btn>
    </div>
    <div v-show="logged">
      <v-snackbar
        v-model="snackbar"
        :bottom="y === 'bottom'"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :right="x === 'right'"
        :timeout="timeout"
        :top="y === 'top'"
        :vertical="mode === 'vertical'"
      >
        {{ text }}
        <v-btn
          color="pink"
          flat
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
      <div class="buttonUser">
        <router-link to="/logout">
          <v-chip
            v-show="logged"
            :dark="true"
          >
            <v-avatar>
              <img
                src="https://img.icons8.com/bubbles/2x/user.png"
                alt="admin"
              >
            </v-avatar><b>Administrator</b>
          </v-chip>
        </router-link>
      </div>
      <br>
      <div
        v-show="logged"
        id="dash-nav"
      >
        <router-link to="/">
          <div id="buttonToday">
            <img
              src="./assets/today.png"
              class="icons"
            >
            <p style="text-align='center'">
              Today
            </p>
          </div>
        </router-link>
        <router-link to="/reports">
          <div id="buttonReports">
            <img
              src="./assets/report.png"
              class="icons"
            >
            <p style="text-align='center'">
              Reports
            </p>
          </div>
        </router-link>
        <router-link to="/settings">
          <div id="buttonSettings">
            <img
              src="./assets/settings.png"
              class="icons"
            >
            <p style="text-align='center'">
              Settings
            </p>
          </div>
        </router-link>
      </div>
      <router-view /> 
    </div>
  </div>
</template>
<script>
export default{
	data() {
		return {
      show1: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 5 || 'Min 5 characters'
      },
			logged: false,
			password: "",
      snackbar: false,
      snackbar2: false,
			y: "top",
			x: null,
			mode: "",
			timeout: 6000,
			text: "Login success! Welcome administrator!",
      text2: "You have entered wrong credentials, try again!"
		}
	},
	methods: {
		login(){
			if(this.password==="admin")
			{
				this.logged=true
			}
			else
			{
				this.snackbar2=true;
			}
			if(this.logged){
				this.snackbar=true
			}
		}
	}
}
</script>
<style lang="less">
p {
  color:white;
}
#buttonSettings{
  margin-top:810px;
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
.elevation-1 > * {
    border-radius: 5px !important;
}
.v-datatable__actions {
    border-radius: 5px;
}
@media screen and ( min-height: 1110px ){
#buttonSettings{
  margin-top:910px;
}
}
</style>
