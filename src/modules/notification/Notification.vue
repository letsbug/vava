<template>
  <div class="va-body-container container-notifications">
    <!-- page title -->
    <el-tabs v-model="tabsActived" @tab-click="handleTabsChange">
      <el-tab-pane label="unread" name="unread"></el-tab-pane>
      <el-tab-pane label="read" name="read"></el-tab-pane>
    </el-tabs>

    <!-- handle options -->
    <div class="options">
      <el-button size="small" plain v-if="multipleSelection.length > 0"
                 @click="clearSelection">
        Cancel
      </el-button>
      <el-button size="small" plain :type="multipleSelection.length > 0 ? 'primary' : ''"
                 @click="handleMarkRead" v-show="tabsActived === 'unread'">
        Mark {{ multipleSelection.length > 0 ? 'selected' : 'all' }} as read
      </el-button>
      <el-button size="small" plain :type="multipleSelection.length > 0 ? 'primary' : ''"
                 @click="handleDelete">
        Delete {{ multipleSelection.length > 0 ? 'selected' : 'all' }}
      </el-button>
    </div>

    <!-- notification list -->
    <el-table ref="notifications" style="width: 100%;" size="medium"
              :show-header="false" highlight-current-row show-overflow-tooltip
              :data="tabsActived === 'unread' ? notifications.unread : notifications.read"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="from" lable="from" width="80">
        <template slot-scope="scope">
          <el-tag size="mini">{{ scope.row.from }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="title" show-overflow-tooltip>
        <template slot-scope="scope">
          <a :class="transUnreadClass(scope)" @click="handleShowDetail(scope.row)">{{ scope.row.title }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="creatime" width="160" label="date">
        <template slot-scope="scope">
          <span :class="transUnreadClass(scope)">{{ scope.row.creatime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="options" width="70" align="right">
        <template slot-scope="scope">
          <el-tooltip content="Mark this as read" placement="left" v-show="tabsActived === 'unread'">
            <i class="el-icon-check" @click="handleMarkRead(scope.row)"></i>
          </el-tooltip>&nbsp;&nbsp;
          <el-tooltip content="Delete this notification" placement="left">
            <i class="el-icon-close" @click="handleDelete(scope)"></i>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- notification detail dialog -->

  </div>
</template>

<script>
export default {
  name: 'Notification',
  data() {
    return {
      tabsActived: 'unread',
      multipleSelection: []
    }
  },
  computed: {
    notifications() { return this.$store.getters.notifications }
  },
  methods: {
    transUnreadClass(scope) {
      return scope.row.unread ? 'unread' : ''
    },
    clearSelection() {
      this.$refs['notifications'].clearSelection()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleTabsChange() {
      this.clearSelection()
    },
    handleShowDetail(row) {
      this.$alert(row.title, 'notification', {
        confirmButtonText: 'Ok',
        callback: () => { this.handleMarkRead(row) }
      })
    },
    handleMarkRead(row) {
      this.$store.dispatch('notification_read', [row.id]).then(() => {})
    },
    handleDelete(target) {
      console.log(target)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/_variables.scss";

.options {
  position: absolute;
  top: $body-wrapper-padding;
  right: $body-wrapper-padding;
}
.notifications {
  cursor: pointer;
}
.unread {
  font-weight: 500;
}
</style>
