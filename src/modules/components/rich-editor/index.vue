<template>
  <div class="va-body-container">
    <Ckeditor :editor="editor" />
  </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue/dist/ckeditor'
import Classic from '@ckeditor/ckeditor5-build-classic/build/ckeditor'

export default {
  name: 'RichEditor',
  metaInfo: {
    title: 'Rich editor demo'
  },
  components: {
    ckeditor: CKEditor.component
  },
  data() {
    return {
      editor: Classic
    }
  },
  mounted() {
  },
  methods: {}
}
</script>
