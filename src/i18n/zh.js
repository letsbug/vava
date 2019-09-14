export default {
  roles: {
    title: '角色',
    SuperAdmin: '系统管理员',
    AccessManager: '授权管理员',
    UserManager: '用户管理员',
    ProManager: '项目管理员',
    Auditor: '审核员',
    Editor: '编辑员',
    Visitor: '访客'
  },
  login: {
    title: 'VAVA 系统登录',
    username: '用户名',
    password: '密码 (符合规则的任意字符串)',
    remember: `7天内自动登录`,
    rememberDefault: 'Cookie默认保存10分钟',
    login: '登 录',
    list: '还没账户？',
    listHint: '随便选一个去登录吧！'
  },
  router: {
    home: '首页',
    about: '关于VAVA',
    guide: '新手指引',
    dashboard: '仪表盘',
    permission: '权限测试',
    organization: '组织架构',
    cache: '路由缓存',
    components: '组件',
    richText: '富文本编辑器',
    countTo: '数字计数器',
    paintedFace: '大花脸',
    table: '表格',
    inlineEdit: '行内编辑',
    sortable: '排序',
    draggable: '拖拽排序',
    fullFeature: '综合使用',
    iconViewer: '图标',
    exception: '异常页面',
    excel: 'Excel',
    excelExport: '导出',
    excelImport: '导入',
    clipboard: '粘贴板',
    settings: '配置',
    externalLink: '外部链接',
    others: '其它',
    // hidden in side bar
    notification: '通知中心'
  },
  header: {
    search: '全局搜索...',
    refresh: '刷新',
    screenFull: '全屏',
    screenResize: '退出全屏',
    theme: '主题换肤',
    notificationHas: '你有新的未读信息',
    notificationNo: '你没有未读信息',
    profile: '个人中心',
    settings: '个人设置',
    switchUser: '切换用户',
    logout: {
      title: '退出系统',
      confirm: '确定退出当前登录的账户吗？',
      button: '确定'
    }
  },
  tabBar: {
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  options: {
    confirm: {
      title: '操作确认',
      sure: '确定'
    }
  },
  theme: {
    themeStyle: '主题风格',
    themeColor: '主题颜色',
    styles: {
      normally: '正常',
      light: '明亮'
    },
    actions: {
      default: '恢复默认',
      confirm: '确定'
    }
  },
  // About forms validates
  validate: {
    required: '你必须填写此项！',
    formatBad: '错误的输入！',
    lengthBad: '长度必须是{length}，请重新输入。',
    lengthTwoBad: '长度必须是{one}或者{two}，请重新输入。',
    lengthMinBad: '长度必须大于{min}，请重新输入。',
    lengthMaxBad: '长度必须小于{min}，请重新输入。',
    lengthMinMaxBad: '长度必须在{min}到{max}之间，请重新输入。',
    rules: {
      username: '以字母开头，可包含 " . _ @ "',
      password: '密码由数字和字母组成',
      email: '（例：example@xx.com）',
      mobile: '只能是数字',
      phone: '（区号-电话号码）',
      captcha: '（仅限数字和大写字母）'
    }
  },
  // About pages
  errors: {
    actionHome: '回到首页',
    actionBack: '返回',
    type400: '瞎JB点，这下爽了撒！该！！！',
    type401: '你未经授权！这个请求需要身份验证！',
    type403: '你没有这个页面的访问权限！想要吗？我不会给你的！！！',
    type404: '哎呀！！！这里什么都没有！',
    type500: '服务器不想理你，还丢给了你这个错误代码 ...'
  },
  homepage: {
    welcome: '欢迎回来，亲爱的 '
  },
  about: {
    intro: '<p class="paragraph-indent">vava 是一个基于vue.js和element-ui构建的，从我自己项目中剥离出来，并一直保持迭代和优化的一个后台集成解决方案。它使用了时下最新的前端技术栈，内置了权限验证、动态路由、主题切换等后台基本功能。</p>'
  },
  guide: {
    hint: '可以给新手用户一些基本的操作指引，基于<a class="link-theme" href="https://www.npmjs.com/package/driver.js" target="_blank">driver.js</a>实现。',
    start: '试试效果'
  },
  dashboard: {
    filters: {
      31: '近一个月',
      61: '近二个月',
      92: '近三个月',
      183: '半年内',
      365: '一年内',
      pv: '访问量',
      sales: '销售额'
    },
    average: '日均：',
    pv: '浏览量',
    uv: '访客数',
    cvr: '转化率',
    countries: '国家总数'
  },
  cache: {
    hint: '此页面用于测试页面缓存功能，方法：在输入框随便输入一些东西，然后切换路由再切换回来。'
  },
  notification: {
    title: '通知中心',
    mark: '标记为已读',
    markAll: '标记所有为已读',
    confirm: '确定将所有未读消息标记为已读吗？',
    button: '确定'
  },
  permissions: {
    yours: '你的角色：{roles}',
    title: '这个页面只有 <span class="text-error">{role}</span> 能访问。'
  },
  richText: {
    intro: '富文本作为后台最核心的，最基本的，同时又是坑最多功能，真的是叫人头疼！折腾了近一周的时间，常见的富文本基本都试了一下，' +
      '最终还是决定使用 <a class="link-theme" href="https://www.tiny.cloud/" target="_blank">TinyMCE</a> ' +
      '实现富文本编辑功能。因为没有后台，无法实现图片上传的功能，所以这里的图片仅能添加已有链接。以下为实际效果：'
  },
  countTo: {
    intro: '此功能基于 <a class="link-theme" target="_blank" href="https://github.com/PanJiaChen/vue-countTo">vue-count-to</a> 构建.',
    params: '参数: ',
    methods: '方法: ',
    start: '开始',
    pauseResume: '暂停/恢复',
    reset: '重置'
  },
  icons: {
    usage: '使用方法',
    content: '使用 <strong>va-icon</strong> 组件来使用内置图标, 例如： &lt;va-icon icon="dashboard"/&gt;.',
    list: '图标列表<small class="text-muted hidden-sm-and-down">点击任意一个直接复制代码.</small>'
  },
  exception: {
    404: '触发404',
    403: '触发403',
    401: '触发401',
    500: '触发500'
  },
  excelExport: {
    filename: '文件名',
    fileType: '文件类型',
    autoWidth: '自动列宽',
    execute: '导出',
    currentPage: '当前页',
    allPages: '所有页'
  },
  excelImport: {
    browse: '浏览',
    browseNotDrag: '浏览并选择一个excel文件......',
    drag: '拖拽一个文件到这，或者',
    selected: '已选择',
    change: '点击修改',
    errorSize: 'Excel导入最大仅支持 {allowSizeMax}m 以内的文件。',
    errorExcess: '只能导入一个文件',
    errorTypes: '只能支持导入 .xlsx, .xls, .csv 后缀的文件',
    emptyHint: '请先上传一个excel文件。',
    exitHint: '你有一个已经导入的excel文件. 确定离开当前页面吗？'
  }
}
