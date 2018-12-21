<template>
  <div class="va-body-container">
    CKEditor，TinyMCE，Quill，medium-editor，slatejs，选肥的选瘦的。。。富文本就是个天坑。。。
    <ckeditor :editor="editor" />
  </div>
</template>

<script>
import VCkeditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
  name: 'RichEditor',
  metaInfo: {
    title: 'Rich editor demo'
  },
  components: {
    ckeditor: VCkeditor.component
  },
  data() {
    return {
      editor: ClassicEditor
    }
  }
}
</script>
