<template>
  <div class="va-body-container">
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import config from '@/vendor/tinymce/configuration-classic'

export default {
  name: 'Tinymce',
  metaInfo: {
    title: 'Tinymce demo'
  },
  components: { Editor },
  data() {
    return {
      config: config
    }
  }
}
</script>
