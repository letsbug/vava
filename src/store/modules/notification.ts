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

  @Action({ rawError: true })
  public async GetNotifications(pages: { page: number; limit: number }) {
    const { page, limit } = pages;
    const { data } = await apiNotificationList(page, limit);
    if (!data) {
      throw Error('GetNotifications: Could not get notifications, got an error.');
    }
    this.SET_LIST(data as ITypeNotification[]);
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
