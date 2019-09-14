export default {
  roles: {
    title: 'role',
    SuperAdmin: 'Super Admin',
    AccessManager: 'Access Manager',
    UserManager: 'User Manager',
    ProManager: 'Project Manager',
    Auditor: 'Auditor',
    Editor: 'Editor',
    Visitor: 'Visitor'
  },
  login: {
    title: 'Sign in to VAVA',
    username: 'username',
    password: 'password (All strings within the rule)',
    remember: `Remember (7days)`,
    rememberDefault: 'Cookie are stored for 10 minutes by default',
    login: 'Sign in',
    list: 'No account yet?',
    listHint: 'Pick any one to log in!'
  },
  router: {
    home: 'Home',
    about: 'About VAVA',
    guide: 'Guide',
    dashboard: 'Dashboard',
    permission: 'Permission',
    organization: 'Organization',
    cache: 'Router Cache',
    components: 'Components',
    richText: 'Rich Text',
    countTo: 'Count To',
    paintedFace: 'Painted Face',
    tables: 'Tables',
    inlineEdit: 'Inline Edit',
    sortable: 'Sortable',
    draggable: 'Draggable',
    fullFeature: 'FullFeature',
    iconViewer: 'Icon Viewer',
    exception: 'Exception Pages',
    excel: 'Excel',
    excelExport: 'Export Excel',
    excelImport: 'Import Excel',
    clipboard: 'Clipboard',
    settings: 'Settings',
    externalLink: 'External Link',
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
    switchUser: 'Switch user',
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
    themeStyle: 'Theme style',
    themeColor: 'Theme color',
    styles: {
      normally: 'Normally',
      light: 'Light'
    },
    actions: {
      default: 'Default',
      confirm: 'Ok'
    }
  },
  // About forms validates
  validate: {
    required: 'you must fill this!',
    formatBad: 'Bad input! ',
    lengthBad: 'length has to be {length}, please fill in again.',
    lengthTwoBad: 'length has to be {one} or {two}, please fill in again.',
    lengthMinBad: 'must be more than {min}, please fill in again.',
    lengthMaxBad: 'must be less than {min}, please fill in again.',
    lengthMinMaxBad: 'length is between {min} and {max}, please fill in again.',
    rules: {
      username: 'begin with a letter, allows " . _ @ "',
      password: 'just numbers and letters',
      email: '(eg. example@domain)',
      mobile: 'can be only number',
      phone: '(Area code-phone number)',
      captcha: '(only numbers and capital letters)'
    }
  },
  // About pages
  errors: {
    actionHome: 'HOME',
    actionBack: 'BACK',
    type400: 'Please don\'t mess around here, something will happen ...',
    type401: 'Unauthorized! This requests require authentication.',
    type403: 'You do not have access to this page! Want it? I won\'t give it to you!!!',
    type404: 'The page you want to see may have moved ...',
    type500: 'The server doesn\'t want to talk to you and throws you an error code ...'
  },
  homepage: {
    welcome: 'Welcome back, dear '
  },
  about: {
    intro: '<p class="paragraph-indent">VAVA is a back-end integration solution based on \'vue.js\' and \'element-ui\'. it is detached from my own project and remains iterative and optimized. It uses the latest front-end technology stack. Built-in authority verification, dynamic routing, theme switch and other background basic functions.</p>'
  },
  guide: {
    hint: 'It can give novice users some basic operating guidelines, based on the <a class="link-theme" href="https://www.npmjs.com/package/driver.js" target="_blank">driver.js</a> implementation.',
    start: 'Try It'
  },
  dashboard: {
    filters: {
      31: 'Last month',
      61: 'Last 2 months',
      92: 'Last 3 months',
      183: 'half a year',
      365: 'in a year',
      pv: 'Page Views',
      sales: 'Sales'
    },
    average: 'Average: ',
    pv: 'pv',
    uv: 'uv',
    cvr: 'cvr',
    countries: 'countries'
  },
  cache: {
    hint: 'Test route cache in desktop, input something, and jump to others route and back.'
  },
  notification: {
    title: 'notification',
    mark: 'mark as read',
    markAll: 'mark all as read',
    confirm: 'You will mark all unread notifications as read.',
    button: 'Mark All'
  },
  permissions: {
    yours: 'Your roles: {roles}',
    title: 'This page is accessible only to <span class="text-error">{role}</span>.'
  },
  richText: {
    intro: 'Rich text as the background of the most core, the most basic, but also annoying features, is really a headache! After nearly a week of experimenting with some familiar rich text, ' +
      'I decided to use <a class="link-theme" href="https://www.tiny.cloud/" target="_blank">TinyMCE</a>. ' +
      'Because there is no background, can not achieve the function of image upload, so the picture here can only add existing links. Here are the actual results:'
  },
  countTo: {
    intro: 'Build based on <a class="link-theme" target="_blank" href="https://github.com/PanJiaChen/vue-countTo">vue-count-to</a>.',
    params: 'Params: ',
    methods: 'Methods: ',
    start: 'Start',
    pauseResume: 'Pause/Resume',
    reset: 'Reset'
  },
  icons: {
    usage: 'Usage',
    content: 'Just use <strong>va-icon</strong> component to use icons, Like &lt;va-icon icon="dashboard"/&gt;.',
    list: 'Icons<small class="text-muted hidden-sm-and-down">Click them to copy HTML.</small>'
  },
  exception: {
    404: 'Trigger 404 error',
    403: 'Trigger 403 error',
    401: 'Trigger 401 error',
    500: 'Trigger 500 error'
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
