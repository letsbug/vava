<template>
  <el-breadcrumb class="va-breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="transition-breadcrumb">
      <el-breadcrumb-item v-for="(route, index) in routes" :key="route.path">
        <span v-if="!route.redirect || index === routes.length - 1" class="no-redirect">{{route.meta.title}}</span>
        <router-link v-else :to="route.redirect || route.path">{{ route.meta.title }}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data() {
    return { routes: [] }
  },
  methods: {
    breadcrumbList() {
      let routes = this.$route.matched.filter(v => v.name)
      const first = routes[0]
      if (first && first.name.trim().toLowerCase() !== 'homepage') {
        routes = [{ path: '/home', redirect: '/home', meta: { title: 'home' } }].concat(routes)
      }
      this.routes = routes
    }
  },
  mounted() {
    this.breadcrumbList()
  },
  watch: {
    $route: 'breadcrumbList'
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.va-breadcrumb {
  a {
    font-weight: normal;
  }

  .no-redirect {
    color: $color-gray-500!important;
  }
}
</style>
