<template>
  <div class="profile">
    <section class="wrapper">
      <header class="header">
        <blog-avatar
          class="avatar"
          width="80px"
          height="80px"
          :image="setting.avatar"
        >
          <router-link :to="{ name: 'about' }">
            <h3>Me</h3>
          </router-link>
        </blog-avatar>
        <h1>{{ setting.title }}</h1>
        <h2>{{ setting.sketch }}</h2>
      </header>
    </section>
  </div>
</template>

<script>
import BlogAvatar from './BlogAvatar'

export default {
  name: 'BlogProfile',
  components: {
    BlogAvatar
  },
  computed: {
    setting() {
      return this.$store.state.setting.setting
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  .wrapper {
    padding: 60px 40px 0;
    max-width: 600px;
    margin: 0 auto;
    .header {
      margin-bottom: 60px;
      text-align: center;
      position: relative;
      .avatar {
        margin-bottom: 20px;
      }
      h1 {
        font-weight: 500;
        letter-spacing: 0px;
        font-size: 23px;
        color: #222;
      }
      h2 {
        font: italic Georgia, serif;
        font-size: 17px;
        color: #aaa;
        margin-top: 10px;
      }
    }
  }
}
</style>
