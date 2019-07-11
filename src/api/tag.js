import axios from "@/plugins/axios";

const destroy = id => {
  return axios.delete(`admin/tags/${id}`);
};

export default {
  destroy
};
