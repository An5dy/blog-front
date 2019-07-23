import axios from "@/plugins/axios";

const index = params => {
  return axios.get("search", params);
};

export default {
  index
};
