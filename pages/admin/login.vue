<template>
  <el-form
    ref="loginForm"
    :model="loginForm"
    :rules="rules"
    label-position="left"
    label-width="0px"
    class="login-container"
  >
    <h3 class="title">登&nbsp;&nbsp;录</h3>
    <el-form-item prop="account">
      <el-input
        v-model="loginForm.account"
        type="text"
        auto-complete="off"
        placeholder="用户名"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginForm.password"
        type="password"
        auto-complete="off"
        placeholder="密码"
      />
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button
        type="primary"
        style="width:100%;"
        @click.native.prevent="handleLogin"
        >登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { Message } from 'element-ui'

export default {
  layout: 'no-layout',
  middleware: 'auth',
  data() {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          {
            required: true,
            message: '账号 不能为空。',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码 不能为空。',
            trigger: 'blur'
          },
          {
            min: 6,
            message: '密码 不能小于6位。',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async handleLogin() {
      const valid = await this.$refs.loginForm.validate()
      if (valid) {
        try {
          await this.$store.dispatch('auth/handleLogin', this.loginForm)
          this.$router.push('/admin')
        } catch (error) {
          Message({
            message: error.response.data.message,
            type: 'error',
            center: true
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
}
</style>
