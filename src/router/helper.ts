import 'nprogress/nprogress.css';
import router from '@/router';
import NProgress from 'nprogress';
import { Message } from 'element-ui';
import { IStoreUser } from '@/store/modules/user';
import { IStoreRoutes } from '@/store/modules/routes';
import { Route } from 'vue-router';
import { generateTitle } from '@/i18n';

NProgress.configure({ showSpinner: false });

// Route redirect whitelist.
const whitelist = ['/login', '/join', '/password'];

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  if (IStoreUser.token) {
    if (whitelist.includes(to.path)) {
      // When the user has already logged in.
      next('/');
      NProgress.done();
      return;
    }

    if (IStoreUser.roles.length > 0) {
      next();
      return;
    }

    try {
      await IStoreUser.GetUserInfo();
      const roles = IStoreUser.roles;

      // generate accessible routes through roles
      IStoreRoutes.GenerateRoutes(roles);
      // dynamically add accessible routes
      router.addRoutes(IStoreRoutes.permissive);

      // replace: true so the navigation will not leave a history record
      next({ ...to, replace: true });
    } catch (e) {
      // re-login
      await IStoreUser.ClearToken();

      Message.error(e || 'Verification failed, please login again.');
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  } else {
    // redirected to the login page.
    // The user is not logged in.
    if (whitelist.includes(to.path)) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }

    // The user login has expired.
    if (IStoreUser.token) {
      await IStoreUser.Logout();
      Message({
        type: 'error',
        message: 'Your login has expired. Please login again.',
        duration: 0
      });
    }
  }
});

router.afterEach((to: Route) => {
  const route = to.matched[1];
  let title: string = route ? route.meta.title : '';
  if (!title) {
    title = 'A magic vue admin template';
  } else {
    title = generateTitle(title) as string;
  }
  document.title = title + ' · VAVA';

  NProgress.done();
});
