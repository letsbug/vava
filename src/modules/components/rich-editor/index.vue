<template>
  <div class="va-body-container">
    <i-tinymce :height="900" />
    <br />
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
