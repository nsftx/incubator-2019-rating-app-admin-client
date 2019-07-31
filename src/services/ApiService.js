/* eslint-disable no-tabs */
import axios from 'axios';

const API_URL = 'http://172.20.15.9:3000';
export default {
  getActiveSettings() {
    return axios.get(`${API_URL}/settings/last`) // ne treba token
      .then(response => response.data);
  },
  createSettings(settings) {
    return axios.post(`${API_URL}/settings`, settings)
      .then(response => response.data);
  },
  getConfig(token) {
    const config = {
      headers: {
        authorization: token,
      },
    };
    return config;
  },
  postData(url, payload, token) {
    return axios.post(url, payload, this.getConfig(token))
      .then(response => response.data);
  },
  getData(url, token) {
    return axios.get(url, this.getConfig(token))
      .then(response => response.data);
  },
  putData(url, payload, token) {
    return axios.put(url, payload, this.getConfig(token))
      .then(response => response.data);
  },
  authUser(idToken) {
    return axios.post(`${API_URL}/users/auth`, idToken)
      .then(response => response.data);
  },
};
