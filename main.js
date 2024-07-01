import App from './App'



// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'


// colorUi的组件 此处为引用自定义顶部
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom);

// 引入:uView-UI
import uView from 'uview-ui';
Vue.use(uView);
import * as http from '@/common/http' // http请求接口
import * as utils from '@/common/utils' // 工具文件
import storage from '@/common/storage' // 缓存文件
import config from '@/common/config' // 配置
// 定义全局
Vue.prototype.$storage = storage
Vue.prototype.$http = http
Vue.prototype.$utils = utils
Vue.prototype.$config = config

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif