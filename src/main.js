import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI, {Loading} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './style/iconfont/iconfont.css'
import 'jquery'
import _ from 'lodash';
import VDistpicker from 'v-distpicker'
import HeadTop from './components/HeadTop'

Vue.component('v-distpicker', VDistpicker)
Vue.component('HeadTop', HeadTop)

Vue.config.productionTip = false;
//
// Vue.use(Loading);
Vue.use(ElementUI);
//定义一个全局拦截器lodash
// Object.defineProperty(Vue.prototype, '$_', { value: _ });
Vue.prototype.$_=_;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
