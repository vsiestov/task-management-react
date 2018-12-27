import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_REMOTE_URL
});

export const updateHeader = (token) => {
  api.defaults.headers['x-access-token'] = token;
};

export const getRequest = (url, params, headers = {}) => {
  return api.get(`${url}`, {
    params,
    headers
  });
};

export const postRequest = (url, data) => {
  return api.post(`${url}`, data);
};

export const putRequest = (url, data) => {
  return api.put(`${url}`, data);
};

export const deleteRequest = (url) => {
  return api.delete(`${url}`);
};
