import Layout from '@/layouts/Layout'

export const constantRouteMap = [
  { path: '/login', component: () => import('@/modules/account/Login'), hidden: true },
  { path: '/join', component: () => import('@/modules/account/Join'), hidden: true },
  { path: '/error/:code', component: () => import('@/modules/error/Error'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/modules/dashboard/Dashboard')
    }]
  },
  {
    path: '/report',
    component: Layout,
    redirect: '/report',
    children: [
      { path: '', name: 'Reports', component: () => import('@/modules/reports/Reports') }
    ]
  },
  { path: '*', redirect: '/error/404', hidden: true }
]

export const asyncRouteMap = []
