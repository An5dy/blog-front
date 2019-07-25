<template>
  <footer class="footer">
    <div class="social">
      <a class="symbol" href="https://github.com/An5dy" target="_blank">
        <icon name="github" scale="2" />
      </a>
      <p class="small">
        © Copyright 2018 &nbsp;
        <span class="heart"><icon name="heart" scale="0.9" />&nbsp;Andy</span>
      </p>
      <p class="small">
        Powered by &nbsp;
        <a href="https://lumen.laravel.com" target="_blank">Lumen &nbsp;</a>
        Theme By &nbsp;
        <a href="https://github.com/fuzhouxxdong/hexo-theme-dxx" target="_blank"
          >Dxx</a
        >
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

      .heart {
        &:hover {
          color: #ff3356;
          transition: 0.7s ease-out;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
