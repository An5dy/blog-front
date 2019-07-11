import axios from "@/plugins/axios";

const index = () => {
  return axios.get("admin/about");
};

const updateOrCreate = data => {
  return axios.post("admin/about", data);
};

export default {
  index,
  updateOrCreate
};
