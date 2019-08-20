import axios from 'axios';

const API_URL = 'http://172.20.116.56:3000/api/v1';
export default {
  getActiveSettings() {
    return axios.get(`${API_URL}/settings/last`);
  },
  createSettings(settings) {
    return axios.post(`${API_URL}/settings`, settings);
  },
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
