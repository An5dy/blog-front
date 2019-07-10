<template>
  <el-form
    ref="loginForm"
    :model="loginForm"
    :rules="loginRules"
    label-position="left"
    label-width="0px"
    class="login-container"
  >
    <h3 class="title">登&nbsp;&nbsp;录</h3>
    <el-form-item prop="account">
      <el-input
        type="text"
        v-model="loginForm.account"
        auto-complete="off"
        placeholder="用户名"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        type="password"
        v-model="loginForm.password"
        auto-complete="off"
        placeholder="密码"
      />
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button
        type="primary"
        style="width:100%;"
        :loading="loading"
        @click.native.prevent="handleLogin"
        >登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
const validateAccount = (rule, value, callback) => {
  if (!value) {
    callback(new Error("用户名不能为空。"));
  } else {
    callback();
  }
};
const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error("密码不能小于6位。"));
  } else {
    callback();
  }
};
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      loginForm: {
        account: "",
        password: ""
      },
      loginRules: {
        account: [
          {
            required: true,
            trigger: "blur",
            validator: validateAccount
          }
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validatePassword
          }
        ]
      }
    };
  },
  methods: {
    async handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("login/login", this.loginForm)
            .then(() => {
              this.$router.push("/admin");
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    }
  }
};
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
