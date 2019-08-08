<template>
  <div>
    <mavon-editor
      ref="md"
      v-model="content"
      :toolbars="toolbars"
      @imgAdd="handleUpload"
      @imgDel="handleDelete"
    />
  </div>
</template>

<script>
import config from '@/assets/config/mavon-editor'

export default {
  name: 'MarkdownEdit',
  props: {
    main: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      toolbars: config.toolbars,
      content: this.main
    }
  },
  watch: {
    content(newValue) {
      this.$emit('update:main', newValue)
    }
  },
  methods: {
    async handleUpload(filename, imgFile) {
      const formData = new FormData()
      formData.append('image', imgFile)
      try {
        this.$axios.setHeader('Content-Type', 'multipart/form-data', ['post'])
        const response = await this.$axios.post('/api/admin/images', formData)
        this.$refs.md.$img2Url(filename, response.data.path)
      } catch (error) {}
    },
    async handleDelete(filename) {
      const data = {
        img_path: filename[0],
        _method: 'DELETE'
      }
      try {
        await this.$axios.post('/api/admin/images', data)
      } catch (error) {}
    }
  }
}
</script>
