<template>
  <footer class="footer">
    <div class="social">
      <a class="symbol" href="https://github.com/fuzhouxxdong">
        <i class="fa fa-github"></i>
      </a>
      <p class="small">
        © Copyright 2018 &nbsp;
        <i class="fa fa-heart" aria-hidden="true">&nbsp;Dxx</i>
      </p>
      <p class="small">
        Powered by &nbsp;
        <a href="https://hexo.io/">Hexo &nbsp;</a>
        Theme By &nbsp;
        <a href="https://github.com/fuzhouxxdong/hexo-theme-dxx">Dxx</a>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "BlogFooter"
};
</script>

<style lang="scss" scoped>
.footer {
  margin-top: 100px;

  .social {
    text-align: center;

    .symbol {
      color: #cdd4da;
      font-size: 2rem;
      text-decoration: none;
      margin-right: 0.3rem;

      &:hover {
        color: #bcd4da;
      }
    }

    .small {
      color: #bbb;
      font-size: 14px;
      line-height: 1.5;
      display: block;
      text-align: center;
      margin-top: 20px;

      a {
        color: #bbb;
      }
    }
  }
}
</style>
