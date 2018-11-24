<template>
  <div :class="{ 'expanded': visible }" class="va-side-nav">
    <template v-if="route.children.length > 1">
      <a
        :class="{ 'active': current === route.path }" class="nav-title expander"
        @click="visible = !visible"
      >
        <va-icon :icon="route.meta.icon"/>
        <span class="item-name">{{ generateTitle(route.meta.title) }}</span>
        <i class="el-icon-arrow-right expander-icon"></i>
      </a>
      <el-collapse-transition>
        <ul v-show="visible" class="nav-dropdown">
          <li v-for="child in route.children" :key="child.path">
            <router-link :to="route.path + '/' + child.path" class="nav-item">
              <va-icon v-if="child.meta.icon" :icon="child.meta.icon"/>
              <span class="item-name">
                {{ generateTitle(child.meta.title) }}
              </span>
            </router-link>
          </li>
        </ul>
      </el-collapse-transition>
    </template>
    <router-link v-else :to="route.path + '/' + (route.children[0].path || '')" class="nav-title">
      <va-icon :icon="route.children[0].meta.icon"/>
      <span class="item-name">{{ generateTitle(route.children[0].meta.title) }}</span>
    </router-link>
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
      return '/' + this.$route.path.split('/')[1]
    }
  },
  methods: {
    generateTitle
  }
}
</script>
