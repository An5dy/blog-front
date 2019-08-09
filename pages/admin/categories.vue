<template>
  <div class="category-container">
    <div class="menus-bar">
      <el-button
        type="success"
        icon="el-icon-edit"
        size="small"
        @click="handleCreate"
      >
        新增
      </el-button>
    </div>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="id" align="center" label="序号" />
      <el-table-column prop="title" align="center" label="标题" width="180" />
      <el-table-column prop="updated_at" align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">
            删除
          </el-button>
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
        <el-button size="small" @click="dialogFormVisible = false"
          >取 消</el-button
        >
        <el-button
          v-if="dialogStatus === 'create'"
          type="primary"
          size="mini"
          @click="handleStore"
          >确 定</el-button
        >
        <el-button v-else type="primary" size="mini" @click="handleUpdate"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      dialogTitle: {
        create: '新增分类',
        edit: '修改分类'
      },
      dialogStatus: 'create',
      dialogFormVisible: false,
      category: { id: null, title: null }
    }
  },
  computed: {
    list() {
      return this.$store.state.category.list
    }
  },
  async asyncData({ store }) {
    await store.dispatch('category/fetchCategories')
  },
  methods: {
    handleCreate() {
      this.category = { id: null, title: null }
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
      this.$nextTick(() => {})
    },
    async handleStore() {
      await this.$store.dispatch('category/handleStore', {
        title: this.category.title
      })
      this.dialogFormVisible = false
    },
    handleEdit(row) {
      this.category = {
        id: row.id,
        title: row.title
      }
      this.dialogStatus = 'edit'
      this.dialogFormVisible = true
    },
    async handleUpdate() {
      await this.$store.dispatch('category/handleUpdate', {
        id: this.category.id,
        data: { title: this.category.title }
      })
      this.dialogFormVisible = false
    },
    handleDelete(row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('category/handleDelete', row)
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.category-container {
  .menus-bar {
    text-align: right;
    margin-bottom: 20px;
  }
}
</style>
