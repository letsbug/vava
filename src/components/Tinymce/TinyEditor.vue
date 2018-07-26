<template>
  <div class="tinymce-editor" :id="id" v-html="value" title="tinymce editor"></div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern'
import 'tinymce/themes/mobile'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/link'

import configure from './configure'

const INIT = 0
const CHANGED = 2

export default {
  name: "TinyEditor",
  data() {
    return {
      status: INIT,
      inited: false,
      changed: false
    }
  },
  props: {
    id: { type: String, default: 'tinymce-' + new Date().getMilliseconds() },
    value: { type: String, default: '' },
    height: { type: Number, default: 500 },
    toolbar: { type: Array, default: () => [] },
    setting: { type: Object, required: false }
  },
  watch: {
    value(val) {
      if (!this.changed && this.inited) {
        this.$nextTick(() => this.setContent(val || ''))
      }
    }
  },
  mounted() {
    this.initTinymce()
  },
  activated() {
    this.initTinymce()
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    initTinymce() {
      const _this = this
      const _options = {
        selector: '#' + this.id,
        height: this.height,
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.inited = true
          editor.on('input change undo redo', () => {
            _this.changed = true
            _this.$emit('input', editor.getContent())
          })
        }
      }
      tinymce.init(Object.assign(_options, configure))
    },
    setContent(content) {
      tinymce.get(this.id).setContent(content)
    },
    destroyTinymce() {
      tinymce.get(this.id).destroy()
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variables";
  .mce-tinymce.mce-fullscreen {
    z-index: $zindex-text-editor;
  }
</style>
