import Cookies from 'js-cookie';

const SidebarStatusKey = 'sidebar-status';
const I18nKey = 'language';
const UiSizeKey = 'ui-size';
const UserTokenKey = 'User-Token';
const ThemeKey = 'ui-theme';

export const getSidebarStatus = () => Cookies.get(SidebarStatusKey);
export const setSidebarStatus = (status: string) => Cookies.set(SidebarStatusKey, status);

export const getLanguage = () => Cookies.get(I18nKey) || 'en';
export const setLanguage = (lang: string) => Cookies.set(I18nKey, lang);

export const getUiSize = () => Cookies.get(UiSizeKey) || 'small';
export const setUiSize = (size: string) => Cookies.set(UiSizeKey, size);

export const getThemes = () => {
  const _: string | undefined = Cookies.get(ThemeKey);
  return _ ? JSON.parse(_) : {};
};
export const setThemes = (type: string, color: string) => Cookies.set(ThemeKey, JSON.stringify({ type, color }));

export const getUserToken = () => Cookies.get(UserTokenKey) || null;
export const setUserToken = (token?: string, expires?: number) =>
  token && Cookies.set(UserTokenKey, token, expires ? { expires } : {});
export const removeUserToken = () => Cookies.remove(UserTokenKey);
