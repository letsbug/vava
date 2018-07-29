<template>
  <el-breadcrumb class="app-breadcrumb" separator="\">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in routes" :key="item.path" :class="item.redirect?'':'no-redirect'">
        <span v-if="!item.redirect || index === routes.length - 1" class="no-redirect">{{item.meta.title}}</span>
        <router-link v-else :to="item.redirect || item.path">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "Breadcrumb",
  created() {
    this.getBreadcrumb()
  },
  data() {
    return { routes: [] }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let _routes = this.$route.matched.filter(item => item.name)
      console.log(_routes)
      const first = _routes[0]
      if (first && first.name !== 'Dashboard') {
        _routes = [{ path: '/dashboard', redirect: '/dashboard', meta: { title: 'Dashboard' } }].concat(_routes)
      }
      this.routes = _routes
      console.log(this.routes)
    }
  }
}
</script>
