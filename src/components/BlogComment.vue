<template>
  <div class="comment">
    <vue-disqus :shortname="shortname" :title="title" />
  </div>
</template>

<script>
export default {
  name: "BlogComment",
  data() {
    return {
      shortname: ""
    };
  },
  props: {
    title: {
      type: String,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
.comment {
  max-width: 700px;
  padding: 40px 40px 20px 40px;
  margin: auto;
}
</style>
