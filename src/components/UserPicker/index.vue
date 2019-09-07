<template>
  <el-dialog
    :title="$t('login.listHint')" :visible.sync="dialogVisible"
    custom-class="user-simulate-dialog" top="10vh"
    append-to-body center
    @closed="handleClose"
  >
    <el-table :data="list">
      <el-table-column type="index" width="36" />
      <el-table-column property="username" label="Username" min-width="110" show-overflow-tooltip />
      <el-table-column label="Password" min-width="110" show-overflow-tooltip>**********</el-table-column>
      <el-table-column property="roles" label="Roles" min-width="110" show-overflow-tooltip />
      <el-table-column label="option" width="80">
        <template slot-scope="scope">
          <a class="linker" @click="handleChoose(scope.row)">Choose</a>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import Service from '@/apis/account'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      dialogVisible: false,
      list: []
      // checkedIndex: -1
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  watch: {
    visible(v) {
      if (this.list.length === 0) {
        this.loadList()
      }
      this.dialogVisible = v
    }
  },
  methods: {
    async loadList() {
      const { data } = await Service.mocks()
      this.list = data
    },
    handleChoose(user) {
      this.$emit('on-change', user)
    },
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

@media screen and (max-width: $device-md) {
  /deep/ .user-simulate-dialog {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: auto !important;
    margin: $spacer-base !important;
    padding-top: 54px;

    .el-dialog__header {
      margin-top: -54px;
    }

    .el-dialog__body {
      height: 100%;
      overflow-y: auto;
    }
  }
}
</style>
