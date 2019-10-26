<template>
  <div class="va-body-container container-notifications">
    <!-- page title -->
    <h4 class="va-body-title">
      {{ $t('notification.title') }}

      <!-- handle options -->
      <span class="options">
        <el-button v-if="hasUnread" size="small" plain @click="handleMarkAllRead">
          {{ $t('notification.markAll') }}
        </el-button>
      </span>
    </h4>

    <!-- notification list -->
    <el-table
      ref="notifications"
      :show-header="false"
      :data="notifications"
      size="medium"
      highlight-current-row
      show-overflow-tooltip
      style="width: 100%;"
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
          <span>{{ scope.row.timestamp | parseDate('yyyy.MM.dd hh:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" label="date">
        <template slot-scope="scope">
          <span :class="transUnreadClass(scope.row)">
            {{ scope.row.timestamp | parseTimeGap }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="options" width="70" align="right">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.isUnread" :content="$t('notification.mark')" placement="left">
            <a @click="handleMarkRead(scope.row)">
              <i class="el-icon-check"></i>
            </a>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IStoreNotification } from '@/store/modules/notification';
import { ITypeNotification } from '@/apis/types';

@Component({ name: 'Notification' })
export default class extends Vue {
  // metaInfo: { title: 'Notifications' }
  multipleSelection!: any[];

  get notifications() {
    return IStoreNotification.list;
  }

  get hasUnread() {
    return IStoreNotification.unread > 0;
  }

  transUnreadClass(row: ITypeNotification) {
    return { unread: row.isUnread };
  }

  handleShowDetail(row: ITypeNotification) {
    this.$alert(row.title, 'notification', {
      confirmButtonText: 'Ok',
      callback: () => {
        this.handleMarkRead(row);
      }
    });
  }

  handleMarkRead(row: ITypeNotification) {
    if (row && row.isUnread) IStoreNotification.Read(row);
  }

  handleMarkAllRead() {
    const message = this.$t('notification.confirm') as string;
    const title = this.$t('options.confirm.title') as string;
    const options = {
      confirmButtonText: this.$t('notification.button') as string,
      callback: (action: string) => {
        if (action === 'confirm') IStoreNotification.ReadAll();
      }
    };
    this.$confirm(message, title, options);
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
