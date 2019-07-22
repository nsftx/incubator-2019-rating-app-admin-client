<template>
  <div id="app">
    <div
      v-show="!logged"
      id="login"
    >
      <br>
      <v-snackbar
        v-model="snackbarLoginFail"
        :bottom="y === 'bottom'"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :right="x === 'right'"
        :timeout="timeout"
        :top="y === 'top'"
        :vertical="mode === 'vertical'"
      >
      <v-icon dark style="padding-right: 10px;">error</v-icon>
        {{ textLoginFail }}
        <v-btn
          color="pink"
          flat
          @click="snackbarLoginFail = false"
        >
          Close
        </v-btn>
      </v-snackbar>
      <h1>Login</h1>
      <br>
      <p style="text-align: left; margin-left:200px; color:rgb(190, 190, 190);">
        Welcome to the Rating Dashboard! Please enter your credentials<br>This view will be replaced with Google OAuth
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
          hint="5 characters"
          counter
          dark
          color="grey"
          style="margin-left: 200px;"
          @click:append="show1 = !show1"
        />
      </v-flex>
      <router-link to="/">
        <v-btn
          dark
          style="float: left; margin-left: 200px;"
          @click="login()"
        >
          Login
        </v-btn>
      </router-link>
    </div>
    <div v-show="logged">
      <v-snackbar
        v-model="snackbarLoginSuccess"
        :bottom="y === 'bottom'"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :right="x === 'right'"
        :timeout="timeout"
        :top="y === 'top'"
        :vertical="mode === 'vertical'"
      >
      <v-icon dark style="padding-right:10px;">person</v-icon>
        {{ textLoginSuccess }}
        <v-btn
          color="pink"
          flat
          @click="snackbarLoginSuccess = false"
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
        required: value => !!value || 'Required. Password: admin',
        min: v => v.length >= 5 || 'Min 5 characters. Password: admin'
      },
			logged: false,
			password: "",
      snackbarLoginSuccess: false,
      snackbarLoginFail: false,
			y: "top",
			x: null,
			mode: "",
			timeout: 6000,
			textLoginSuccess: "Login success! Welcome administrator!",
      textLoginFail: "You have entered wrong credentials, try again!"
		}
	},
	methods: {
		login() {
			if(this.password==="admin")
			{
				this.logged=true
			}
			else
			{
				this.snackbarLoginFail=true;
			}
			if(this.logged){
				this.snackbarLoginSuccess=true
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
.buttonUser {
  z-index:0;
}
@media screen and ( min-height: 1110px ){
#buttonSettings{
  margin-top:910px;
}
}
</style>
