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
    }]
  }, {
    path: '/login',
    name: 'login',
    component: Login
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
