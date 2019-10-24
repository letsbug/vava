import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import { apiNotificationList, apiNotificationRead, apiNotificationReadAll } from '@/apis/notification';
import { ITypeNotification } from '@/apis/types';
import store from '@/store';

export interface IStateNotification {
  list: ITypeNotification[];
  unread: number;
}

@Module({ dynamic: true, store, name: 'notification' })
class Notification extends VuexModule implements IStateNotification {
  //
  // States
  //

  public list: ITypeNotification[] = [];
  public unread: number = this.list.filter(v => v.isUnread).length;

  //
  // Mutations
  //

  @Mutation
  private SET_LIST(list: ITypeNotification[]) {
    this.list = list;
  }

  @Mutation
  private READ(notification: ITypeNotification) {
    for (let n of this.list) {
      if (n.id === notification.id) {
        n.isUnread = false;
        break;
      }
    }
  }

  @Mutation
  private READ_ALL() {
    this.list.forEach(v => {
      v.isUnread = false;
    });
  }

  @Action
  public async GetNotifications() {
    const { data } = await apiNotificationList();
    if (!data) {
      throw Error('GetNotifications: Could not get notifications, got an error.');
    }
    this.list = data;
  }

  @Action
  public Read(notification: ITypeNotification) {
    this.READ(notification);
  }

  @Action
  public ReadAll() {
    this.READ_ALL();
  }
}

export const IStoreNotification = getModule(Notification);
