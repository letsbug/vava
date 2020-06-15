import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import { Route, RouteConfig } from 'vue-router';
import store from '@/store';

export interface IStateTabs {
  history: RouteConfig[];
  cached: string[];
}

@Module({ dynamic: true, store, name: 'tabs' })
class Tabs extends VuexModule implements IStateTabs {
  //
  // States
  //
  public history: RouteConfig[] = [];
  public cached: string[] = [];

  //
  // Mutations
  //

  @Mutation
  private ADD_HISTORY(route: RouteConfig) {
    if (this.history.some((r) => r.path === route.path)) return;
    this.history.push(route);
  }

  @Mutation
  private ADD_CACHED(route: RouteConfig) {
    if (this.cached.includes(route.name!)) return;

    if (!route.meta.nocache) {
      this.cached.push(route.name!);
    }
  }

  @Mutation
  private DEL_HISTORY(route: RouteConfig) {
    for (const [i, r] of this.history.entries()) {
      if (r.path === route.path) {
        this.history.splice(i, 1);
        break;
      }
    }
  }

  @Mutation
  private DEL_CACHED(route: RouteConfig) {
    for (const [i, c] of this.cached.entries()) {
      if (c === route.name) {
        this.cached.splice(i, 1);
        break;
      }
    }
  }

  @Mutation
  private DEL_OTHER_HISTORY(route: RouteConfig) {
    this.history = this.history.filter((v) => {
      return v.path === route.path;
    });
  }

  @Mutation
  private DEL_OTHER_CACHED(route: RouteConfig) {
    this.cached = this.cached.filter((v) => {
      return v === route.name;
    });
  }

  @Mutation
  private EMPTY() {
    this.history = [];
    this.cached = [];
  }

  @Mutation
  private UPDATE(route: RouteConfig) {
    for (let v of this.history) {
      if (v.path === route.path) {
        v = Object.assign(v, route);
        break;
      }
    }
  }

  //
  // Actions
  //

  @Action
  public Add(route: RouteConfig) {
    this.ADD_HISTORY(route);
    this.ADD_CACHED(route);
  }

  @Action
  public Remove(route: RouteConfig) {
    this.DEL_HISTORY(route);
    this.DEL_CACHED(route);
  }

  @Action
  public RemoveOthers(route: RouteConfig) {
    this.DEL_OTHER_HISTORY(route);
    this.DEL_OTHER_CACHED(route);
  }

  @Action
  public Empty() {
    this.EMPTY();
  }

  @Action
  public Update(route: RouteConfig) {
    this.UPDATE(route);
  }
}

export const IStoreTabs = getModule(Tabs);
