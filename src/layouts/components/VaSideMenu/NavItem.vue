<template>
  <div :class="{ 'expanded': visible && (route.children.length > 1 || route.alwaysShow) }" class="va-side-nav">
    <template v-if="route.children.length > 1 || route.alwaysShow">
      <a
        :data-path="route.path"
        :class="{ 'active': current === route.path }" class="nav-title expander"
        @click="visible = !visible"
      >
        <VaIcon :icon="route.meta.icon" />
        <span class="item-name">
          {{ generateTitle(route.meta.title) }}
        </span>
        <i class="el-icon-arrow-right expander-icon"></i>
      </a>
      <ElCollapseTransition>
        <ul v-show="visible" class="nav-dropdown">
          <li v-for="child in route.children" :key="child.path">
            <RouterLink :to="route.path + '/' + child.path" class="nav-item">
              <VaIcon v-if="child.meta.icon" :icon="child.meta.icon" />
              <span class="item-name">
                {{ generateTitle(child.meta.title) }}
              </span>
            </RouterLink>
          </li>
        </ul>
      </ElCollapseTransition>
    </template>
    <template v-else>
      <a v-if="isExternal(route.children[0].path)" :href="route.children[0].path" target="_blank" class="nav-title">
        <VaIcon :icon="route.children[0].meta.icon" />
        <span class="item-name">
          {{ generateTitle(route.children[0].meta.title) }}
        </span>
      </a>
      <RouterLink v-else :to="route.path + '/' + (route.children[0].path || '')" class="nav-title">
        <VaIcon :icon="route.children[0].meta.icon" />
        <span class="item-name">
          {{ generateTitle(route.children[0].meta.title) }}
        </span>
      </RouterLink>
    </template>
  </div>
</template>

<script>
import ElCollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import { generateTitle } from '@/tools/i18n'

export default {
  name: 'NavItem',
  components: { ElCollapseTransition },
  props: {
    route: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    current() {
      return this.$route.matched[0].path
    }
  },
  mounted() {
    this.visible = this.current === this.route.path
  },
  methods: {
    generateTitle,
    isExternal(link) {
      return /^(https?:|mailto:|tel:|tencent:)/.test(link)
    }
  }
}
</script>
