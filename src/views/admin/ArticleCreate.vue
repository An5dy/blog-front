<template>
  <el-form>
    <el-form-item label="标题">
      <el-input v-model="form.title" size="small" style="width: 450px" />
    </el-form-item>
    <el-form-item label="分类">
      <el-select
        v-model="form.category_id"
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
      <mavon-editor :toolbars="toolbars" v-model="form.main"></mavon-editor>
    </el-form-item>
    <el-form-item>
      <el-button
        style="float:right;"
        size="medium"
        type="primary"
        :loading="loading"
        @click="handleCreate"
        v-if="form.id === null"
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
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import mavonEditorConfig from "@/assets/config/mavonEditor";
import store from "@/store";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("article");
import { Message } from "element-ui";

export default {
  name: "ArticleCreate",
  components: {
    mavonEditor
  },
  data() {
    return {
      toolbars: mavonEditorConfig.toolbars,
      loading: false,
      form: {
        id: null,
        category_id: null,
        main: "",
        title: ""
      }
    };
  },
  async beforeRouteEnter(to, from, next) {
    const id = to.params.id;
    let request = [store.dispatch("category/getCategories")];
    if (id) {
      request.push(store.dispatch("article/getArticle", id));
    }
    await Promise.all(request)
      .then(response => {
        next(vm => {
          if (id) {
            vm._setForm(response[1].data);
          }
        });
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
        await this.storeArticle(this.form);
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
      const payload = {
        id: this.$route.params.id,
        data: this.form
      };
      try {
        await this.updateArticle(payload);
        this.loading = false;
        this.$router.push("/admin/articles");
      } catch (error) {
        this.loading = false;
        this.$message.error(error.response.data.message);
      }
    },
    _setForm(article) {
      this.form = {
        id: article.id,
        category_id: article.category.id,
        main: article.main,
        title: article.title
      };
    }
  },
  watch: {
    $route() {
      this.form = {
        id: null,
        category_id: null,
        main: "",
        title: ""
      };
    }
  },
  computed: {
    categories() {
      return this.$store.state.category.list;
    }
  }
};
</script>

<style lang="scss" scoped></style>
