<template>
  <el-breadcrumb class="va-breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="transition-breadcrumb">
      <el-breadcrumb-item v-for="(route, index) in routes" :key="route.path">
        <span v-if="!route.redirect || index === routes.length - 1" class="no-redirect">
          {{ generateTitle(route.meta.title) }}
        </span>
        <router-link v-else :to="route.redirect || route.path">
          {{ generateTitle(route.meta.title) }}
        </router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { generateTitle } from '@/i18n';
import { Route, RouteRecord } from 'vue-router';

@Component({ name: 'Breadcrumb' })
export default class extends Vue {
  routes: RouteRecord[] = [];

  @Watch('$route', { immediate: true })
  private onRouteChange(route: Route) {
    let routes = route.matched.filter(v => v.name);
    const first: RouteRecord = routes[0];
    if (!this.isHomePage(first)) {
      routes = [{ path: '/home', meta: { title: 'home' }, redirect: '/home' } as RouteRecord].concat(routes);
    }
    this.routes = routes;
  }

  private isHomePage(route: RouteRecord) {
    const name = route && route.name;
    if (!name) {
      return false;
    }
    return name.trim().toLowerCase() === 'homepage';
  }

  generateTitle = generateTitle;
}
</script>
