<template>
  <div class="va-body-container">
    <pre v-highlight><code class="html">
      富文本作为后台最核心的，最基本的，同时又是坑最多功能，真的是叫人头疼！折腾了近一周的时间，常见的富文本基本都试了一下，最终还是决定使用
      <a class="link-theme" href="https://www.tiny.cloud/" target="_blank">TinyMCE</a>。以下为实际效果：
    </code></pre>
    <i-tinymce v-model="content" />
  </div>
</template>

<script>
import ITinymce from '@/components/ITinymce'
import { content } from '@/components/ITinymce/plugins'
import { Highlight } from '@/directives'

export default {
  name: 'RichEditor',
  metaInfo: {
    title: 'Rich editor demo'
  },
  directives: { Highlight },
  components: {
    ITinymce
  },
  data() {
    return {
      content: content
    }
  }
}
</script>
