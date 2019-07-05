<template>
  <div :class="{ 'expanded': visible && (route.children.length > 1 || route.alwaysShow) }" class="va-side-nav">
    <template v-if="route.children.length > 1 || route.alwaysShow">
      <template v-if="sidebarOpened">
        <a
          :data-path="route.path"
          :class="{ 'active': current === route.path }" class="nav-title expander"
          @click="sidebarOpened && (visible = !visible)"
        >
          <va-icon :icon="route.meta.icon" />
          <span class="item-name">
            {{ generateTitle(route.meta.title) }}
          </span>
          <i class="el-icon-arrow-right expander-icon"></i>
        </a>
        <el-collapse-transition>
          <ul v-show="visible" class="nav-dropdown">
            <li v-for="child in route.children" :key="child.path">
              <router-link :to="route.path + '/' + child.path" class="nav-item">
                <va-icon v-if="child.meta.icon" :icon="child.meta.icon" />
                <span class="item-name">
                  {{ generateTitle(child.meta.title) }}
                </span>
              </router-link>
            </li>
          </ul>
        </el-collapse-transition>
      </template>
      <template v-else>
        <el-popover
          placement="right-start" width="210" trigger="hover" popper-class="side-menu-collapse-drops"
          transition="transition-fade-in-bottom"
        >
          <ul class="nav-dropdown">
            <li v-for="child in route.children" :key="child.path">
              <router-link :to="route.path + '/' + child.path" class="nav-item">
                <va-icon v-if="child.meta.icon" :icon="child.meta.icon" />
                <span class="item-name">
                  {{ generateTitle(child.meta.title) }}
                </span>
              </router-link>
            </li>
          </ul>
          <a
            slot="reference"
            :data-path="route.path" :class="{ 'active': current === route.path }"
            class="nav-title expander"
            @click="sidebarOpened && (visible = !visible)"
          >
            <va-icon :icon="route.meta.icon" />
            <span class="item-name">
              {{ generateTitle(route.meta.title) }}
            </span>
            <i class="el-icon-arrow-right expander-icon"></i>
          </a>
        </el-popover>
      </template>
    </template>
    <template v-else>
      <a v-if="isExternal(route.children[0].path)" :href="route.children[0].path" target="_blank" class="nav-title">
        <va-icon :icon="route.children[0].meta.icon" />
        <span class="item-name">
          {{ generateTitle(route.children[0].meta.title) }}
        </span>
      </a>
      <router-link v-else :to="route.path + '/' + (route.children[0].path || '')" class="nav-title">
        <va-icon :icon="route.children[0].meta.icon" />
        <span class="item-name">
          {{ generateTitle(route.children[0].meta.title) }}
        </span>
      </router-link>
    </template>
  </div>
</template>

<script>
import ElCollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import { generateTitle } from '@/i18n'

export default {
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
    },
    sidebarOpened() {
      return this.$store.state.application.sidebar.opened
    }
  },
  watch: {
    sidebarOpened(val) {
      if (this.isCurrent()) this.visible = val
    }
  },
  mounted() {
    this.visible = this.isCurrent()
  },
  methods: {
    generateTitle,
    isExternal(link) {
      return /^(https?:|mailto:|tel:|tencent:)/.test(link)
    },
    isCurrent() {
      return this.current === this.route.path
    }
  }
}
</script>
