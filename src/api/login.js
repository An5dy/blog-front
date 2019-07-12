import axios from "@/plugins/axios";

const login = data => {
  return axios.post("admin/login", data);
};

const logout = () => {
  return axios.post("admin/logout");
};

const password = data => {
  return axios.post("admin/password", data);
};

export default {
  login,
  logout,
  password
};
