<template>
  <div>
    <blog-nav></blog-nav>
    <blog-profile></blog-profile>
    <section class="home">
      <ul class="post-list">
        <li>
          <aside class="dates">Jun 11</aside>
          <a href="/hexo-theme-dxx/2017/06/11/hello-world/">
            Hello World
            <h2>
              <p>Hello World</p>
            </h2>
          </a>
        </li>
        <li>
          <aside class="dates">Dec 25</aside>
          <a href="/hexo-theme-dxx/2013/12/24/excerpts/"
            >Excerpts
            <h2>
              <p>
                The following contents should be invisible in home/archive page.
              </p>
            </h2></a
          >
        </li>
        <li>
          <aside class="dates">Dec 24</aside>
          <a href="/hexo-theme-dxx/2013/12/24/日本語テスト/"
            >日本語テスト
            <h2>
              <p>This is a Japanese test post.</p>
            </h2></a
          >
        </li>
        <li>
          <aside class="dates">Dec 24</aside>
          <a href="/hexo-theme-dxx/2013/12/24/中文測試/"
            >中文測試
            <h2>
              <p>中文测试</p>
            </h2></a
          >
        </li>
        <li>
          <aside class="dates">Dec 24</aside>
          <a href="/hexo-theme-dxx/2013/12/24/中文測試/"
            >中文測試
            <h2>
              <p>中文测试</p>
            </h2></a
          >
        </li>
        <li>
          <aside class="dates">Dec 24</aside>
          <a href="/hexo-theme-dxx/2013/12/24/中文測試/"
            >中文測試
            <h2>
              <p>中文测试</p>
            </h2></a
          >
        </li>
        <li>
          <aside class="dates">Dec 24</aside>
          <a href="/hexo-theme-dxx/2013/12/24/中文測試/"
            >中文測試
            <h2>
              <p>中文测试</p>
            </h2></a
          >
        </li>
        <li>
          <aside class="dates">Dec 24</aside>
          <a href="/hexo-theme-dxx/2013/12/24/中文測試/"
            >中文測試
            <h2>
              <p>中文测试</p>
            </h2></a
          >
        </li>
        <li>
          <aside class="dates">Dec 24</aside>
          <a href="/hexo-theme-dxx/2013/12/24/中文測試/"
            >中文測試
            <h2>
              <p>中文测试</p>
            </h2></a
          >
        </li>
      </ul>
      <nav class="post-nav">
        <span class="prev" style="padding-left: 20px;">上一页</span>
        <span class="next">下一页</span>
      </nav>
    </section>
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import BlogNav from "@/components/BlogNav";
import BlogProfile from "@/components/BlogProfile";
import BlogFooter from "@/components/BlogFooter";

export default {
  name: "Home",
  components: {
    BlogNav,
    BlogProfile,
    BlogFooter
  }
};
</script>

<style lang="scss" scoped>
.home {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 40px 20px 40px;

  .post-list {
    margin-top: 0;

    li {
      list-style-type: none;
      margin-bottom: 20px;
      list-style-position: outside;
      margin-left: 1.5em;

      & + li {
        padding-top: 20px;
      }

      a {
        color: #333;
        display: block;
        font: 500 22px/1.7 "Helvetica Neue", helvetica, Arial, sans-serif;

        &:hover {
          text-decoration: none;
          color: #5694f1;
        }
      }

      .dates {
        float: right;
        position: relative;
        top: 1px;
        font: 400 17px/1.8 "Helvetica Neue", helvetica, Arial, sans-serif;
        color: #bbb;
      }

      p {
        font: 400 17px/1.8 "Helvetica Neue", helvetica, Arial, sans-serif;
      }
    }
  }

  .post-nav {
    text-align: center;
    padding-top: 20px;
    font-size: 13px;
    font-weight: 500;
    margin-top: 40px;

    span {
      -webkit-transition: all 0.1s linear;
      -moz-transition: all 0.1s linear;
      -ms-transition: all 0.1s linear;
      -o-transition: all 0.1s linear;
      transition: all 0.1s linear;
      position: relative;

      &:hover {
        cursor: pointer;
        color: #5694f1;
      }
    }

    .prev {
      float: left;

      &:hover {
        left: -4px;
      }
    }

    .next {
      float: right;

      &:hover {
        right: -4px;
      }
    }
  }
}
</style>
