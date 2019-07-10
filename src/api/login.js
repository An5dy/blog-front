import axios from "@/plugins/axios";

const login = data => {
  return axios.post("login", data);
};

export default {
  login
};
