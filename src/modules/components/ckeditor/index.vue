<template>
  <div class="va-body-container">
    <ckeditor :editor="editor" :config="config"/>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import config from '@/vendor/ckeditor/configuration-classic'

export default {
  name: 'CKEditor',
  metaInfo: {
    title: 'CKEditor demo'
  },
  data() {
    return {
      editor: ClassicEditor,
      config: config
    }
  }
}
</script>
