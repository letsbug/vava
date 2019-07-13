<template>
  <div class="va-body-container container-notifications">
    <!-- page title -->
    <h4 class="va-body-title">
      {{ $t('notification.title') }}

      <!-- handle options -->
      <span class="options">
        <el-button v-if="notifications.hasUnread" size="small" plain @click="handleMarkAllRead">
          {{ $t('notification.markAll') }}
        </el-button>
      </span>
    </h4>

    <!-- notification list -->
    <el-table
      ref="notifications" :show-header="false" :data="notifications.list" size="medium"
      highlight-current-row show-overflow-tooltip style="width: 100%;"
    >
      <el-table-column type="index" label="#" width="40" />
      <el-table-column prop="from" lable="from" width="80">
        <template slot-scope="scope">
          <el-tag size="mini">
            {{ scope.row.from }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="title" show-overflow-tooltip>
        <template slot-scope="scope">
          <a :class="transUnreadClass(scope.row)" @click="handleShowDetail(scope.row)">
            {{ scope.row.title }}
          </a>
        </template>
      </el-table-column>
      <el-table-column width="160" label="date">
        <template slot-scope="scope">
          <span>{{ scope.row.date | dateFormat('yyyy.MM.dd hh:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" label="date">
        <template slot-scope="scope">
          <span :class="transUnreadClass(scope.row)">
            {{ scope.row.date | dateAgo }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="options" width="70" align="right">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.unread" :content="$t('notification.mark')" placement="left">
            <a @click="handleMarkRead(scope.row)">
              <i class="el-icon-check"></i>
            </a>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters(['notifications'])
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
        confirmButtonText: this.$t('notification.button'),
        callback: action => {
          if (action === 'confirm') this.$store.dispatch('notification_read_all')
        }
      }
      this.$confirm(this.$t('notification.confirm'), this.$t('options.confirm.title'), options)
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
