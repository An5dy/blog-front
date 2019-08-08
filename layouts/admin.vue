<template>
  <div class="app-container">
    <no-ssr>
      <admin-header />
      <admin-sider />
      <div class="main-container">
        <section class="app-main">
          <nuxt />
        </section>
      </div>
    </no-ssr>
  </div>
</template>

<script>
import AdminSider from '@/components/AdminSider'
import AdminHeader from '@/components/AdminHeader'

export default {
  components: {
    AdminSider,
    AdminHeader
  },
  middleware: ['auth']
}
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  height: 100%;
  width: 100%;
  /* 主体 */
  .main-container {
    margin-left: 180px;
    padding-top: 50px;
    height: calc(100vh - 50px);
    overflow-y: auto;
    .app-main {
      min-height: calc(100vh - 140px);
      box-sizing: boder-box;
      padding: 50px 20px 20px 20px;
      position: relative;
      overflow: hidden;
    }
  }
}
</style>
