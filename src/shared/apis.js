import axios from "axios";

import { getCookieToken } from "./Cookie";

const baseURL = process.env.REACT_APP_SERVER_URL;

const myToken = getCookieToken();

export const api = axios.create({
  baseURL,
});

const instance = axios.create({
  baseURL,
  headers: {
    Authorization: myToken,
    "Cache-Control": "no-cache",
  },
});

export const postApi = axios.create({
  baseURL,
  headers: {
    Authorization: myToken,
    "Content-Type": "multipart/form-data",
    "Cache-Control": "no-cache",
  },
});

export default instance;
