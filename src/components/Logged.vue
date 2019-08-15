<template id = "app" >
  <div id="app">
    <div
      v-show="!logged"
      id="login"
    >
      <br>
      <api-snackbar>
        <v-icon
          dark
          style="padding-right: 10px;"
        >
          error
        </v-icon>
      </api-snackbar>
      <h1>Ratings app - Dashboard</h1>
      <h1>Login</h1>
      <br>
      <p class="respLogin" style="text-align: left; margin-left:200px; color:rgb(190, 190, 190);">
        Welcome to the Rating Dashboard! Please enter your credentials<br>
        Please login with OAuth
      </p>
      <br>
        <v-btn
        color="error"
        dark
        large
        style="float: left; margin-left: 200px;"
        class="GAuth"
        @click="login()">
          Login with Google+
        </v-btn>
      <img src="../assets/Artwork.png" class="artLogin">
    </div>
    <div v-show="logged">
      <api-snackbar>
        <v-icon
          dark
          style="padding-right:10px;"
        >
          person
        </v-icon>
      </api-snackbar>
      <div class="buttonUser"
            v-show="hidden"
            >
        <router-link to="/logout">
          <v-chip
            v-show="logged"
            :dark="true"
            @click="activePath('logout')" :class="{activeBtn: active === 'logout' }"
          >
            <v-avatar>
              <img
                :src="imgAvatar"
              >
            </v-avatar><b>{{nameAvatar}}</b>
          </v-chip>
        </router-link>
      </div>
      <div
        v-show="logged"
        class="dash-nav"
      >
      <p class="hideNav" @click="hideNav()">≡</p>
        <div id="logo">
          <img src="../assets/logo_white1.png" class="logoWhite">
        </div>
        <router-link to="/today">
          <div class="buttonToday"
            v-show="hidden"
            @click="activePath('today')" :class="{activeBtn: active === 'today' }">
            <img
              src="../assets/today.png"
              class="icons"
            >
            <p style="text-align='center'">
              Today
            </p>
          </div>
        </router-link>
        <router-link to="/reports">
          <div class="buttonReports"
            v-show="hidden"
            @click="activePath('reports')" :class="{activeBtn: active === 'reports' }">
            <img
              src="../assets/report.png"
              class="icons"
            >
            <p style="text-align='center'">
              Reports
            </p>
          </div>
        </router-link>
        <router-link to="/settings">
          <div class="buttonSettings"
            v-show="hidden"
            @click="activePath('settings')" :class="{activeBtn: active === 'settings' }">
            <img
              src="../assets/settings.png"
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
import ApiSnackbar from './ApiSnackbar.vue';

