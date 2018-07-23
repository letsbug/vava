<template>
  <div class="container-body text-editor">
    <editor :init="config" :value="content"></editor>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import { document } from '@/components/Tinymce/configuration'

export default {
  name: "TinymceEditor",
  components: { Editor },
  data() {
    return {
      config: document,
      content: ''
    }
  }
}
</script>

<style scoped>

</style>
