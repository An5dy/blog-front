<template>
  <div class="artcile-container">
    <el-table v-loading="loading" :data="list" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" align="center" />
      <el-table-column prop="title" align="center" label="标题" width="200" />
      <el-table-column
        prop="category.title"
        label="分类"
        align="center"
        width="100"
      />
      <el-table-column label="标签" prop="tags" align="center" width="300">
        <template slot-scope="scope">
          <el-tag
            v-for="(tag, index) in scope.row.tags"
            :key="index"
            closable
            size="mini"
            style="margin-right: 5px"
            @close="handleTagClose(tag, scope.row.tags)"
            type="primary"
            >{{ tag.title }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="skims" align="center" label="浏览量" />
      <el-table-column prop="likes" align="center" label="点赞量" />
      <el-table-column prop="comments" align="center" label="评论量" />
      <el-table-column
        prop="created_at"
        align="center"
        width="200"
        label="发布时间"
      />
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button
            v-show="scope.row.is_published === 0"
            type="text"
            size="medium"
            icon="el-icon-top"
            @click="handleUpper(scope.row)"
          />
          <el-button
            v-show="scope.row.is_published === 1"
            type="text"
            size="medium"
            icon="el-icon-bottom"
            @click="handleLower(scope.row)"
          />
          <el-button
            type="text"
            size="medium"
            icon="el-icon-edit-outline"
            @click="handleEdit(scope.row)"
          />
          <el-button
            type="text"
            size="medium"
            icon="el-icon-delete"
            style="color: #f56c6c;"
            @click="handleDelete(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page.sync="meta.current_page"
        :page-size="meta.per_page"
        :total="meta.total"
      />
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("article");
import { Message } from "element-ui";

export default {
  name: "Article",
  data() {
    return {
      loading: false
    };
  },
  async beforeRouteEnter(to, from, next) {
    try {
      await store.dispatch("article/getArticles");
      next();
    } catch (e) {
      Message.error(e.response.data.message);
    }
  },
  methods: {
    ...mapActions([
      "getArticles",
      "deleteArticle",
      "upperArticle",
      "lowerArticle"
    ]),
    async handleCurrentChange(page) {
      if (this.loading) return;
      this.loading = true;
      try {
        await this.getArticles({ page: page });
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$message.error(error.response.data.message);
      }
    },
    handleEdit(row) {
      this.$router.push({
        name: "article-edit",
        params: {
          id: row.id
        }
      });
    },
    handleDelete(row) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteArticle(row.id).then(() => {
            this.getArticles({ page: this.meta.current_page });
            this.$message.success("删除成功");
          });
        })
        .catch(() => {});
    },
    handleTagClose(tag, tags) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("tag/deleteCategory", tag.id).then(() => {
            tags.forEach((item, index, array) => {
              if (item.id === tag.id) {
                array.splice(index, 1);
              }
            });
            this.$message.success("删除成功");
          });
        })
        .catch(() => {});
    },
    handleUpper(row) {
      this.$confirm("是否上架?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.upperArticle(row.id).then(() => {
            row.is_published = 1;
            this.$message.success("发布成功");
          });
        })
        .catch(() => {});
    },
    handleLower(row) {
      this.$confirm("是否下架?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.lowerArticle(row.id).then(() => {
            row.is_published = 0;
            this.$message.success("撤回成功");
          });
        })
        .catch(() => {});
    }
  },
  computed: {
    ...mapState({
      list: state => state.list,
      meta: state => state.meta
    })
  }
};
</script>

<style lang="scss" scoped>
.artcile-container {
  .pagination {
    padding-top: 40px;
    width: 100%;
    margin: 0 auto;
    .el-pagination {
      text-align: right;
      padding-right: 0px;
    }
  }
}
</style>
