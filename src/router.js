import Vue from "vue";
import Router from "vue-router";
import Token from "@/utils/token";

Vue.use(Router);

const router = new Router({
  mode: "history",
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue"),
      meta: {
        title: "Andy's Blog"
      }
    },
    {
      path: "/categories/:category/articles",
      name: "category-articles",
      component: () => import("./views/Home.vue"),
      meta: {
        title: "Andy's Blog"
      }
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue"),
      meta: {
        title: "关于我呀"
      }
    },
    {
      path: "/articles/:id",
      name: "article-show",
      component: () => import("./views/ArticleShow.vue")
    },
    {
      path: "/archives",
      name: "archive-index",
      component: () => import("./views/Archive.vue"),
      meta: {
        title: "归档"
      }
    },
    {
      path: "/search",
      name: "article-search",
      component: () => import("./views/Search.vue"),
      meta: {
        title: "搜索"
      }
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
        title: "首页"
      },
      children: [
        {
          path: "/admin/articles",
          name: "article-index",
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
        },
        {
          path: "/admin/articles/:id/edit",
          name: "article-edit",
          component: () => import("./views/admin/ArticleCreate.vue"),
          meta: {
            title: "编辑文章"
          }
        },
        {
          path: "/admin/categories",
          name: "category-index",
          component: () => import("./views/admin/Category.vue"),
          meta: {
            title: "分类列表"
          }
        },
        {
          path: "/admin/about",
          name: "admin-about",
          component: () => import("./views/admin/About.vue"),
          meta: {
            title: "关于"
          }
        }
      ]
    }
  ]
});

// 需要用户认证路由
const guard = [
  "admin",
  "article-index",
  "article-create",
  "article-edit",
  "category-index",
  "admin-about"
];

router.beforeEach((to, from, next) => {
  if (Token.get()) {
    if (to.path === "/admin/login") {
      next({ path: "/admin" });
    } else {
      next();
    }
  } else {
    if (guard.indexOf(to.name) !== -1) {
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
