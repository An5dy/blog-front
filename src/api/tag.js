import axios from "@/plugins/axios";

const destroy = id => {
  return axios.delete(`tags/${id}`);
};

export default {
  destroy
};
