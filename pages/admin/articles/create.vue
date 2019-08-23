<template>
  <el-form
    ref="article"
    :rules="rules"
    :model="article"
    label-width="50px"
    size="normal"
  >
    <el-form-item label="标题" prop="title" :error="errors.title">
      <el-input v-model="article.title" />
    </el-form-item>
    <el-form-item label="分类" prop="category_id" :error="errors.category_id">
      <el-select
        v-model="article.category_id"
        style="width: 100%;"
        placeholder="请选择分类"
        clearable
      >
        <el-option
          v-for="category in categories"
          :key="category.id"
          :label="category.title"
          :value="category.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="正文" prop="main" :error="errors.main">
      <markdown-edit ref="md" :main.sync="article.main"></markdown-edit>
    </el-form-item>
    <el-form-item>
      <el-button
        style="width: 100%; margin-top: 20px;"
        type="primary"
        @click="handleCreate"
        >确认发布
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { generateTree } from '@/utils/tools'
import MarkdownEdit from '@/components/MarkdownEdit'
import ValidateError from '@/mixins/validate-error'

export default {
  layout: 'admin',
  components: {
    MarkdownEdit
  },
  mixins: [ValidateError],
  data() {
    return {
      article: {
        category_id: null,
        main: '',
        title: ''
      },
      rules: {
        category_id: [
          {
            required: true,
            message: '分类 不能为空。',
            trigger: 'blur'
          },
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
            max: 100,
            message: '标题 不能大于 100 个字符串。',
            trigger: 'blur'
          },
          {
            type: 'string',
            message: '标题 必须是字符串。',
            trigger: 'blur'
          }
        ],
        main: [
          {
            required: true,
            message: '正文 不能为空。',
            trigger: 'blur'
          },
          {
            type: 'string',
            message: '正文 必须是字符串。',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    categories() {
      return generateTree(this.$store.state.category.list)
    }
  },
  async asyncData({ store }) {
    await store.dispatch('category/fetchCategories')
  },
  methods: {
    async handleCreate() {
      const valid = await this.$refs.article.validate()
      if (valid) {
        try {
          await this.$store.dispatch('article/handleStore', this.article)
          this.$router.push('/admin/articles')
        } catch (error) {
          const data = error.response.data
          this._setErrors(data)
        }
      }
    }
  }
}
</script>
