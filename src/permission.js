import router from './router'
import nprogress from 'nprogress' // 引入文件
import 'nprogress/nprogress.css' // 引入样式
router.beforeEach(function (to, from, next) {
  nprogress.start()
  if (to.path.startsWith('/home')) {
    let result = window.localStorage.getItem('user-info')
    if (result) {
      let userInfo = JSON.parse(result)
      if (userInfo && userInfo.token) {
        next()
      } else {
        next('/login')
      }
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
router.afterEach(() => {
  nprogress.done()
})
export default router
