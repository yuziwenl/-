import layoutAside from './views/home/layout-aside'
import layoutHeader from './views/home/layout-header'
import breadCrumb from './common/bread-crumb'

export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', breadCrumb)
  }
}
