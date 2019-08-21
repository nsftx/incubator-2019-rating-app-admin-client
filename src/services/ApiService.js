import axios from 'axios';

export default {
  getConfig(token) {
    return {
      headers: {
        authorization: token,
      },
    };
  },
  postData(url, payload, token) {
    return axios.post(url, payload, this.getConfig(token));
  },
  getData(url, token) {
    return axios.get(url, this.getConfig(token));
  },
  putData(url, payload, token) {
    return axios.put(url, payload, this.getConfig(token));
  },
};
