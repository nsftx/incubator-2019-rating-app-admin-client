<template id="api-snackbar">
  <v-snackbar
    top
    :color="snackbarMsg.type"
    v-model="snackbar"
    :timeout="2000"
  >
    {{ snackbarMsg.text }}
    <button
      block
      color="primary"
      dark
      @click="snackbar=false"
    >
      Close
    </button>
  </v-snackbar>
</template>

<script>
export default {
  template: '#api-snackbar',
  data() {
    return {
      snackbar: false,
    };
  },
  computed: {
    snackbarMsg() {
      return this.$store.getters.notifications;
    },
  },
  watch: {
    snackbarMsg() {
      this.snackbar = true;
    },
  },
};
</script>

<style scoped>
.snackbar {
  position: fixed;
}
</style>
