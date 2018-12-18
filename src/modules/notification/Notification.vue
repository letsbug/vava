<template>
  <div class="va-body-container container-notifications">
    <!-- page title -->
    <h4 class="va-body-title">
      {{ $t('notification.title') }}

      <!-- handle options -->
      <span class="options">
        <ElButton v-if="notifications.hasUnread" size="small" plain @click="handleMarkAllRead">
          {{ $t('notification.markAll') }}
        </ElButton>
      </span>
    </h4>

    <!-- notification list -->
    <ElTable
      ref="notifications" :show-header="false" :data="notifications.list" size="medium"
      highlight-current-row show-overflow-tooltip style="width: 100%;"
    >
      <ElTableColumn type="index" label="#" width="40" />
      <ElTableColumn prop="from" lable="from" width="80">
        <template slot-scope="scope">
          <ElTag size="mini">
            {{ scope.row.from }}
          </ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="title" label="title" show-overflow-tooltip>
        <template slot-scope="scope">
          <a :class="transUnreadClass(scope.row)" @click="handleShowDetail(scope.row)">
            {{ scope.row.title }}
          </a>
        </template>
      </ElTableColumn>
      <ElTableColumn width="160" label="date">
        <template slot-scope="scope">
          <span>{{ scope.row.date | dateFormat('yyyy.MM.dd hh:mm:ss') }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn width="120" label="date">
        <template slot-scope="scope">
          <span :class="transUnreadClass(scope.row)">
            {{ scope.row.date | dateAgo }}
          </span>
        </template>
      </ElTableColumn>
      <ElTableColumn label="options" width="70" align="right">
        <template slot-scope="scope">
          <ElTooltip v-if="scope.row.unread" :content="$t('notification.mark')" placement="left">
            <a @click="handleMarkRead(scope.row)">
              <i class="el-icon-check"></i>
            </a>
          </ElTooltip>
        </template>
      </ElTableColumn>
    </ElTable>
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
