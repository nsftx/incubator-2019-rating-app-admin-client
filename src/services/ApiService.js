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
  getThanksMessages(token) {
    const config = {
      headers: {
        authorization: token,
      },
    };
    return axios.get(`${API_URL}/messages`, config)
      .then(response => response.data);
  },
  createNewMessage(message, token) {
    const config = {
      headers: {
        authorization: token,
      },
    };
    return axios.post(`${API_URL}/messages`, message, config)
      .then(response => response.data);
  },
  getEmoticonGroup(token) {
    const config = {
      headers: {
        authorization: token,
      },
    };
    return axios.get(`${API_URL}/emoticonsGroups`, config)
      .then(response => response.data);
  },
  updateActiveSettings(settings, id, token) {
    const config = {
      headers: {
        authorization: token,
      },
    };
    return axios.put(`${API_URL}/settings/${id}`, settings, config)
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
  createNewRange(dateWithInterval, token) {
    const config = {
      headers: {
        authorization: token,
      },
    };
    return axios.post(`${API_URL}/ratings/range`, dateWithInterval, config)
      .then(response => response.data);
  },
  createNewDaily(date, token) {
    const config = {
      headers: {
        authorization: token,
      },
    };
    return axios.post(`${API_URL}/ratings/count`, date, config)
      .then(response => response.data);
  },
  createNewReport(date, token) {
    const config = {
      headers: {
        authorization: token,
      },
    };
    return axios.post(`${API_URL}/ratings/report`, date, config)
      .then(response => response.data);
  },
  createReportForDays(date, token) {
    const config = {
      headers: {
        authorization: token,
      },
    };
    return axios.post(`${API_URL}/ratings/days`, date, config)
      .then(response => response.data);
  },
  newUser(token) {
    const config = {
      headers: {
        authorization: token,
      },
    };
    const body = {};
    return axios.post(`${API_URL}/users/login`, body, config)
      .then(response => response.data);
  },
  inviteUser(user, token) {
    const config = {
      headers: {
        authorization: token,
      },
    };
    return axios.post(`${API_URL}/invites`, user, config)
      .then(response => response.data);
  },
  authUser(idToken) {
    return axios.post(`${API_URL}/users/auth`, idToken)
      .then(response => response.data);
  },
};
