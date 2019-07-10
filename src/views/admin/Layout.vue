<template>
  <div class="app-container">
    <admin-header></admin-header>
    <admin-sider></admin-sider>
    <div class="main-container">
      <section class="app-main">
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
import AdminHeader from "@/components/AdminHeader";
import AdminSider from "@/components/AdminSider";

export default {
  name: "Layout",
  components: {
    AdminHeader,
    AdminSider
  }
};
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
