const steps = [
  {
    element: '#hamburger',
    popover: {
      title: 'Hamburger',
      description: 'Open or close the sidebar menus',
      position: 'bottom'
    }
  },
  {
    element: '.handle-refresh',
    popover: {
      title: 'Refresh',
      description: 'Refresh current route if necessary',
      position: 'bottom'
    }
  },
  {
    element: '#screenFull',
    popover: {
      title: 'Screen full',
      description: 'Bring the page into fullscreen',
      position: 'bottom'
    }
  },
  {
    element: '#themePicker',
    popover: {
      title: 'Theme picker',
      description: 'Switch your favorite beautiful theme colors',
      position: 'left',
      offset: 5
    }
  },
  {
    element: '.va-lang-picker',
    popover: {
      title: 'Language picker',
      description: 'Switch the system language',
      position: 'left',
      offset: 5
    }
  },
  {
    element: '.va-tabs-bar',
    popover: {
      title: 'Tabs container',
      description: 'The history of the page you visited, Right-click on a TAB that can be closed for more action',
      position: 'bottom'
    }
  },
  {
    element: '#tabsRightOptions',
    popover: {
      title: 'Tabs actions',
      description: 'Close tabs actions, or right-click on a TAB that can be closed for more action',
      position: 'left'
    }
  }
]

export default steps
