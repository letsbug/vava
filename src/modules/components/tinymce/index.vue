<template>
  <div class="va-body-container">
    <editor id="tinymce"/>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/modern/theme'
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
  },
  mounted() {
    tinymce.init({})
  }
}
</script>
