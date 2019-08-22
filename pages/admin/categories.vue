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
    <el-table
      :data="list"
      row-key="id"
      stripe
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" align="left" label="序号" width="150" />
      <el-table-column prop="title" align="center" label="标题" />
      <el-table-column align="center" label="操作" width="150">
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
      <el-form :model="category" label-position="top" label-width="50px">
        <el-form-item label="父级分类" size="small">
          <el-select
            v-model="category.category_id"
            style="width: 100%;"
            placeholder="请选择父级分类"
            :disabled="dialogStatus !== 'create'"
          >
            <el-option
              v-for="item in items"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="名称" size="small">
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
import { generateTree } from '@/utils/tools'

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
      category: { id: null, title: null, category_id: null },
      defaultProps: { label: 'title' }
    }
  },
  computed: {
    list() {
      return this.$store.state.category.list
    },
    items() {
      return generateTree(this.$store.state.category.list)
    }
  },
  async asyncData({ store }) {
    await store.dispatch('category/fetchCategories')
  },
  methods: {
    handleCreate() {
      this.category = { id: null, title: null, category_id: null }
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
      this.$nextTick(() => {})
    },
    async handleStore() {
      await this.$store.dispatch('category/handleStore', {
        title: this.category.title,
        category_id: this.category.category_id
      })
      await this.$store.dispatch('category/fetchCategories')
      this.dialogFormVisible = false
    },
    handleEdit(row) {
      this.category = {
        id: row.id,
        title: row.title,
        category_id: row.parent_id
      }
      this.dialogStatus = 'edit'
      this.dialogFormVisible = true
    },
    async handleUpdate() {
      await this.$store.dispatch('category/handleUpdate', {
        id: this.category.id,
        data: {
          title: this.category.title,
          category_id: this.category.category_id
        }
      })
      await this.$store.dispatch('category/fetchCategories')
      this.dialogFormVisible = false
    },
    handleDelete(row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('category/handleDelete', row).then(() => {
            this.$store.dispatch('category/fetchCategories')
          })
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
