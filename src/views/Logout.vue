<template>
  <div id="logout">
    <div class="spacing"></div>
    <h3 class="profileWelcome">Welcome to your profile</h3>
    <v-divider
            class="dividerLogout"
            dark
          />
    <div class = "profileInfo">
      <h2>First name: {{this.$parent.firstName}}</h2>
      <h2>Last name: {{this.$parent.lastName}}</h2>
      <h2>E-mail address: {{this.$parent.email}}</h2>
      <img :src="this.$parent.imgAvatar" class="profileAvatar">
    </div>
    <v-divider
            class="dividerLogout"
            dark
          />
    <div class="smallSpacing"></div>
    <h2>Want to invite a new user?</h2>
    <div class="smallSpacing"></div>
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
      dark
      @click="snackbarLogoutConfirm=true"
      style="float:left;margin-left:50px;"
      class="logoutBtn"
    >
      Logout
    </v-btn>
    <v-snackbar
      v-model="snackbarLogoutConfirm"
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
        notification_important
      </v-icon>
      {{ textLogoutConfirm }}
      <v-btn
        color="white"
        flat
        @click="logout()"
      >
        Confirm
      </v-btn>
    </v-snackbar>
    <v-snackbar
      v-model="snackbarInviteExisting"
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
      {{ textInviteExisting }}
      <v-btn
        color="white"
        flat
        @click="setSnackbarExist(false)"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-snackbar
      v-model="snackbarInviteSuccess"
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
      {{ textInviteSuccess }}
      <v-btn
        color="white"
        flat
        @click="setSnackbarSuccess(false)"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      confirmed: false,
      password: '',
      snackbarLogoutConfirm: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 3000,
      textLogoutConfirm: 'One last confirmation...',
      inviteMail: '',
      textInviteExisting: 'Invite is already sent',
      textInviteSuccess: 'Invite successfully sent',
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
    setSnackbarExist(value) {
      this.$store.dispatch('setSnackbarExist', value);
    },
    setSnackbarSuccess(value) {
      this.$store.dispatch('setSnackbarExist', value);
    },
  },
  computed: {
    snackbarInviteExisting() {
      return this.$store.getters.snackbarExist;
    },
    snackbarInviteSuccess() {
      return this.$store.getters.snackbarSuccess;
    },
  },
};
</script>

<style scoped>
.smallSpacing {
  height: 20px;
}
.spacing{
  height: 80px;
}
.profileInfo{
  width: 80%;
  padding-top:25px;
  padding-bottom:25px;
  margin-left:125px;
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
  margin: 20px 0;
  margin-left: 200px;
  width:80%;
}
.profileWelcome {
  text-align: left;
  font-size: 2vw;
  margin-left: 200px;
}
@media only screen and (max-width: 600px) {
  .profileInfo{
    width: 100%;
    margin-top: 200px;
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
  button.inviteBtn.v-btn.theme--dark, button.logoutBtn.v-btn.theme--dark{
    float: none !important;
    margin-left: 0 !important;
  }
}
</style>
