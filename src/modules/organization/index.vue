<template>
  <div class="va-body-container organization-container">
    <h4 class="va-body-title">
      {{ title[$i18n.locale] }}
    </h4>
  </div>
</template>

<script>
export default {
  name: 'Organization',
  data() {
    return {
      title: {
        en: 'Organizational structure management',
        zh: '组织架构管理'
      }
    }
  },
  mounted() {
    // console.log(this.$i18n.locale)
  }
}
</script>

<style scoped lang="scss">

</style>
