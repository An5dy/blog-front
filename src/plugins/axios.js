import axios from "axios";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";
import Token from "@/utils/token";

Nprogress.configure({
  showSpinner: false
});

const service = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest"
  }
});

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["Authorization"] = "Bearer " + Token.get();
    }
    Nprogress.start();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    Nprogress.done();
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export default {
  get(url, params) {
    return new Promise((resolve, reject) => {
      service({
        url: url,
        method: "get",
        params
      })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      service({
        url: url,
        method: "post",
        data
      })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  put(url, data) {
    return new Promise((resolve, reject) => {
      data["_method"] = "PUT";
      service({
        url: url,
        method: "post",
        data
      })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  delete(url, data = {}) {
    return new Promise((resolve, reject) => {
      data["_method"] = "DELETE";
      service({
        url: url,
        method: "post",
        data
      })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
