import axios from "@/plugins/axios";

const login = data => {
  return axios.post("admin/login", data);
};

export default {
  login
};
