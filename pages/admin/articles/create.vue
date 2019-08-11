<template>
  <el-form label-width="50px" size="small">
    <el-form-item label="标题">
      <el-input v-model="article.title" />
    </el-form-item>
    <el-form-item label="分类">
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
    <el-form-item label="正文">
      <markdown-edit ref="md" :main.sync="article.main"></markdown-edit>
    </el-form-item>
    <el-form-item>
      <el-button
        style="width: 100%; margin-top: 20px;"
        size="medium"
        type="primary"
        @click="handleCreate"
        >确认发布
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import MarkdownEdit from '@/components/MarkdownEdit'

export default {
  layout: 'admin',
  components: {
    MarkdownEdit
  },
  data() {
    return {
      article: {
        id: null,
        category_id: null,
        main: '',
        title: ''
      }
    }
  },
  computed: {
    categories() {
      return this.$store.state.category.list
    }
  },
  async asyncData({ store }) {
    await store.dispatch('category/fetchCategories')
  },
  methods: {
    async handleCreate() {
      try {
        await this.$store.dispatch('article/handleStore', this.article)
        this.$router.push('/admin/articles')
      } catch (error) {}
    }
  }
}
</script>
