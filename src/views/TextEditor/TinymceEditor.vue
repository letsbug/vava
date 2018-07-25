<template>
  <div class="container-body text-editor">
    <tiny-editor :setting="config" :value="content" @input="onInput"></tiny-editor>
  </div>
</template>

<script>
import TinyEditor from '@/components/Tinymce/TinyEditor'
import { document } from '@/components/Tinymce/configuration'

export default {
  name: "TinymceEditor",
  components: { TinyEditor },
  data() {
    return {
      config: document,
      content: ''
    }
  },
  methods: {
    onInput: function (val) {
      // console.log(val)
    }
  }
}
</script>

<style scoped>

</style>
