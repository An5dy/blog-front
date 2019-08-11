<template>
  <div class="sidebar-logo-container">
    <nuxt-link to="/admin" class="sidebar-logo-link">
      <h1 class="sidebar-title">管理后台</h1>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'AdminLogo'
}
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #1f2d3d;
  text-align: center;
  overflow: hidden;
  .sidebar-logo-link {
    height: 100%;
    width: 100%;
    .sidebar-title {
      color: #fff;
      font-size: 25px;
    }
  }
}
</style>
