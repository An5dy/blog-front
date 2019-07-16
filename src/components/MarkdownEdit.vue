<template>
  <div>
    <mavon-editor
      ref="md"
      v-model="content"
      :toolbars="toolbars"
      @imgAdd="handleUpload"
      @imgDel="handleDelete"
    />
  </div>
</template>

<script>
import "mavon-editor/dist/css/index.css";
import { mavonEditor } from "mavon-editor";
import mavonEditorConfig from "@/assets/config/mavonEditor";
import ImageAPI from "@/api/image";

export default {
  name: "MarkdownEdit",
  components: {
    mavonEditor
  },
  data() {
    return {
      toolbars: mavonEditorConfig.toolbars,
      content: this.main
    };
  },
  props: {
    main: {
      required: true,
      type: String
    }
  },
  watch: {
    content(newValue) {
      this.$emit("update:main", newValue);
    }
  },
  methods: {
    async handleUpload(filename, imgFile) {
      let formData = new FormData();
      formData.append("image", imgFile);
      try {
        const response = await ImageAPI.store(formData);
        this.$refs.md.$img2Url(filename, response.data.path);
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },
    async handleDelete(filename) {
      let data = {
        img_path: filename[0]
      };
      try {
        await ImageAPI.destroy(data);
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    }
  }
};
</script>
