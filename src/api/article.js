import axios from "@/plugins/axios";

const index = params => {
  return axios.get("articles", params);
};

const store = data => {
  return axios.post("articles", data);
};

const show = id => {
  return axios.get(`articles/${id}`);
};

const categories = () => {
  return axios.get("categories");
};

export default {
  index,
  store,
  categories,
  show
};
