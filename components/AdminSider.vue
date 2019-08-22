<template>
  <div class="sidebar-container">
    <admin-logo />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="$route.path"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#f4f4f5"
        router
      >
        <el-menu-item index="/admin/articles">
          <i class="el-icon-document" />
          <span slot="title">文章</span>
        </el-menu-item>
        <el-menu-item index="/admin/categories">
          <i class="el-icon-menu" />
          <span slot="title">分类</span>
        </el-menu-item>
        <el-menu-item index="/admin/about">
          <i class="el-icon-s-custom" />
          <span slot="title">关于</span>
        </el-menu-item>
        <el-menu-item index="/admin/setting">
          <i class="el-icon-s-tools" />
          <span slot="title">设置</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import AdminLogo from './AdminLogo'

export default {
  name: 'AdminSider',
  components: {
    AdminLogo
  }
}
</script>

<style lang="scss" scoped>
.sidebar-container {
  width: 180px !important;
  height: 100%;
  position: fixed;
  bottom: 0px;
  left: 0px;
  z-index: 100;
  font-size: 0px;
  overflow: hidden;
  background-color: #304156;
}
.nest-menu .el-submenu > .el-submenu__title,
.el-submenu .el-menu-item {
  min-width: 180px !important;
}
.el-menu--collapse .el-menu .el-submenu {
  min-width: 180px !important;
}
.el-menu {
  border-right: none;
}
</style>
