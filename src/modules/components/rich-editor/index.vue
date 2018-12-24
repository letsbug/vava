<template>
  <div class="va-body-container">
    CKEditor，TinyMCE，Quill，medium-editor，slatejs，选肥的选瘦的。。。富文本就是个天坑。。。
    <i-tinymce />
  </div>
</template>

<script>
import ITinymce from '@/components/ITinymce'

export default {
  name: 'RichEditor',
  metaInfo: {
    title: 'Rich editor demo'
  },
  components: {
    ITinymce
  },
  data() {
    return {
    }
  }
}
</script>
