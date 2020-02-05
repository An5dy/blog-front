<template>
  <div class="category-container">
    <div class="menus-bar">
      <el-button
        @click="handleCreate"
        type="success"
        icon="el-icon-edit"
        size="small"
      >
        新增
      </el-button>
    </div>
    <el-table
      :data="list"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      row-key="id"
      stripe
      default-expand-all
    >
      <el-table-column prop="id" align="left" label="序号" width="150" />
      <el-table-column prop="title" align="center" label="标题" />
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="primary" size="mini">
            编辑
          </el-button>
          <el-button @click="handleDelete(scope.row)" type="danger" size="mini">
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
        ref="category"
        :model="category"
        :rules="rules"
        size="small"
        label-position="top"
      >
        <el-form-item
          :error="errors.category_id"
          label="父级分类"
          prop="category_id"
        >
          <el-select
            v-model="category.category_id"
            :disabled="dialogStatus !== 'create'"
            clearable
            style="width: 100%;"
            placeholder="请选择父级分类"
          >
            <el-option
              v-for="item in items"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item :error.sync="errors.title" label="标题" prop="title">
          <el-input v-model="category.title" clearable auto-complete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">
          取 消
        </el-button>
        <el-button
          v-if="dialogStatus === 'create'"
          @click="handleStore"
          type="primary"
          >确 定</el-button
        >
        <el-button v-else @click="handleUpdate" type="primary">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { generateTree } from '@/utils/tools'
import ValidateError from '@/mixins/validate-error'

export default {
  layout: 'admin',
  mixins: [ValidateError],
  data() {
    return {
      dialogTitle: {
        create: '新增分类',
        edit: '修改分类'
      },
      dialogStatus: 'create',
      dialogFormVisible: false,
      category: { id: null, title: null, category_id: null },
      defaultProps: { label: 'title' },
      rules: {
        category_id: [
          {
            type: 'integer',
            message: '分类 必须是整数。',
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: '标题 不能为空。',
            trigger: 'blur'
          },
          {
            max: 20,
            message: '标题 不能大于 20 个字符串。',
            trigger: 'blur'
          },
          {
            type: 'string',
            message: '标题 必须是字符串。',
            trigger: 'blur'
          }
        ]
      }
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
      this.$nextTick(() => {
        this.$refs.category.clearValidate()
      })
    },
    async handleStore() {
      const valid = await this.$refs.category.validate()
      if (valid) {
        this._resetErros()
        try {
          await this.$store.dispatch('category/handleStore', {
            title: this.category.title,
            category_id: this.category.category_id
          })
          await this.$store.dispatch('category/fetchCategories')
          this.dialogFormVisible = false
        } catch (error) {
          const data = error.response.data
          this._setErrors(data)
        }
      }
    },
    handleEdit(row) {
      this.category = {
        id: row.id,
        title: row.title,
        category_id: row.parent_id
      }
      this.dialogStatus = 'edit'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.category.clearValidate()
      })
    },
    async handleUpdate() {
      const valid = await this.$refs.category.validate()
      if (valid) {
        this._resetErros()
        try {
          await this.$store.dispatch('category/handleUpdate', {
            id: this.category.id,
            data: {
              title: this.category.title,
              category_id: this.category.category_id
            }
          })
          await this.$store.dispatch('category/fetchCategories')
          this.dialogFormVisible = false
        } catch (error) {
          const data = error.response.data
          this._setErrors(data)
        }
      }
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
