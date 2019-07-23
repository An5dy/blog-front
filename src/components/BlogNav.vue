<template>
  <nav class="main-nav">
    <router-link to="/" exact-active-class="active">Home</router-link>
    <router-link to="/archives" exact-active-class="active"
      >Archives</router-link
    >
    <router-link to="/search" exact-active-class="active">Search</router-link>
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
    color: #8a8a8a;
    font-size: 13px;
    line-height: 1.35;
    border-radius: 3px;
    transition: all 0.15s ease;

    &:hover {
      color: #5694f1;
    }
  }

  .active {
    color: #5694f1;
  }
}
</style>
