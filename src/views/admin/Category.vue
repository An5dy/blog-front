<template>
  <div class="category-container">
    <div class="menus-bar">
      <el-button
        type="primary"
        icon="el-icon-edit"
        size="mini"
        @click="handleCreate"
      />
    </div>
    <el-table v-loading="loading" :data="list" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="100" />
      <el-table-column prop="title" align="center" label="标题" width="180" />
      <el-table-column prop="updated_at" align="center" label="操作">
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

    <!-- 新增或修改 dialog -->
    <el-dialog
      :title="dialogTitle[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form
        :model="category"
        label-position="top"
        label-width="50px"
        style="width: 400px; margin-left: 20px;"
      >
        <el-form-item label="名称" size="medium">
          <el-input v-model="category.title" auto-complete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false" size="small"
          >取 消</el-button
        >
        <el-button
          v-if="dialogStatus === 'create'"
          type="primary"
          @click="handleStore"
          size="mini"
          >确 定</el-button
        >
        <el-button v-else type="primary" @click="handleUpdate" size="mini"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from "@/store";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("category");
import { Message } from "element-ui";

const category = {
  id: null,
  title: null
};

export default {
  name: "Category",
  data() {
    return {
      loading: false,
      dialogTitle: {
        create: "新增分类",
        edit: "修改分类"
      },
      dialogStatus: "create",
      dialogFormVisible: false,
      category: category
    };
  },
  async beforeRouteEnter(to, from, next) {
    try {
      await store.dispatch("category/getCategories");
      next();
    } catch (error) {
      Message.error(error.response.data.message);
    }
  },
  methods: {
    ...mapActions([
      "getCategories",
      "storeCategory",
      "updateCategory",
      "deleteCategory"
    ]),
    handleCreate() {
      this.category = category;
      this.dialogFormVisible = true;
      this.dialogStatus = "create";
      this.$nextTick(() => {});
    },
    async handleStore() {
      if (this.loading) return;
      this.loading = true;
      try {
        await this.storeCategory({ title: this.category.title });
        await this.getCategories();
        this.loading = false;
        this.dialogFormVisible = false;
      } catch (error) {
        this.loading = false;
        Message.info(error.response.data.message);
      }
    },
    handleEdit(row) {
      const { id, title } = row;
      this.category = {
        id: id,
        title: title
      };
      this.dialogStatus = "edit";
      this.dialogFormVisible = true;
    },
    async handleUpdate() {
      if (this.loading) return;
      this.loading = true;
      const { id, title } = this.category;
      try {
        await this.updateCategory({ id: id, data: { title: title } });
        await this.getCategories();
        this.loading = false;
        this.dialogFormVisible = false;
      } catch (error) {
        this.loading = false;
        this.$message.error(error.response.data.message);
      }
    },
    async handleDelete(row) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteCategory(row.id).then(() => {
            this.getCategories();
            this.$message.success("删除成功");
          });
        })
        .catch(() => {});
    }
  },
  computed: {
    ...mapState({
      list: state => state.list
    })
  }
};
</script>

<style lang="scss" scoped>
.category-container {
  .menus-bar {
    text-align: right;
    margin-bottom: 20px;
  }
}
</style>
