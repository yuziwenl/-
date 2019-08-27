import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/views/home'
import Login from '@/components/views/login'
import Main from '@/components/views/home/main'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: 'home'
  },
  {
    path: '*',
    component: () =>
        import('./components/views/404.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '',
      component: Main
    }, {
      path: '/home/comment',
      component: () =>
          import('./components/views/comment')
    }, {
      path: '/home/material',
      component: () =>
          import('./components/views/material')
    }, {
      path: '/home/content',
      component: () =>
          import('./components/views/content')
    }, {
      path: '/home/publish',
      component: () =>
          import('./components/views/publish')
    }, {
      path: '/home/publish/:articleId',
      component: () =>
          import('./components/views/publish')
    }]
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/home/account',
    component: () =>
        import('./components/views/account')
  }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
