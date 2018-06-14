import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home/home';
import Login from '@/components/login/login';
import Vuex from 'vuex';
import VueBlu from 'vue-blu';
import 'vue-blu/dist/css/vue-blu.min.css';
import { Card, Carousel, Button } from 'element-ui';

// element-ui
Vue.use(Card);
Vue.use(Carousel);
Vue.use(Button);

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
