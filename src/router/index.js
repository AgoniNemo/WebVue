import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home/home';
import Login from '@/components/login/login';
import Vuex from 'vuex';
import VueBlu from 'vue-blu';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// element-ui
Vue.use(ElementUI);

Vue.use(VueBlu);
Vue.use(Vuex);
Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
});
