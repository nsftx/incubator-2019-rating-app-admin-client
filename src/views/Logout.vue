<template>
  <div id="logout">
    <br>
    <h2>These are your profile preferences</h2>
    <br>
    <h2>Want to invite a new user?</h2>
    <br>
    <v-text-field
                v-model="inviteMail"
                dark
                color="grey"
                label="e-mail address"
                type="email"
                min="3"
                max="5"
                style="width: 50%; margin-right: 50px; float: right;"
              />
    <v-btn dark @click="invite()" style="float:left;margin-left:200px;">Invite user</v-btn>
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
        @click="snackbarInviteExisting = false"
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
        @click="snackbarInviteSuccess = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <h2 style="margin-top:75px;">Press the button if you want to logout</h2>
    <br>
    <v-btn
      dark
      @click="snackbarLogoutConfirm=true"
      style="float:left;margin-left:200px;"
    >
      Logout
    </v-btn>
  </div>
</template>

<script>
import ApiService from '@/services/ApiService';

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
      snackbarInviteExisting: false,
      textInviteExisting: 'Invite is already sent',
      snackbarInviteSuccess: false,
      textInviteSuccess: 'Invite successfully sent',
    };
  },
  methods: {
    logout() {
      this.$gAuth.signOut()
        .then(() => {
        // things to do when sign-out succeeds
        })
        .catch((error) => {
        // things to do when sign-out fails
        });
      this.$parent.logged = false;
    },
    invite() {
      const that = this;
      const userMail = {
        email: this.inviteMail,
      };
      ApiService.inviteUser(userMail)
        .then((response) => {
          if (response.error) {
            that.snackbarInviteExisting = true;
          } else {
            that.snackbarInviteSuccess = true;
          }
        });
    },
  },
};
</script>

<style>
#logoutBttn{
  font-size:24px;
  border: 1px solid rgb(190, 190, 190);
  padding: 10px 20px;
  border-radius: 5px;
}
</style>
