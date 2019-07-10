import Vue from "vue";
import Router from "vue-router";
import Token from "@/utils/token";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    },
    {
      path: "/admin/login",
      name: "login",
      component: () => import("./views/admin/Login.vue")
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("./views/admin/Layout.vue"),
      redirect: "/admin/articles",
      meta: {
        title: "首页",
        icon: "home"
      },
      children: [
        {
          path: "/admin/articles",
          name: "article-list",
          component: () => import("./views/admin/Article.vue"),
          meta: {
            title: "文章列表"
          }
        },
        {
          path: "/admin/articles/create",
          name: "article-create",
          component: () => import("./views/admin/ArticleCreate.vue"),
          meta: {
            title: "新增文章"
          }
        }
      ]
    }
  ]
});

// 需要用户认证路由
const guard = ["/admin", "/admin/articles", "/admin/articles/create"];

router.beforeEach((to, from, next) => {
  if (Token.get()) {
    if (to.path === "/admin/login") {
      next({ path: "/admin" });
    } else {
      next();
    }
  } else {
    if (guard.indexOf(to.path) !== -1) {
      next({ path: "/admin/login" });
    } else {
      next();
    }
  }
});

router.afterEach(to => {
  // 设置 title
  let title = to.meta.title;
  if (typeof title !== "undefined") {
    window.document.title = title;
  }
});

export default router;
