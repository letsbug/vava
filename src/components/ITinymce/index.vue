<template>
  <div class="tinymce-wrapper rich-text-wrapper">
    <textarea :id="id"></textarea>
  </div>
</template>

<script>
import plugins from './plugins'

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
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: Number,
      required: false,
      default: 360
    },
    fixedToolbarContainer: {
      type: String,
      default: undefined,
      required: false
    }
  },
  data() {
    return {
      languages: {
        en: 'en',
        zh: 'zh_CN'
      }
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
  destroyed() {
    this.destroy()
  },
  methods: {
    init() {
      window.tinymce.init({
        language: this.language,
        selector: `#${this.id}`,
        menubar: this.menubar,
        branding: false,
        fixed_toolbar_container: this.fixedToolbarContainer,
        plugins,
        height: this.height
      })
    },
    destroy() {
      const tiny = window.tinymce.get(this.id)
      tiny.destroy()
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

$tiny-border-color:   $color-gray-300;

.tinymce-wrapper /deep/ {
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
