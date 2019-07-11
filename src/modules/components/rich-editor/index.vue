<template>
  <div class="va-body-container">
    <pre v-highlight><code class="html" v-html="$t('richText.intro')"></code></pre>
    <br />
    <!--<i-tinymce v-model="content" @on-inited="onTinyInited" />-->
    <tinymce-editor v-model="content" />
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
// import { ITinymce } from '@/components'
import { content } from '@/components/ITinymce/plugins'
import { Highlight } from '@/directives'

export default {
  name: 'RichEditor',
  metaInfo: {
    title: 'Rich editor demo'
  },
  directives: {
    Highlight
  },
  components: {
    TinymceEditor: Editor
  },
  data() {
    return {
      content: content
    }
  },
  created() {
    // this.loading = this.$loading({ lock: true })
  },
  methods: {
    // onTinyInited() {
    //   setTimeout(() => {
    //     this.loading.close()
    //   }, 300)
    // }
  }
}
</script>
