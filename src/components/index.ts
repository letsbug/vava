export { default as Brand } from './Brand/index.vue';
export { default as Breadcrumb } from './Breadcrumb/index.vue';
export { default as ContextMenu } from './ContextMenu/index.vue';
export { default as Copyright } from './Copyright/index.vue';
export { default as ExcelImporter } from './ExcelImporter/index.vue';
export { default as GithubCorner } from './GithubCorner/index.vue';
export { default as ITinymce } from './ITinymce/index.vue';
export { default as LanguagePicker } from './LanguagePicker/index.vue';
export { default as RouterRefresh } from './RouterRefresh/index.vue';
export { default as ScreenFull } from './ScreenFull/index.vue';
export { default as ThemePicker } from './ThemePicker/index.vue';
export { default as UserPicker } from './UserPicker/index.vue';
export { default as VaIcons } from './VaIcons/index.vue';

export interface IContextOptions {
  label: string;
  command?: Function;
  disabled?: boolean;
}

export interface IContextAxis {
  top: number | string;
  left: number | string;
}
