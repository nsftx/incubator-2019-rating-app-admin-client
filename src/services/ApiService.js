import axios from "axios";

const API_URL = "http://172.20.115.240:3000";

export default {
  getActiveSettings() {
    return axios.get(`${API_URL}/settings/last`)
      .then(response => response.data)
  },
  createSettings(settings) {
    return axios.post(`${API_URL}/settings`, settings)
      .then(response => response.data)
  },
  getThanksMessages() {
    return axios.get(`${API_URL}/messages`)
      .then(response => response.data)
  },
  updateActiveSettings(settings, id) {
    return axios.put(`${API_URL}/settings/${id}`, settings)
      .then(response => response.data)
  },
};
