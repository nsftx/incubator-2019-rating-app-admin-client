import axios from 'axios';

const API_URL = 'http://172.105.81.4:3000/api/v1';
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
  authUser(idToken) {
    return axios.post(`${API_URL}/users/auth`, idToken);
  },
};
