import axios from "@/plugins/axios";

const index = params => {
  return axios.get("articles", params);
};

const store = data => {
  return axios.post("articles", data);
};

const categories = () => {
  return axios.get("categories");
};

export default {
  index,
  store,
  categories
};
