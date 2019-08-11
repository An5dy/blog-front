<template>
  <div class="comment">
    <vue-disqus :shortname="shortname" :title="title" />
  </div>
</template>

<script>
export default {
  name: 'BlogComment',
  props: {
    title: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      shortname: process.env.DISAUS_SHORT_NAME
    }
  }
}
</script>

<style lang="scss" scoped>
.comment {
  max-width: 700px;
  padding: 40px 40px 20px 40px;
  margin: auto;
}
</style>
