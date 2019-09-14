<template>
  <span
    class="version-marker"
    :class="`v${type === 'sub' ? lastVersion : version}`"
    :oper-user="user"
    :oper-time="mtime"
    :oper-type="type"
    :version="version"
    :last-version="lastVersion"
    :style="type === 'add' ? `background-color:${color};`: ''"
  >{{ fragment }}</span>
</template>

<script>
export default {
  name: 'Flag',
  props: {
    user: { type: String, required: true },
    mtime: { type: [String, Date, Number], required: true },
    type: { type: String, required: true },
    version: { type: Number, required: true },
    lastVersion: { type: Number, required: true },
    fragment: { type: String, required: true },
    color: { type: String, required: true }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

.version-marker {
  padding: 1px 0;
}

[oper-type=sub] {
  text-decoration: line-through;
}
//
</style>
