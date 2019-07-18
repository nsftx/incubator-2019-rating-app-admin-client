<template>
  <div id="logout">
    <br>
    <h2>Already leaving ☹</h2>
    <h2>Press the button if you want to logout</h2>
    <v-btn
      dark
      @click="snackbarLogoutConfirm=true"
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
      {{ textLogoutConfirm }}
      <v-btn
        color="pink"
        flat
        @click="logout()"
      >
        Confirm
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
	data() {
		return{
			confirmed: false,
			password:"",
			snackbarLogoutConfirm: false,
			y: "top",
			x: null,
			mode: "",
			timeout: 3000,
			textLogoutConfirm: "One last confirmation...",
		}
	},
	methods: {
		logout() {
				this.$parent.logged=false
		}
	}
}
</script>

<style>
#logoutBttn{
  font-size:24px;
  border: 1px solid rgb(190, 190, 190);
  padding: 10px 20px;
  border-radius: 5px;
}
</style>
