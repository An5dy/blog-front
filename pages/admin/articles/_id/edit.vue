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
    <el-form-item label="分类" prop="category.id" :error="errors.category_id">
      <el-select
        v-model="article.category.id"
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
        size="medium"
        type="primary"
        @click="handleEdit"
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
    },
    article() {
      return this.$store.state.article.article
    }
  },
  async asyncData({ store, params }) {
    await Promise.all([
      store.dispatch(
        'article/fetchArticle',
        `/api/admin/articles/${params.id}`
      ),
      store.dispatch('category/fetchCategories')
    ])
  },
  methods: {
    async handleEdit() {
      const valid = await this.$refs.article.validate()
      if (valid) {
        try {
          await this.$store.dispatch('article/handleUpdate', this.article)
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
