<template>
  <div class="va-body-container">
    <i-tinymce v-model="content" />
  </div>
</template>

<script>
import ITinymce from '@/components/ITinymce'
import { content } from '@/components/ITinymce/plugins'

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
      content: content
    }
  }
}
</script>
