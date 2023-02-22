import Vue from 'vue'
import App from './App.vue'
// import router from './router'

// 清楚基础样式
import 'normalize.css/normalize.css'

// 全局引入
import 'mv-full-page/lib-dist/mv-full-page.css'
Vue.config.productionTip = false

new Vue({
  // router,
  render: h => h(App),
}).$mount('#app')


