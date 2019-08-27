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
        Please login with your Google account
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
            v-show="toggleNav"
            >
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
      dark
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="indigo"
          dark
          v-on="on"
        >
          User settings
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img :src="imgAvatar" class="imgDropdown">
            </v-list-item-avatar>
            <br>
            <v-list-item-content>
              <v-list-item-title><b>{{nameAvatar}}</b>, </v-list-item-title>
              <v-list-item-subtitle>Administrator</v-list-item-subtitle>
            </v-list-item-content>

          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-btn @click="snackbarLogoutConfirm=true">Logout</v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-btn @click="dialogInvite=true">Invite user</v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
  <v-snackbar
      top
      color="#dba100"
      v-model="snackbarLogoutConfirm"
      :timeout="5000"
      >
      One last confirm...
      <button
        block
        color="primary"
        dark
        @click="logout()"
      >
        Confirm
      </button>
    </v-snackbar>
  <div class="text-center">
              <v-dialog
                v-model="dialogInvite"
                dark
                width="500"
              >
                <v-card>
                  <v-card-title
                    class="headline grey lighten-2"
                    primary-title
                  >
                    Invite new user
                  </v-card-title>

                  <v-text-field label="e-mail"
                  v-model="inviteMail"
                  class="mailInput"
                  clearable
                  ></v-text-field>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn
                      color="primary"
                      text
                      @click="invite()"
                    >
                      Invite user
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
      </div>
      <div
        v-show="logged"
        :class="{ maximizedNav : toggleNav }"
        class="minimizedNav dash-nav"
      >
      <p class="hideNav" @click="toggledNav()">≡</p>
        <div id="logo">
          <a href="https://www.nsoft.com" target="_blank"><img src="../assets/logo_white1.png" class="logoWhite"></a>
        </div>
        <router-link to="/today">
          <div class="buttonToday"
            v-show="toggleNav"
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
            v-show="toggleNav"
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
            v-show="toggleNav"
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
      inLocal: false,
      toggleNav: true,
      menu: false,
      message: false,
      dialogInvite: false,
      inviteMail: '',
      snackbarLogoutConfirm: false,
    };
  },
  methods: {
    logout() {
      this.$gAuth.signOut()
        .then(() => localStorage.clear());
      this.$store.commit('setLogged', false);
      this.$router.push({ path: '/' });
      this.active = 'today';
    },
    invite() {
      this.dialogInvite = false;
      this.$store.dispatch('invite', { email: this.inviteMail });
    },
    toggledNav() {
      this.toggleNav = !this.toggleNav;
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
          this.$store.dispatch('createToken', id_token)
            .then(() => {
              const payload = {};
              this.$store.dispatch('login', payload);
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
      this.$store.commit('setLogged', true);
      this.imgAvatar = localStorage.getItem('imgAvatar');
      this.nameAvatar = localStorage.getItem('nameAvatar');
      this.firstName = localStorage.getItem('firstName');
      this.lastName = localStorage.getItem('lastName');
      this.email = localStorage.getItem('email');
      this.active = localStorage.getItem('activePath');
      this.$router.push(this.active);
    }
  },
  computed: {
    logged() {
      return this.$store.getters.isLogged;
    },
  },
};
</script>
<style lang="less">
@import '../styles/main.less';
.imgDropdown {
  border-radius:25px;
  height:50px;
}
.v-input.mailInput.v-text-field.theme--dark {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
}
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
.v-card.v-sheet.theme--dark, .v-card__title.headline.grey.lighten-2.v-card__title--primary {
    background: #2D3038 !important;
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
.v-card__actions{
  background: @dark-grey;
}
@media only screen and (max-width: 1024px) {
  .v-menu__content.theme--dark{
    position:fixed;
    left:0;
    width:100%;
  }
.hideNav {
  margin-top: 10px;
}
.minimizedNav{
  height: 60px;
}
.maximizedNav{
  height: 230px;
}
.marginTop1{
  margin-top: 70px;
}
.marginTop2{
  margin-top: 240px !important;
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
.buttonUser {
    right: 0;
    margin-right: 0;
    margin-bottom:0;
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
