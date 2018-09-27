<template>
  <div class="va-body-container container-notifications">
    <!-- page title -->
    <h3 class="va-body-title">
      Notification
      <small class="text-muted">system notifications</small>
      <span class="options">
        <el-button size="mini" plain v-if="multipleSelection.length > 0"
                   @click="$refs['notifications'].clearSelection()">
          Cancel
        </el-button>
        <el-button size="mini" plain :type="multipleSelection.length > 0 ? 'primary' : ''">
          Mark {{ multipleSelection.length > 0 ? 'selected' : 'all' }} as read
        </el-button>
      </span>
    </h3>

    <!-- notification list -->
    <el-table ref="notifications" style="width: 100%;" size="medium" row-class-name="clickable"
              :show-header="false" highlight-current-row show-overflow-tooltip
              :data="notifications"
              @selection-change="handleSelectionChange"
              @row-click="showDetail">
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="from" lable="from" width="80">
        <template slot-scope="scope">
          <el-tag size="mini">{{ scope.row.from }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="title" show-overflow-tooltip>
        <template slot-scope="scope">
          <span :class="transClass(scope)">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="creatime" width="160" label="date">
        <template slot-scope="scope">
          <span :class="transClass(scope)">{{ scope.row.creatime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="options" width="48">
        <template slot-scope="scope">
          <el-tooltip content="Mark this as read" placement="left">
            <i class="el-icon-check"></i>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- notification detail dialog -->
    <!-- TODO add dialog element -->
  </div>
</template>

<script>
export default {
  name: 'Notification',
  data() {
    return {
      multipleSelection: []
    }
  },
  computed: {
    notifications() { return this.$store.getters.notifications }
  },
  methods: {
    transClass(scope) {
      return scope.row.unread ? 'unread' : ''
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    showDetail(row, event, column) {
      console.log(row, event, column)
    }
  }
}
</script>

<style scoped>
.notifications {
  cursor: pointer;
}
.unread {
  font-weight: bold;
}
</style>
