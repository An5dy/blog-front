<template>
  <el-scrollbar wrap-class="scrollbar-wrapper" class="sidebar-container">
    <el-menu :default-active="$route.path" router>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-document" />
          <span>文章管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/articles">
            <i class="el-icon-document" />
            <span>列表</span>
          </el-menu-item>
          <el-menu-item index="/admin/articles/create">
            <i class="el-icon-edit" />
            <span>新增</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/admin/categories">
        <i class="el-icon-menu" />
        <span slot="title">分类管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/about">
        <i class="el-icon-setting" />
        <span slot="title">关于</span>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
export default {
  name: "AdminSider"
};
</script>

<style lang="scss" scoped>
.sidebar-container {
  width: 180px !important;
  height: 100%;
  position: fixed;
  top: 50px;
  bottom: 0px;
  left: 0px;
  z-index: 100;
  font-size: 0px;
  overflow: hidden;
  border-right: 1px solid #e6e6e6;
}

.sidebar-container .nest-menu .el-submenu > .el-submenu__title,
.sidebar-container .el-submenu .el-menu-item {
  min-width: 180px !important;
}

.el-menu--collapse .el-menu .el-submenu {
  min-width: 180px !important;
}

.el-menu {
  border-right: none;
}
</style>
