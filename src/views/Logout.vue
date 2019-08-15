<template>
  <div id="logout">
    <h2 class="margin-h-top profileWelcome">Welcome to your profile</h2>
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
      class="inviteMail"
      v-model="inviteMail"
      dark
      color="grey"
      label="e-mail address"
      type="email"
    />
    <v-btn class="inviteBtn" dark @click="invite()">Invite user</v-btn>
    <v-btn
      class="logout"
      dark
      @click="snackbarLogoutConfirm=true"
    >
      Logout
    </v-btn>
    <v-snackbar
      top
      color="#2196F3"
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
  </div>
</template>

<script>

export default {
  data() {
    return {
      snackbarLogoutConfirm: false,
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

<style>
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
  margin-top:10px;
  padding-top:20px;
  text-align: center;
}
@media only screen and (max-width: 1024px) {
  .profileWelcome{
  margin-top:40px;
  }
  .profileInfo{
    width: 100%;
    text-align: center;
    margin-left: 0;
  }
  .profileAvatar{
    width:15%;
    height: auto;
  }
  .dividerLogout {
  margin: 15px auto;
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
