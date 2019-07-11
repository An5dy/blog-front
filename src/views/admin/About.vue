<template>
  <el-form :model="about">
    <el-form-item>
      <mavon-editor ref="md" v-model="about.main" :toolbars="toolbars" />
    </el-form-item>
    <el-form-item>
      <el-button
        @click="handleUpdateOrCreate"
        size="small"
        type="primary"
        :loading="loading"
        >确认发布</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import mavonEditorConfig from "@/assets/config/mavonEditor";
import store from "@/store";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("about");
import { Message } from "element-ui";

export default {
  name: "About",
  components: {
    mavonEditor
  },
  data() {
    return {
      toolbars: mavonEditorConfig.toolbars,
      loading: false
    };
  },
  async beforeRouteEnter(to, from, next) {
    try {
      await store.dispatch("about/getAbout");
      next();
    } catch (error) {
      Message.error(error.response.data.message);
    }
  },
  methods: {
    ...mapActions(["updateOrCreateAbout"]),
    async handleUpdateOrCreate() {
      if (this.loading) return;
      this.loading = true;
      try {
        await this.updateOrCreateAbout(this.about);
        this.loading = false;
        this.$message.success("发布成功");
      } catch (error) {
        this.loading = false;
        this.$message.error(error.response.data.message);
      }
    }
  },
  computed: {
    ...mapState({
      about: state => state.about
    })
  }
};
</script>

<style lang="scss" scoped></style>
