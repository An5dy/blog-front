import axios from "@/plugins/axios";

const store = iamge => {
  return axios.post("admin/images", iamge, {
    "Content-Type": "multipart/form-data"
  });
};

const destroy = data => {
  return axios.delete("admin/images", data);
};

export default {
  store,
  destroy
};
