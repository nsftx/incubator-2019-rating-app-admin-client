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
        <v-icon
          dark
          style="padding-right: 10px;"
        >
          error
        </v-icon>
        {{ textLoginFail }}
        <v-btn
          color="white"
          flat
          @click="snackbarLoginFail = false"
        >
          Close
        </v-btn>
      </v-snackbar>
      <h1>Ratings app - Dashboard</h1>
      <h1>Login</h1>
      <br>
      <p style="text-align: left; margin-left:200px; color:rgb(190, 190, 190);">
        Welcome to the Rating Dashboard! Please enter your credentials<br>
        Please login with OAuth
      </p>
      <br>
      <router-link to="/">
        <v-btn
        color="error"
        dark
        large
        style="float: left; margin-left: 200px;"
        @click="login()">
          Login with Google+
        </v-btn>
      </router-link>
      <img src="./assets/Artwork.svg" style="margin-right: 5px; float:right; top: 10px ; position: fixed;">
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
        <v-icon
          dark
          style="padding-right:10px;"
        >
          person
        </v-icon>
        {{ textLoginSuccess }}{{ firstName }}
        <v-btn
          color="white"
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
                :src="imgAvatar"
                alt="admin"
              >
            </v-avatar><b>{{nameAvatar}}</b>
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
import ApiService from '@/services/ApiService';

export default {
  data() {
    return {
      firstName: '',
      imgAvatar: '',
      nameAvatar: '',
      show1: false,
      rules: {
        required: value => !!value || 'Required. Password: admin',
        min: v => v.length >= 5 || 'Min 5 characters. Password: admin',
      },
      logged: false,
      password: '',
      snackbarLoginSuccess: false,
      snackbarLoginFail: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      textLoginSuccess: 'Login success! Welcome ',
      textLoginFail: 'You have entered wrong credentials, try again!',
    };
  },
  methods: {
    login() {
      const that = this;
      this.$gAuth.signIn()
        .then((GoogleUser) => {
        // On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
          that.imgAvatar = GoogleUser.w3.Paa;
          that.nameAvatar = GoogleUser.w3.ig;
          that.firstName = GoogleUser.w3.ofa;
          // GoogleUser.getId() : Get the user's unique ID string.
          // GoogleUser.getBasicProfile() : Get the user's basic profile information.
          // GoogleUser.getAuthResponse()
          //Get the response object from the user's auth session. access_token and so on
          this.isSignIn = this.$gAuth.isAuthorized;
          const userInfo = {
            sub: GoogleUser.w3.Eea,
            given_name: GoogleUser.w3.ofa,
            family_name: GoogleUser.w3.wea,
            picture: GoogleUser.w3.Paa,
            email: GoogleUser.w3.U3,
          };
          ApiService.newUser(userInfo)
            .then((response) => {
              if (response.error == false) {
                that.logged = true;
                that.snackbarLoginSuccess = true;
              } else {
                that.snackbarLoginFail = true;
              }
            });
        })
        .catch((error) => {
          that.snackbarLoginFail = true;
        // on fail do something
        });
    },
  },
};
</script>
<style lang="less">
p {
  color:white;
}
#buttonSettings{
  bottom: 0;
  left:0;
  position: fixed;
  width:6%;
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
.theme--dark.v-btn:not(.v-btn--icon):not(.v-btn--flat){
  background:rgb(231, 72, 72) !important;
}
</style>
