<template>
  <div class="va-body-container">
    <pre v-highlight><code class="html" v-html="$t('richText.intro')"></code></pre>
    <br />
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
