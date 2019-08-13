<template>
  <div id="logout">
    <h3 class="profileWelcome">Welcome to your profile</h3>
    <v-divider
      class="dividerLogout"
      dark
    />
    <div class="profileInfo">
      <h2>First name: {{this.$parent.firstName}}</h2>
      <h2>Last name: {{this.$parent.lastName}}</h2>
      <h2>E-mail address: {{this.$parent.email}}</h2>
      <img :src="this.$parent.imgAvatar" class="profileAvatar">
    </div>
    <v-divider
      class="dividerLogout"
      dark
    />
    <h2>Want to invite a new user?</h2>
    <v-text-field
                v-model="inviteMail"
                dark
                color="grey"
                label="e-mail address"
                type="email"
                style="width: 80%; margin-left: 200px;"
                class="inviteMail"
              />
    <div class="smallSpacing"></div>
    <v-btn dark @click="invite()" class="inviteBtn" style="float:left;margin-left:200px;">Invite user</v-btn>
    <v-btn
      class="logout"
      dark
      @click="logout()"
    >
      Logout
    </v-btn>
    <api-snackbar>
      <v-icon
        class="snackbar-icon"
        dark
      >
        error
      </v-icon>
    </api-snackbar>
    <api-snackbar>
      <v-icon
        class="snackbar-icon"
        dark
      >
        error
      </v-icon>
    </api-snackbar>
  </div>
</template>

<script>
import ApiSnackbar from '../components/ApiSnackbar.vue';

export default {
  components: {
    ApiSnackbar,
  },
  data() {
    return {
      confirmed: false,
      password: '',
      inviteMail: '',
    };
  },
  methods: {
    logout() {
      this.$gAuth.signOut()
        .then(() => {
          localStorage.clear();
        });
      this.$parent.logged = false;
    },
    invite() {
      this.$store.dispatch('invite', { email: this.inviteMail });
    },
  },
};
</script>

<style scoped>
.profileInfo{
  width: 80%;
  padding-top:25px;
  padding-bottom:25px;
  margin-left: 125px;
  border-radius: 3px;
}
.profileAvatar{
  float:right;
  margin-top: -85px;
  margin-right:15px;
  border-radius:3px;
}
.profileInfo h2{
  font-weight: normal;
}
.dividerLogout {
  margin: 30px 0px 30px 200px;
  width:80%;
}
.inviteMail {
  width: 80%;
  margin: 40px 0px 20px 200px;
}
.inviteBtn {
  float:left;
  margin-left:200px;
}
.logout {
  float:left;
  margin-left:50px;
}
.snackbar-icon {
  padding-right: 10px;
}
.profileWelcome {
  text-align: left;
  font-size: 2vw;
  margin-left: 200px;
  padding-top: 80px;
}
@media only screen and (max-width: 600px) {
  .profileInfo{
    width: 100%;
    margin-top: 150px;
    text-align: center;
    margin-left: 0;
  }
  .profileAvatar{
    width:15%;
    height: auto;
  }
  .dividerLogout {
  margin: 0 auto;
  left: 0;
  right: 0;
}
  .v-input.inviteMail.v-text-field.theme--dark{
    margin-left: auto !important;
    margin-right: auto !important;
    left: 0;
    right: 0;
  }
  button.inviteBtn.v-btn.theme--dark, button.logout.v-btn.theme--dark{
    float: none !important;
    margin-left: 0 !important;
  }
}
</style>
