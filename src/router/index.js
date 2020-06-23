import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: "",
            name: "default",
            component: resolve => require(['@/pages/login/register'], resolve)
        },
        {
            path: '/login/register',
            name: '/register',
            component: resolve => require(['@/pages/login/register'], resolve)
        },
    ]
})


router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})



export default router

