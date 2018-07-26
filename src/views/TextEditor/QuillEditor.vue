<template>
  <div class="container-body text-editor">
    <quill-editor ref="editor" v-model="content"
                :options="options"
                @change="onEditorChange($event)"></quill-editor>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor, Quill } from 'vue-quill-editor'
import { ImageDrop } from 'quill-image-drop-module'
Quill.register('modules/imageDrop', ImageDrop)
import { document } from '@/components/Quill/configuration'

export default {
  name: 'QuillEditor',
  components: { quillEditor },
  data() {
    return {
      options: document,
      content: ''
    }
  },
  methods: {
    onEditorChange({ editor, html, text }) {}
  }
}
</script>

<style>
  .quill-editor:not(.bubble) .ql-container,
  .quill-editor:not(.bubble) .ql-container .ql-editor {
    height: 30rem;
    padding-bottom: 1rem;
  }
</style>
