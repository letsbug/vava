<template>
  <div class="container-body text-editor">
    <quill-editor ref="editor" v-model="content" :options="options"></quill-editor>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import { document } from '@/components/Quill/configuration'

export default {
  name: 'TextEditor',
  components: { quillEditor },
  data() {
    return {
      options: document,
      content: ''
    }
  }
}
</script>
