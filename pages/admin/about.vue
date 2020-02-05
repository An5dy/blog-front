<template>
  <el-form :model="about">
    <el-form-item>
      <markdown-edit :main.sync="about.main"></markdown-edit>
    </el-form-item>
    <el-form-item>
      <el-button
        @click="handleUpdateOrCreate"
        style="width: 100%; margin-top: 20px;"
        size="medium"
        type="primary"
      >
        确认发布
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
  computed: {
    about() {
      return this.$store.state.about.about
    }
  },
  async asyncData({ store }) {
    await store.dispatch('about/fetchAdminAbout')
  },
  methods: {
    async handleUpdateOrCreate() {
      try {
        await this.$store.dispatch('about/handleUpdate', this.about)
      } catch (error) {}
    }
  }
}
</script>
