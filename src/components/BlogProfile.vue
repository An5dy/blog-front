<template>
  <div class="profile">
    <section class="wrapper">
      <header class="header">
        <a href="#">
          <img class="avatar" src="@/assets/avatar.png" />
        </a>
        <h1>Dxx</h1>
        <h2>A simple Developer</h2>
      </header>
    </section>
  </div>
</template>

<script>
export default {
  name: "BlogProfile"
};
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
        display: inline-block;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-bottom: 20px;
      }

      h1 {
        font-weight: 400;
        letter-spacing: 0;
        font-size: 20px;
        color: #222;
      }

      h2 {
        margin-top: 10px;
        font: italic 18px/1.3em Georgia, serif;
      }
    }
  }
}
</style>
