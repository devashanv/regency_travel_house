import axios from 'axios';

const API = axios.create({
  baseURL: "https://portal.knowmo.me/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default API;
