export function generateTitle(title) {
  const has = this.$te('router.' + title)
  return has ? this.$t('router.' + title) : title
}
