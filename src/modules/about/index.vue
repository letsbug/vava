<template>
  <div class="va-body-container">
    <pre v-highlight>
      <code class="html" style="padding-bottom: 0!important;" v-html="$t('about.intro')"></code>
      <code class="html" style="padding-top: 0!important;">
        <h5 class="paragraph-indent"><strong>Features:</strong></h5>
        <ul class="features">
          <li v-for="(ft, i) in features" :key="i">
            {{ ft.name }}
            <ul v-if="ft.children">
              <li v-for="(cd, j) in ft.children" :key="j">{{ cd }}</li>
            </ul>
          </li>
        </ul>
      </code>
    </pre>
  </div>
</template>

<script>
import { Highlight } from '@/directives'

export default {
  name: 'About',
  metaInfo: {
    title: 'About VAVA'
  },
  directives: { Highlight },
  data() {
    return {
      features: [
        { name: 'Login / Logout' },
        { name: 'Permission Authentication', children: ['Page permission'] },
        { name: 'Exceptions', children: ['500', '404', '403', '...'] },
        { name: 'Global Features', children: ['Sidebar & Responsive', 'I18n', 'Themes switch', 'Router history tabs', 'Svg sprite', 'Screen full'] },
        { name: 'Editor', children: ['Rich text editor'] },
        { name: 'Excel', children: ['Export', 'Import'] },
        { name: 'Table' },
        { name: 'Dashboard' },
        { name: 'Guide for novice users' },
        { name: 'Clipboard' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.features {
  padding-left: 2.2em;
  list-style-type: disc;

  > li {
    margin-bottom: 1em;

    > ul {
      padding-left: 1.2em;
      list-style-type: circle;
    }
  }
}
</style>
