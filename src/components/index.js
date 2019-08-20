import layoutAside from './views/home/layout-aside'
import layoutHeader from './views/home/layout-header'

export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
  }
}
