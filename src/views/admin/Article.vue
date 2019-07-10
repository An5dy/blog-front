<template>
  <div class="artcile-container">
    <el-table v-loading="loading" :data="list" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" align="center" width="100" />
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
            @close="handleTagClose(index, scope.row.tags)"
            type="primary"
            >{{ tag.title }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="title" align="center" label="标题" width="200" />
      <el-table-column
        prop="created_at"
        align="center"
        width="200"
        label="发布时间"
      />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
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
      Message.info(e.response.data.message);
    }
  },
  methods: {
    ...mapActions(["getArticles"]),
    async handleCurrentChange(page) {
      if (this.loading) return;
      this.loading = true;
      try {
        await this.getArticles({ page: page });
        this.loading = false;
      } catch (error) {
        this.loading = false;
        Message.info(error.response.data.message);
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
          this.$store.dispatch("article/deleteArticle", row.id).then(() => {
            this.getArticles({ page: this.meta.current_page });
            this.$message.success("删除成功");
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
