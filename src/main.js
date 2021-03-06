// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index';
import VueBlu from 'vue-blu';
import 'vue-blu/dist/css/vue-blu.min.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';
/** import '../static/css/reset.css'; 全局自定义样式 */
// require('video.js/dist/video-js.css');
// require('vue-video-player/src/custom-theme.css');
Vue.use(VideoPlayer);

// element-ui
Vue.use(ElementUI);
Vue.use(VueBlu);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
