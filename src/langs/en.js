export default {
  login: {
    title: 'Sign in to VAVA',
    username: 'username',
    password: 'password (All strings within the rule)',
    remember: `Remember (7days)`,
    login: 'Sign in',
    list: 'About accounts?',
    listHint: 'Simulate with mock.js, <strong>Pick any one to auto fill login form</strong>!'
  },
  router: {
    home: 'Home',
    dashboard: 'Dashboard',
    reports: 'Reports',
    tables: 'Tables',
    inlineEdit: 'Inline Edit',
    sortable: 'Sortable',
    draggable: 'Draggable',
    fullFeature: 'FullFeature',
    iconViewer: 'Icon Viewer',
    excel: 'Excel',
    excelExport: 'Export Excel',
    excelImport: 'Import Excel',
    settings: 'Settings',
    others: 'Others',
    // hidden in side bar
    notification: 'Notification'
  },
  header: {
    search: 'search something...',
    refresh: 'refresh',
    screenFull: 'Full Screen',
    screenResize: 'Exit Full Screen',
    theme: 'Theme',
    notificationHas: 'you have unread notifications',
    notificationNo: 'you have no unread notifications',
    profile: 'Profile',
    settings: 'Settings',
    logout: {
      title: 'Sign out',
      confirm: 'Exit the currently logged in account?',
      button: 'Sure Exit'
    }
  },
  tabBar: {
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  options: {
    confirm: {
      title: 'Are you sure?',
      sure: 'Sure'
    }
  },
  theme: {
    default: 'default',
    light: 'Light',
    dark: 'Dark'
  },
  // About pages
  notification: {
    title: 'notification',
    mark: 'mark as read',
    markAll: 'mark all as read',
    confirm: 'You will mark all unread notifications as read.',
    button: 'Mark All'
  },
  icons: {
    usage: 'Usage',
    content: 'Just use <strong>va-icon</strong> component to use icons, Like &lt;va-icon icon="dashboard"/&gt;.',
    list: 'Icons<small class="text-muted hidden-sm-and-down">Click them to copy HTML.</small>'
  },
  excelExport: {
    filename: 'Filename',
    fileType: 'File Type',
    autoWidth: 'Cell Auto-Width',
    execute: 'Export',
    currentPage: 'Current Page',
    allPages: 'All Pages'
  },
  excelImport: {
    browse: 'Browse',
    browseNotDrag: 'Browse and select an excel file ...',
    drag: 'Drag the excel here or',
    selected: 'Selected',
    change: 'Click to change',
    errorSize: 'Please do not import files larger than {allowSizeMax}m in size.',
    errorExcess: 'Only support importing one file!',
    errorTypes: 'Only supports import .xlsx, .xls, .csv suffix files',
    emptyHint: 'Please import an excel first.',
    exitHint: 'You have an excel that has been imported. Are you sure you want to leave?'
  }
}
