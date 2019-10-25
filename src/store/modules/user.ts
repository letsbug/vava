import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import { apiLogin, apiLogout, apiUserInfo } from '@/apis/account';
import { getUserToken, removeUserToken, setUserToken } from '@/utils/cookies';
import { resetRouter } from '@/router';
import store from '@/store';

const TOKEN_EXPIRE =
  process.env.NODE_ENV === 'development'
    ? 1 / 24 // for dev
    : 1 / 24 / 6; // By default, it is stored in the cookie for 10 minutes.

export enum ITypeSex {
  female,
  male
}

export enum ITypeRoles {
  systemAdmin,
  superAdmin,
  accessManager,
  userManager,
  proManager,
  auditor,
  editor,
  visitor
}

export interface IStateUser {
  id: string | number;
  username: string;
  password: string;
  token?: string;
  expire?: number;
  roles: ITypeRoles[];
  nickname?: string;
  phone?: string;
  email?: string;
  qq?: number;
  company?: string;
  avatar?: string;
  sex: ITypeSex;
  age?: number;
  birthday?: Date | string | number;
  height?: number;
  weight?: number;
  intro?: string;
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IStateUser {
  //
  // States
  //

  public id: string | number = '';
  public username: string = '';
  public password: string = '';
  public token?: string = getUserToken();
  public expire: number = 7;
  public roles: ITypeRoles[] = [];
  public nickname?: string = '';
  public phone?: string = '';
  public avatar?: string = '';
  public sex: ITypeSex = ITypeSex.male;
  public age?: number = 0;
  public birthday?: Date | string | number = '';
  public height?: number = 0;
  public weight?: number = 0;
  public intro?: string = '';

  //
  // Mutations
  //

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token || '';
  }

  @Mutation
  private SET_ROLES(roles: ITypeRoles[]) {
    this.roles = roles;
  }

  @Mutation
  private SET_INFO(userInfo: IStateUser) {
    const { id, username, password, nickname, phone, avatar, age, sex, birthday, height, weight, intro } = userInfo;
    this.id = id;
    this.username = username;
    this.password = password;
    this.nickname = nickname;
    this.phone = phone;
    this.avatar = avatar;
    this.age = age;
    this.sex = sex;
    this.birthday = birthday;
    this.height = height;
    this.weight = weight;
    this.intro = intro;
  }

  //
  // Actions
  //

  @Action
  public async Login(userInfo: { username: string; password: string; remember?: boolean }) {
    let { username, password, remember } = userInfo;
    username = username.trim();
    const { data } = await apiLogin(username, password);
    setUserToken(data.accessToken, remember ? this.expire : 0);
    this.SET_TOKEN(data.accessToken);
  }

  @Action
  public async GetUserInfo() {
    if (!this.token) {
      throw Error('GetUserInfo: can not get user information by unknown token.');
    }
    const { data } = (await apiUserInfo(this.username)) as any;
    if (!data) {
      throw Error('Token valid failed, please login again.');
    }

    const { roles } = data;
    if (!roles || roles.length < 1) {
      throw Error('Your account can not login.');
    }
    this.SET_ROLES(roles as ITypeRoles[]);

    this.SET_INFO(data as IStateUser);
  }

  @Action
  public async ClearToken() {
    removeUserToken();
    this.SET_TOKEN('');
    this.SET_ROLES([]);
  }

  @Action
  public async Logout() {
    if (!this.token) {
      throw Error('Logout: token is undefined.');
    }
    await apiLogout();
    resetRouter();
    this.ClearToken();
  }

  @Action
  public async SwitchUser(user: IStateUser) {
    // this.ClearToken();
    // resetRouter();
    // await this.Login(user);
  }
}

export const IStoreUser = getModule(User);
