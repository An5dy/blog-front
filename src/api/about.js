import axios from "@/plugins/axios";

const index = () => {
  return axios.get("admin/about");
};

const frontIndex = () => {
  return axios.get("about");
};

const updateOrCreate = data => {
  return axios.post("admin/about", data);
};

export default {
  index,
  frontIndex,
  updateOrCreate
};
