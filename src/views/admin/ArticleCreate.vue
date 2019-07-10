<template>
  <el-form>
    <el-form-item label="标题">
      <el-input v-model="article.title" size="small" style="width: 450px" />
    </el-form-item>
    <el-form-item label="分类">
      <el-select
        v-model="article.category_id"
        size="small"
        placeholder="请选择分类"
      >
        <el-option
          v-for="category in categories"
          :label="category.title"
          :value="category.id"
          :key="category.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="正文">
      <mavon-editor :toolbars="toolbars" v-model="article.main"></mavon-editor>
    </el-form-item>
    <el-form-item>
      <el-button
        style="float:right;"
        size="medium"
        type="primary"
        :loading="loading"
        @click="handleAdd"
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
const { mapState, mapActions } = createNamespacedHelpers("article");
import { Message } from "element-ui";

export default {
  name: "ArticleCreate",
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
    const id = to.params.id;
    let request = [store.dispatch("article/getCategories")];
    if (id) {
      request.push(store.dispatch("article/getArticle", id));
    }
    await Promise.all([request])
      .then(() => {
        next();
      })
      .catch(error => {
        Message.info(error.response.data.message);
      });
  },
  watch: {
    $route() {
      this.$store.dispatch("article/clearArtilce");
    }
  },
  methods: {
    ...mapActions(["storeArticle"]),
    async handleAdd() {
      if (this.loading) return;
      this.loading = true;
      try {
        await this.storeArticle(this.article);
        this.loading = false;
        this.$router.push("/admin/articles");
      } catch (error) {
        this.loading = false;
        Message.info(error.response.data.message);
      }
    }
  },
  computed: {
    ...mapState({
      categories: state => state.categories,
      article: state => state.article
    })
  }
};
</script>

<style lang="scss" scoped></style>
