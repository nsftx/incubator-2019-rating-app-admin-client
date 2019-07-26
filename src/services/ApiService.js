/* eslint-disable no-tabs */
import axios from 'axios';

const API_URL = 'http://172.20.116.250:3000';

export default {
  getActiveSettings() {
    return axios.get(`${API_URL}/settings/last`)
      .then(response => response.data);
  },
  createSettings(settings) {
    return axios.post(`${API_URL}/settings`, settings)
      .then(response => response.data);
  },
  getThanksMessages() {
    return axios.get(`${API_URL}/messages`)
      .then(response => response.data);
  },
  createNewMessage(settingsId, message) {
    return axios.post(`${API_URL}/messages/${settingsId}`, message)
      .then(response => response.data);
  },
  getEmoticonGroup() {
    return axios.get(`${API_URL}/emoticonsGroups`)
      .then(response => response.data);
  },
  updateActiveSettings(settings, id) {
    return axios.put(`${API_URL}/settings/${id}`, settings)
      .then(response => response.data);
  },
  getRatingsByInterval() {
    return axios.get(`${API_URL}/ratings/range`)
      .then(response => response.data);
  },
  getTotalByDay() {
    return axios.get(`${API_URL}/ratings/count`)
      .then(response => response.data);
  },
  createNewRange(dateWithInterval) {
    return axios.post(`${API_URL}/ratings/range`, dateWithInterval)
      .then(response => response.data);
  },
  createNewDaily(date) {
    return axios.post(`${API_URL}/ratings/count`, date)
      .then(response => response.data);
  },
  createNewReport(date) {
    return axios.post(`${API_URL}/ratings/report`, date)
      .then(response => response.data);
  },
  createReportForDays(date) {
    return axios.post(`${API_URL}/ratings/days`, date)
      .then(response => response.data);
  },
  newUser(user) {
    return axios.post(`${API_URL}/users/login`, user)
      .then(response => response.data);
  },
  inviteUser(user) {
    return axios.post(`${API_URL}/invites`, user)
      .then(response => response.data);
  },
};
