<template>
  <div class="va-body-container">
    <!--<ckeditor :editor="editor" />-->
    CKEditor，TinyMCE，Quill，medium-editor，slatejs，选肥的选瘦的。。。富文本就是个天坑。。。
  </div>
</template>

<script>
// import CKEditor from '@ckeditor/ckeditor5-vue/dist/ckeditor'
// import Classic from '@ckeditor/ckeditor5-build-classic/build/ckeditor'

export default {
  name: 'RichEditor',
  metaInfo: {
    title: 'Rich editor demo'
  },
  components: {
    // ckeditor: CKEditor.component
  },
  data() {
    return {
      // editor: Classic
    }
  },
  mounted() {
  },
  methods: {}
}
</script>
