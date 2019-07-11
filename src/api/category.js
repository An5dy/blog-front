import axios from "@/plugins/axios";

const index = () => {
  return axios.get("admin/categories");
};

const store = data => {
  return axios.post("admin/categories", data);
};

const update = (data, id) => {
  return axios.put(`admin/categories/${id}`, data);
};

const destroy = id => {
  return axios.delete(`admin/categories/${id}`);
};

export default {
  index,
  store,
  update,
  destroy
};
