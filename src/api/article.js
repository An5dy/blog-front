import axios from "@/plugins/axios";

const index = params => {
  return axios.get("admin/articles", params);
};

const frontIndex = params => {
  return axios.get("articles", params);
};

const store = data => {
  return axios.post("admin/articles", data);
};

const show = id => {
  return axios.get(`admin/articles/${id}`);
};

const frontShow = id => {
  return axios.get(`articles/${id}`);
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

const articles = (category, params) => {
  return axios.get(`categories/${category}/articles`, params);
};

export default {
  index,
  frontIndex,
  store,
  show,
  frontShow,
  update,
  destroy,
  upper,
  lower,
  articles
};
