import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import {
  getLanguage,
  getUiSize,
  getSidebarStatus,
  getThemes,
  setLanguage,
  setUiSize,
  setSidebarStatus,
  setThemes
} from '@/utils/cookies';
import { themeTool } from '@/themes';
import store from '@/store';

export enum DeviceType {
  Mobile,
  Desktop
}

export interface IStateTheme {
  type: string;
  color: string;
}

export interface IStateSystem {
  device: DeviceType;
  size: string;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  language: string;
  theme: IStateTheme;
}

@Module({ dynamic: true, store, name: 'system' })
class System extends VuexModule implements IStateSystem {
  //
  // States
  //

  public language: string = getLanguage();
  public device: DeviceType = DeviceType.Desktop;
  public sidebar = {
    opened: getSidebarStatus() !== 'closed',
    withoutAnimation: false
  };
  public size: string = getUiSize();
  public theme: IStateTheme = getThemes();

  //
  // Mutatoins
  //

  @Mutation
  private TOGGLE_SIDEBAR(withoutAnimation?: boolean) {
    this.sidebar.opened = !this.sidebar.opened;
    this.sidebar.withoutAnimation = withoutAnimation!;
    setSidebarStatus(this.sidebar.opened ? 'opened' : 'closed');
  }

  @Mutation
  private OPEN_SIDEBAR(withoutAnimation?: boolean) {
    this.sidebar.opened = true;
    this.sidebar.withoutAnimation = withoutAnimation!;
    setSidebarStatus('opened');
  }

  @Mutation
  private CLOSE_SIDEBAR(withoutAnimation?: boolean) {
    this.sidebar.opened = false;
    this.sidebar.withoutAnimation = withoutAnimation!;
    setSidebarStatus('closed');
  }

  @Mutation
  private TOGGLE_DEVICE(device: DeviceType) {
    this.device = device;
  }

  @Mutation
  private SET_LANGUAGE(lang: string) {
    this.language = lang;
    setLanguage(lang);
  }

  @Mutation
  private SET_SIZE(size: string) {
    this.size = size;
    setUiSize(size);
  }

  @Mutation
  private SET_THEME(theme: IStateTheme) {
    const { type, color } = theme;
    if (this.theme.type !== type || this.theme.color !== color) {
      this.theme = theme;
    }
  }

  //
  // Mutations
  //

  @Action
  public ToggleSidebar(withoutAnimation?: boolean) {
    this.TOGGLE_SIDEBAR(withoutAnimation);
  }

  @Action
  public OpenSidebar(withoutAnimation?: boolean) {
    this.OPEN_SIDEBAR(withoutAnimation);
  }

  @Action
  public CloseSidebar(withoutAnimation?: boolean) {
    this.CLOSE_SIDEBAR(withoutAnimation);
  }

  @Action
  public ToggleDevice(device: DeviceType) {
    this.TOGGLE_DEVICE(device);
  }

  @Action
  public SetLanguage(lang: string) {
    this.SET_LANGUAGE(lang);
  }

  @Action
  public SetUiSize(size: string) {
    this.SET_SIZE(size);
  }

  @Action
  public SetThemes(themes: IStateTheme) {
    const { type, color } = themes;
    themeTool.set(themes).then(() => {
      setThemes(type, color);
      this.SET_THEME(themes);
    });
  }
}

export const IStoreSystem = getModule(System);
