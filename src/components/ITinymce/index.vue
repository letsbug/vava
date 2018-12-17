<template>
  <textarea :id="id"></textarea>
</template>

<script>
import 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/link'

export default {
  props: {
    id: { type: String, default: `vue-tiny-${+new Date()}` },
    value: { type: String, default: '' },
    type: { type: String, default: 'full' },
    height: { type: Number, required: false, default: 0 }
  },
  data() {
    return {
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    this.init()
  },
  methods: {
    init() {
      window.tinymce.init({
        selector: `#${this.id}`
      })
    }
  }
}
</script>
