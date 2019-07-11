import axios from 'axios';

const API_URL = 'http://172.20.15.52:3000';

export default {
  getActiveSettings() {
    return axios.get(`${API_URL}/settings`)
      .then(response => response.data);
  },
  postSettings(settings) {
    return axios.post(`${API_URL}/settings`, settings)
      .then(response => response.data);
  },
  getThanksMessages() {
    return axios.get(`${API_URL}/messages`)
      .then(response => response.data);
  }
};
