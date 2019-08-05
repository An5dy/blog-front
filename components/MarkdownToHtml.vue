<template>
  <section class="post-body">
    <div v-html="markedHtml" />
  </section>
</template>

<script>
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/github-gist.css'

export default {
  name: 'MarkdownToHtml',
  props: {
    markdown: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      markedHtml: ''
    }
  },
  created() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: (code, lang) => {
        if (lang && highlight.getLanguage(lang)) {
          return highlight.highlight(lang, code, true).value
        } else {
          return highlight.highlightAuto(code).value
        }
      }
    })
    this.markedHtml = marked(this.markdown)
  }
}
</script>

<style lang="scss" scoped>
.post-body {
  line-height: 1.7;
  ul,
  li,
  ol,
  p,
  pre {
    margin-bottom: 20px;
  }
}
</style>
