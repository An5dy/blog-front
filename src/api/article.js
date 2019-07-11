import axios from "@/plugins/axios";

const index = params => {
  return axios.get("admin/articles", params);
};

const store = data => {
  return axios.post("admin/articles", data);
};

const show = id => {
  return axios.get(`admin/articles/${id}`);
};

const update = (data, id) => {
  return axios.put(`admin/articles/${id}`, data);
};

const destroy = id => {
  return axios.delete(`admin/articles/${id}`);
};

const upper = id => {
  return axios.put(`admin/articles/${id}/upper`);
};

const lower = id => {
  return axios.put(`admin/articles/${id}/lower`);
};

export default {
  index,
  store,
  show,
  update,
  destroy,
  upper,
  lower
};
