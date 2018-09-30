<template>
  <div class="va-body-container container-notifications">
    <!-- page title -->
    <h4 class="va-body-title">
      Notifications

      <!-- handle options -->
      <span class="options">
        <el-button size="small" plain @click="handleMarkAllRead" v-if="notifications.hasUnread">
          Mark all as read
        </el-button>
      </span>
    </h4>

    <!-- notification list -->
    <el-table ref="notifications" size="medium" :show-header="false" highlight-current-row show-overflow-tooltip
              :data="notifications.list" style="width: 100%;">
      <el-table-column type="index" label="#" width="40"></el-table-column>
      <el-table-column prop="from" lable="from" width="80">
        <template slot-scope="scope">
          <el-tag size="mini">{{ scope.row.from }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="title" show-overflow-tooltip>
        <template slot-scope="scope">
          <a :class="transUnreadClass(scope.row)" @click="handleShowDetail(scope.row)">{{ scope.row.title }}</a>
        </template>
      </el-table-column>
      <el-table-column width="160" label="date">
        <template slot-scope="scope">
          <span>{{ scope.row.date | dateFormat('yyyy.MM.dd hh:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" label="date">
        <template slot-scope="scope">
          <span :class="transUnreadClass(scope.row)">{{ scope.row.date | dateAgo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="options" width="70" align="right">
        <template slot-scope="scope">
          <el-tooltip content="Mark this as read" placement="left" v-if="scope.row.unread">
            <i class="el-icon-check" @click="handleMarkRead(scope.row)"></i>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  metaInfo: {
    title: 'Notifications'
  },
  data() {
    return {
      multipleSelection: []
    }
  },
  computed: {
    notifications() { return this.$store.getters.notifications }
  },
  methods: {
    transUnreadClass: row => row.unread ? 'unread' : '',
    handleShowDetail(row) {
      this.$alert(row.title, 'notification', {
        confirmButtonText: 'Ok',
        callback: () => { this.handleMarkRead(row) }
      })
    },
    handleMarkRead(row) {
      if (row && row.unread) this.$store.dispatch('notification_read', [row.id])
    },
    handleMarkAllRead() {
      const options = {
        confirmButtonText: 'Mark all',
        cancelButtonText: 'Cancel',
        callback: action => {
          if (action === 'confirm') this.$store.dispatch('notification_read_all')
        }
      }
      this.$confirm('You will mark all unread notifications as read.', 'Are you sure?', options)
    }
  }
}
</script>

<style scoped lang="scss">
.options {
  float: right;
  margin-top: -5px;
}
.notifications {
  cursor: pointer;
}
.unread {
  font-weight: 500;
}
</style>
