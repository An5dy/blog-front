import axios from "@/plugins/axios";

const index = () => {
  return axios.get("categories");
};

const store = data => {
  return axios.post("categories", data);
};

const update = (data, id) => {
  return axios.put(`categories/${id}`, data);
};

const destroy = id => {
  return axios.delete(`categories/${id}`);
};

export default {
  index,
  store,
  update,
  destroy
};
