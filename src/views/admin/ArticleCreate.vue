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
      article: {
        category_id: null,
        title: null,
        main: ""
      }
    };
  },
  async beforeRouteEnter(to, from, next) {
    try {
      await store.dispatch("article/getCategories");
      next();
    } catch (e) {
      Message.info(e.response.data.message);
    }
  },
  methods: {
    ...mapActions(["storeArticle"]),
    async handleAdd() {
      const response = await this.storeArticle(this.article);
      if (response) {
        this.$router.push("/admin/articles");
      }
    }
  },
  computed: {
    ...mapState({
      categories: state => state.categories,
      loading: state => state.loading
    })
  }
};
</script>

<style lang="scss" scoped></style>
