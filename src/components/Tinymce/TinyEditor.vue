<template>
  <div class="tinymce-editor" :id="id" :value="value" title="tinymce editor"></div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/link'

const INIT = 0;
const CHANGED = 2;

export default {
  name: "TinyEditor",
  props: {
    value: { type: String, required: true },
    setting: {}
  },
  watch: {
    value(val) {
      if (this.status === INIT || tinymce.activeEditor.getContent() !== val) {
        tinymce.activeEditor.setContent(val);
      }
      this.status = CHANGED
    }
  },
  data() {
    return {
      status: INIT,
      id: 'editor-' + new Date().getMilliseconds(),
    }
  },
  mounted() {
    const _this = this
    let setting = {
      selector: '#' + this.id,
      init_instance_callback: function (editor) {
        editor.on('input change undo redo', function() {
          _this.$emit('input', editor.getContent());
        });
      }
    };
    setting = Object.assign(setting, this.setting)
    tinymce.init(setting);
  },
  methods: {},
  beforeDestroy: function () {
    tinymce.get(this.id).destroy();
  }
}
</script>

<style lang="scss">
  @import "../../styles/variables";
  .mce-tinymce.mce-fullscreen {
    z-index: $zindex-text-editor;
  }
</style>
