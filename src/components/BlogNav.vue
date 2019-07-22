<template>
  <nav class="main-nav">
    <router-link to="/">Home</router-link>
    <router-link to="/archives">Archives</router-link>
    <a href="#">Search</a>
  </nav>
</template>

<script>
export default {
  name: "BlogNav"
};
</script>

<style lang="scss" scoped>
.main-nav {
  padding: 20px 20px 0;
  background: rgba(255, 255, 255, 0.9);
  margin: 0 auto;
  text-align: right;
  z-index: 100;

  a {
    top: 8px;
    right: 6px;
    padding: 8px 12px;
    color: #5badf0;
    font-size: 13px;
    line-height: 1.35;
    border-radius: 3px;
  }
}
</style>
