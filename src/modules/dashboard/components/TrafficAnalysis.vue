<template>
  <div class="va-panels" style="height: 400px;">
    <div class="traffic-tab">
      <span
        v-for="(tab, i) in tabs"
        :key="i"
        :class="{ 'active': i === actives }"
        class="traffic-tab-item"
        @click="actives = i"
      >
        {{ tab }}
      </span>
    </div>

    <!-- Top10 list -->
    <el-table
      :data="actives === 0 ? sources : interviews"
      :default-sort="{ prop: 'pv', order: 'descending' }"
      size="large"
    >
      <el-table-column prop="url" label="URL" show-overflow-tooltip>
        <template slot-scope="scope">
          <template v-if="actives === 0">
            <a class="link-theme" target="_blank" :href="`https://${scope.row.url}`">{{ scope.row.url }}</a>
          </template>
          <template v-else>
            <router-link class="link-theme" :to="scope.row.url">{{ scope.row.url }}</router-link>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="pv" label="PV" width="90" />
      <el-table-column prop="ratio" label="RATIO" width="70" align="right">
        <template slot-scope="scope">{{ calcRatio(scope.row.pv, totalPv) }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    totalPv: { type: Number, required: true },
    sources: { type: Array, required: true },
    interviews: { type: Array, required: true }
  },
  data() {
    return {
      tabs: ['TOP6 SOURCE', 'TOP6 INTERVIEW'],
      actives: 0
    }
  },
  methods: {
    calcRatio(val, total) {
      return ((val / total) * 100).toFixed(2) + '%'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/_variables";

.traffic-tab {
  color: $color-gray-500;
  margin-bottom: $spacer-base;

  .traffic-tab-item {
    font-weight: bold;

    &.active {
      cursor: not-allowed;
      pointer-events: none;
      color: $color-text-primary;
    }

    &:not(.active) {
      cursor: pointer;
    }

    & + .traffic-tab-item {
      margin-left: $spacer-base;
    }
  }
}

/deep/ .el-table {
  &:before {
    content: none;
  }

  thead tr th {
    font-weight: 500;
    font-size: 13px;
  }

  tbody tr:last-child td {
    border: 0 none !important;
  }
}
</style>
