import Vue from 'vue';
import Router from 'vue-router';
import { constantRoutes } from '@/router/routes';

Vue.use(Router);

const createRouter = () =>
  new Router({
    linkExactActiveClass: 'active',
    routes: constantRoutes,
    scrollBehavior: (to, from, savedPosition) => savedPosition || { x: 0, y: 0 },
  });

const router = createRouter();

// 异步路由加载变动时调用，刷新路由列表。
// https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export const resetRouter = () => {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher;
};

export default router;
