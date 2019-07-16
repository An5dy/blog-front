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
      <markdown-edit ref="md" :main.sync="article.main"></markdown-edit>
    </el-form-item>
    <el-form-item>
      <el-button
        style="float:right;"
        size="medium"
        type="primary"
        :loading="loading"
        @click="handleCreate"
        v-if="article.id === null"
        >确认发布</el-button
      >
      <el-button
        style="float:right;"
        size="medium"
        type="primary"
        :loading="loading"
        @click="handleEdit"
        v-else
        >确认编辑</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import store from "@/store";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("article");
import { Message } from "element-ui";
import MarkdownEdit from "@/components/MarkdownEdit";

export default {
  name: "ArticleCreate",
  components: {
    MarkdownEdit
  },
  data() {
    return {
      loading: false
    };
  },
  async beforeRouteEnter(to, from, next) {
    const id = to.params.id;
    let request = [store.dispatch("category/getCategories")];
    if (id) {
      request.push(store.dispatch("article/getArticle", id));
    }
    await Promise.all(request)
      .then(() => {
        next();
      })
      .catch(error => {
        Message.error(error.response.data.message);
      });
  },
  methods: {
    ...mapActions(["storeArticle", "updateArticle"]),
    async handleCreate() {
      if (this.loading) return;
      this.loading = true;
      try {
        await this.storeArticle(this.article);
        this.loading = false;
        this.$router.push("/admin/articles");
      } catch (error) {
        this.loading = false;
        this.$message.error(error.response.data.message);
      }
    },
    async handleEdit() {
      if (this.loading) return;
      this.loading = true;
      const { title, category_id, main } = this.article;
      const payload = {
        id: this.$route.params.id,
        data: {
          title: title,
          category_id: category_id,
          main: main
        }
      };
      try {
        await this.updateArticle(payload);
        this.loading = false;
        this.$router.push("/admin/articles");
      } catch (error) {
        this.loading = false;
        this.$message.error(error.response.data.message);
      }
    }
  },
  watch: {
    $route(to) {
      if (to.name === "article-create") {
        this.$store.dispatch("article/initArticle");
      }
      this.$refs.md.content = this.article.main;
    }
  },
  computed: {
    categories() {
      return this.$store.state.category.list;
    },
    article() {
      return this.$store.state.article.article;
    }
  }
};
</script>
