<template>
  <div class="tinymce-wrapper rich-text-wrapper">
    <textarea :id="id"></textarea>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: `app-tiny-${+new Date()}`
    }
  },
  data() {
    return {}
  },
  mounted() {
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
