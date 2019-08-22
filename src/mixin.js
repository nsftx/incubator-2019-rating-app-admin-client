import moment from 'moment';

export default {
  install(Vue) {
    Vue.mixin({
      methods: {
        getToday() {
          return moment().format('YYYY-MM-DD');
        },
      },
    });
  },
};
