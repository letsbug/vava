import Vue from 'vue';
import Vuex from 'vuex';
import { IStateSystem } from './modules/system';
import { IStateRoutes } from './modules/routes';
import { IStateUser } from './modules/user';
import { IStateTabs } from './modules/tabs';
import { IStateNotification } from './modules/notification';

Vue.use(Vuex);

export interface IStoreRoot {
  system: IStateSystem;
  routes: IStateRoutes;
  user: IStateUser;
  tabs: IStateTabs;
  notification: IStateNotification;
}

export default new Vuex.Store<IStoreRoot>({});
