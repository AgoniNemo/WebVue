import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home/home';
import Login from '@/components/login/login';
import Info from '@/components/info';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: '登录',
      component: Login
    },
    {
      path: '/home',
      name: '主页',
      component: Home,
      children: [{
        path: 'home/info',
        name: '个人中心',
        component: Info
      }]
    }
  ]
});
