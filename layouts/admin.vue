<template>
  <div class="app-container">
    <client-only>
      <admin-header />
      <admin-sider />
      <div class="main-container">
        <section class="app-main">
          <el-card>
            <nuxt />
          </el-card>
        </section>
      </div>
    </client-only>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import AdminSider from '@/components/AdminSider'
import AdminHeader from '@/components/AdminHeader'

export default {
  components: {
    AdminSider,
    AdminHeader
  },
  middleware: ['auth'],
  mounted() {
    Cookie.set('access_token', this.$store.state.auth.token)
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  height: 100%;
  width: 100%;
  .main-container {
    margin-left: 180px;
    height: calc(100vh - 50px);
    overflow-y: auto;
    background-color: #f8f8f8;
    .app-main {
      box-sizing: boder-box;
      padding: 30px 20px 50px 20px;
      position: relative;
      overflow: hidden;
    }
  }
}
</style>
