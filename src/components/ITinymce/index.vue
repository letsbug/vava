<template>
  <div class="tinymce-wrapper rich-text-wrapper">
    <textarea :id="id"></textarea>
  </div>
</template>

<script>
import { plugins, toolbar } from './plugins'

export default {
  props: {
    id: {
      type: String,
      default: `app-tiny-${+new Date() + (Math.floor(Math.random() * 1000))}`
    },
    value: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      required: false,
      default: 400
    },
    fixedToolbarContainer: {
      type: String,
      default: undefined,
      required: false
    }
  },
  data() {
    return {
      languages: { en: 'en', zh: 'zh_CN' },
      menubar: 'file edit insert view format table help',
      toolbar: '',
      imageTools: {
        image_caption: true,
        image_advtab: true,
        imagetools_cors_hosts: ['www.tinymce.com']
      },
      hasChange: false
    }
  },
  computed: {
    language() {
      return this.languages[this.$store.getters.language]
    }
  },
  watch: {
    language() {
      this.destroy()
      this.$nextTick(() => this.init())
    }
  },
  created() {
    if (!this.fixedToolbarContainer) return
    if (this.fixedToolbarContainer.indexOf('#') !== 0) {
      throw new Error('The parameter \'fixedToolbarContainer\' must be a dom id')
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    this.init()
  },
  deactivated() {
    this.destroy()
  },
  beforeDestroy() {
    console.log('will destroy this page')
    // TODO 提醒用户是否离开
  },
  destroyed() {
    this.destroy()
  },
  methods: {
    init() {
      const init_instance_callback = editor => {
        if (this.value) {
          editor.setContent(this.value)
        }
        editor.on('NodeChange Change KeyUp SetContent', () => {
          this.hasChange = true
          this.$emit('input', editor.getContent())
        })
      }
      const defaultOptions = {
        language: this.language,
        selector: `#${this.id}`,
        plugins,
        menubar: this.menubar,
        toolbar,
        branding: false,
        fixed_toolbar_container: this.fixedToolbarContainer,
        height: this.height,
        end_container_on_empty_block: true,
        default_link_target: '_blank',
        nonbreaking_force_tab: true,
        init_instance_callback
      }
      window.tinymce.init(Object.assign({}, defaultOptions, this.imageTools))
      this.$emit('on-inited')
    },
    destroy() {
      const tiny = window.tinymce.get(this.id)
      console.log('exec destroy method: ', this.id, tiny)
      if (tiny) tiny.destroy()
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

$tiny-border-color:   $color-gray-300;

.tinymce-wrapper /deep/ {
  height: 100%;

  .mce-tinymce {
    box-sizing: border-box;
    box-shadow: $shadow-sm-vr;

    &.mce-fullscreen {
      z-index: $z-index-rich-text;
    }
  }

  .mce-panel {
    border-color: $tiny-border-color;
  }

  .mce-edit-area {
    border-top: 0 none;
  }
}
</style>
