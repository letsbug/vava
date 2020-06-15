<template>
  <a :class="{ active: doing }" class="va-nav-item handle-refresh" @click="handleRefresh">
    <va-icon icon="action-refresh" />
  </a>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { IStoreTabs } from '@/store/modules/tabs';

@Component({ name: 'RouteRefresher' })
export default class extends Vue {
  private doing: boolean = false;

  private replace(route: Route) {
    this.$nextTick(() => {
      this.$router.replace({
        path: '/redirect' + route.path,
      });
      this.doing = false;
    });
  }

  private handleRefresh() {
    if (this.doing) return;
    this.doing = true;

    setTimeout(() => {
      IStoreTabs.Remove(this.$route);
      this.replace(this.$route);
    }, 1000);
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/_variables';

.handle-refresh.active .va-icon {
  animation: ani-rotate 0.8s ease-out infinite;
}
</style>