export default {
  components: {
    ApiSnackbar,
  },
  template: '#logged',
  data() {
    return {
      active: 'today',
      path: '/',
      firstName: '',
      imgAvatar: '',
      nameAvatar: '',
      lastName: '',
      email: '',
      logged: false,
      inLocal: false,
      hidden: true,
    };
  },
  methods: {
    hideNav() {
      if (this.hidden) {
        this.hidden = false;
        document.getElementsByClassName('dash-nav')[0].style = 'height: 50px;';
        document.getElementsByClassName('margin-h-top')[0].style.marginTop = '60px';
      } else {
        this.hidden = true;
        document.getElementsByClassName('dash-nav')[0].style = 'height: 230px;';
        document.getElementsByClassName('margin-h-top')[0].style.marginTop = '240px';
      }
    },
    activePath(path) {
      this.active = path;
      localStorage.setItem('activePath', path);
    },
    login() {
      this.$gAuth.signIn()
        .then((GoogleUser) => {
          this.imgAvatar = GoogleUser.w3.Paa;
          this.nameAvatar = GoogleUser.w3.ig;
          this.firstName = GoogleUser.w3.ofa;
          this.lastName = GoogleUser.w3.wea;
          this.email = GoogleUser.w3.U3;
          localStorage.setItem('imgAvatar', this.imgAvatar);
          localStorage.setItem('nameAvatar', this.nameAvatar);
          localStorage.setItem('firstName', this.firstName);
          localStorage.setItem('lastName', this.lastName);
          localStorage.setItem('email', this.email);
          this.isSignIn = this.$gAuth.isAuthorized;
          // eslint-disable-next-line camelcase
          const { id_token } = GoogleUser.getAuthResponse();
          // eslint-disable-next-line camelcase
          this.$store.dispatch('createToken', id_token);
          const payLoad = {};
          ApiService.postData('http://172.20.15.193:3000/api/v1/users/login', payLoad, id_token)
            .then((response) => {
              if (response.data.error == false) {
                this.logged = true;
                this.$store.dispatch('setMessage', { type: 'success', text: 'Login success! Welcome' });
                localStorage.setItem('token', id_token);
                this.inLocal = true;
                localStorage.setItem('inLocal', this.inLocal);
                this.$router.push({ path: '/today' });
              } else {
                this.$store.dispatch('setMessage', { type: 'success', text: 'Oops. You are a non-existing user. Please ask for an invite.' });
                this.$router.push({ path: '/' });
              }
            });
        })
      // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          this.$router.push({ path: '/' });
        });
    },
  },
  created() {
    if (localStorage.getItem('inLocal')) {
      this.$store.dispatch('createToken', localStorage.getItem('token'));
      this.logged = true;
      this.imgAvatar = localStorage.getItem('imgAvatar');
      this.nameAvatar = localStorage.getItem('nameAvatar');
      this.firstName = localStorage.getItem('firstName');
      this.lastName = localStorage.getItem('lastName');
      this.email = localStorage.getItem('email');
      this.active = localStorage.getItem('activePath');
    }
  },
};
</script>
<style lang="less">
@import '../styles/main.less';
.artLogin{
  margin-right: 5px;
  float:right;
  top: 10px ;
  position: fixed;
}
p {
  color:@white;
}
.buttonSettings{
  bottom: 0;
  left:0;
  position: fixed;
  width:6%;
}
.buttonToday:hover,
.buttonReports:hover,
.buttonSettings:hover{
  background: @dim-grey;
  cursor: pointer;
}
.hideNav{
  display:none;
}
.buttonToday,
.buttonReports,
.buttonSettings{
  height: 100px;
}
.activeBtn{
  background: @dim-grey;
}
.dash-nav {
  top: 0;
  left: 0;
  width: 6%;
  height: 100%;
  position: fixed;
  background: @dark-grey;

}
::-webkit-scrollbar {
    display: none;
}
.icons{
height:30px;
width:auto;
margin-top:20px;
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
.logoWhite {
  width: 35%;
  margin-top: 20px;
  margin-bottom: 15px;
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
@media only screen and (max-width: 1024px) {
.margin-h-top{
  margin-top:60px;
}
  .hideNav{
    display:block;
    font-size:36px;
  }
  .buttonToday,
  .buttonReports,
  .buttonSettings{
    height: 50px;
  }
  .dash-nav {
    top: 0;
    left: 0;
    width: 100%;
    height: 240px;
    position: absolute;
    background: @dark-grey;
    z-index: 1;
  }
  .icons{
  height:25px;
  width:auto;
  margin-top:3px;
  }
  h1,h2{
    text-align:center;
    margin-left: 0px;
  }
  .buttonUser {
    position: absolute;
    right: 0;
    top:0;
    z-index: 2 !important;
}
  .logoWhite {
    display:none;
  }
  .buttonSettings{
  top:0;
  position: relative;
  width:100%;
}
h1{
  font-size:36px;
}
.respLogin{
  margin-left:0 !important;
  text-align: center !important;
}
.GAuth{
  float: none !important;
  margin-left: 0 !important;
}
img.artLogin {
    margin-right: auto;
    margin-left: auto;
    margin-top: 50px;
    float: none;
    position: relative;
    height: 200px;
}
}
</style>
