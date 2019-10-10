import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import { constantRoutes, asyncRoutes } from '@/router/routes';
import { RouteConfig } from 'vue-router';
import store from '@/store';

const hasPermission = (roles: string[], route: RouteConfig) =>
  route.meta && route.meta.roles ? roles.some(role => route.meta.roles.includes(role)) : true;

const filterAsyncRoutes = (asyncRouteMap: RouteConfig[], roles: string[]) => {
  const list: RouteConfig[] = [];
  asyncRouteMap.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children && tmp.children.length > 0) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      list.push(tmp);
    }
  });
  return list;
};

export interface IStateRoutes {
  routes: RouteConfig[];
  permissive: RouteConfig[];
}

@Module({ dynamic: true, store, name: 'routes' })
class Routes extends VuexModule implements IStateRoutes {
  public routes: RouteConfig[] = [];
  public permissive: RouteConfig[] = [];

  @Mutation
  private SET_ROUTES(routes: RouteConfig[]) {
    this.permissive = routes;
    this.routes = constantRoutes.concat(routes);
  }

  @Action
  public GenerateRoutes(roles: string[]) {
    const accessRoutes = roles.includes('systemAdmin') ? asyncRoutes : filterAsyncRoutes(asyncRoutes, roles);
    this.SET_ROUTES(accessRoutes);
  }
}

export const IStoreRoutes = getModule(Routes);
