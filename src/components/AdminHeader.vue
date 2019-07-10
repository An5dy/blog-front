<template>
  <div>
    <el-menu class="header">
      <div class="logo">
        <router-link to="/admin">管理后台</router-link>
      </div>
      <el-dropdown
        class="userinfo-container"
        trigger="click"
        @command="handleCommand"
      >
        <div class="userinfo-name">
          <span class="el-dropdown-link userinfo-inner">管理员</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="userinfo-dropdown">
          <el-dropdown-item command="passwordReset">修改密码</el-dropdown-item>
          <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "AdminHeader",
  methods: {
    handleCommand(command) {
      if (command === "logout") {
        this.$confirm("退出登录，是否继续？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$store.dispatch("logout").then(() => {
              location.reload();
            });
          })
          .catch(() => {});
      }
      if (command === "passwordReset") {
        this.dialogFormVisible = true;
      }
    },
    onSubmit() {
      // reset(this.user).then(() => {
      //   this.dialogFormVisible = false;
      //   this.$notify({
      //     title: "成功",
      //     message: "修改成功",
      //     type: "success",
      //     duration: 2000
      //   });
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  border-radius: 0px !important;
  z-index: 100;
  position: fixed;
  min-width: 100%;
  background-color: #409eff;

  .logo {
    float: left;
    font-size: 24px;
    font-weight: 700;
    color: #ffffff;
    width: 182px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    overflow: hidden;

    a {
      color: #ffffff;
    }
  }

  .userinfo-container {
    color: #ffffff;
    font-size: 15px;
    font-weight: 700;
    height: 50px;
    line-height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    top: 0px;
  }
}
</style>
