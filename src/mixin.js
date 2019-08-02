export default {
  install(Vue) {
    Vue.mixin({
      methods: {
        getToday() {
          return new Date().toISOString().substr(0, 10);
        },
      },
    });
  },
};
