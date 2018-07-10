import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home/home';
import { loadFromLocal } from '@/common/js/store.js';
import Login from '@/components/login/login';
import Info from '@/components/info';
import Collection from '@/components/CollectionVideo';
import VideoView from '@/components/VideoView';

Vue.use(Router);

const router = new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        keepAlive: false, /* 用于在 <keep-alive> 中使用，判断是否需要进行缓存 */
        auth: false, /* 自定义属性，用于判断是否进行校验,在router.beforeEach中使用 */
        title: '登录' /* 可以通过$route.meta.title 后取当前的描述信息、菜单信息 */
      }
    },
    {
      path: '/home',
      component: Home,
      meta: {
        keepAlive: false, /* 用于在 <keep-alive> 中使用，判断是否需要进行缓存 */
        auth: true, /* 自定义属性，用于判断是否进行校验,在router.beforeEach中使用 */
        title: '首页' /* 可以通过$route.meta.title 后取当前的描述信息、菜单信息 */
      },
      children: [{
        path: 'info',
        name: 'Info',
        component: Info,
        meta: {
          keepAlive: false, /* 用于在 <keep-alive> 中使用，判断是否需要进行缓存 */
          auth: true, /* 自定义属性，用于判断是否进行校验,在router.beforeEach中使用 */
          title: '个人中心' /* 可以通过$route.meta.title 后取当前的描述信息、菜单信息 */
        }
      },
      {
        path: 'collectionVideo',
        name: 'CollectionVideo',
        component: Collection,
        meta: {
          keepAlive: false, /* 用于在 <keep-alive> 中使用，判断是否需要进行缓存 */
          auth: true, /* 自定义属性，用于判断是否进行校验,在router.beforeEach中使用 */
          title: '收藏影片' /* 可以通过$route.meta.title 后取当前的描述信息、菜单信息 */
        }
      },
      {
        path: '/home',
        name: 'VideoView',
        component: VideoView,
        meta: {
          keepAlive: true, /* 用于在 <keep-alive> 中使用，判断是否需要进行缓存 */
          auth: true, /* 自定义属性，用于判断是否进行校验,在router.beforeEach中使用 */
          title: '首页' /* 可以通过$route.meta.title 后取当前的描述信息、菜单信息 */
        }
      }]
    },
    {
      path: '*', /* 默认跳转到登录界面 */
      redirect: { name: 'login' }
    }
  ]
});

// 注册一个全局前置守卫
router.beforeEach((to, from, next) => {
  // 判断是否需要校验
  if (to.matched.some(m => m.meta.auth)) {
    const model = loadFromLocal(null, 'logining', false);
    if (model.token) {
      next();// 校验通过，正常跳转到你设置好的页面
    } else {
      next({// 校验失败，跳转至登录界面
        path: '/login',
        query: {
          redirect: to.fullPath
        }// 将跳转的路由path作为参数，用于在登录成功后获取并跳转到该路径
      });
    }
  } else {
    next();// 不需要校验，直接跳转
  }
});

export default router;
