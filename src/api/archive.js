import axios from "@/plugins/axios";

const index = () => {
  return axios.get("archives");
};

export default {
  index
};
