<template>
  <div>
    <el-menu class="header">
      <el-dropdown
        class="userinfo-container"
        trigger="click"
        @command="handleCommand"
      >
        <div class="userinfo-name">
          <span class="el-dropdown-link userinfo-inner">设置</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="userinfo-dropdown">
          <el-dropdown-item command="passwordReset">修改密码</el-dropdown-item>
          <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>

    <!-- 修改密码 -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="400px">
      <el-form :model="user">
        <el-form-item label="原密码" label-position="top">
          <el-input
            v-model="user.old_password"
            size="small"
            auto-complete="off"
          />
        </el-form-item>
        <el-form-item label="新密码" size="small" label-position="top">
          <el-input v-model="user.new_password" auto-complete="off" />
        </el-form-item>
        <el-form-item label="确认密码" size="small" label-position="top">
          <el-input
            v-model="user.new_password_confirmation"
            auto-complete="off"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" size="small" @click="onSubmit"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AdminHeader',
  data() {
    return {
      user: {
        old_password: null,
        new_password: null,
        new_password_confirmation: null
      },
      dialogFormVisible: false
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        this.$confirm('退出登录，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$store
              .dispatch('auth/handleLogout')
              .then(() => {
                location.reload()
              })
              .catch(() => {
                this.$store.dispatch('auth/resetToken')
              })
          })
          .catch(() => {})
      }
      if (command === 'passwordReset') {
        this.dialogFormVisible = true
      }
    },
    async onSubmit() {
      await this.$store.dispatch('auth/updatePassword', this.user)
      this.dialogFormVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 50px;
  z-index: 100;
  min-width: 100%;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .userinfo-container {
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
.dialog-footer {
  text-align: right;
}
</style>
