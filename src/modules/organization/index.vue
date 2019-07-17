<template>
  <div class="va-body-container organization-container">
    <h4 class="va-body-title">
      {{ title[$i18n.locale] }}
    </h4>

    <el-row :gutter="15">
      <el-col :span="rankVisible ? 12 : 24">
        <el-tree
          ref="companyTree"
          :props="nodeProps"
          :load="loadCompany"
          :expand-on-click-node="false"
          node-key="id"
          lazy
          check-on-click-node
          highlight-current
          @current-change="onCurrentCompanyChange"
        />
      </el-col>
      <el-col v-show="rankVisible" :span="12">
        <el-tree
          :props="nodeProps"
          :data="ranks"
          :load="loadRank"
          :expand-on-click-node="false"
          node-key="id"
          lazy=""
          check-on-click-node
          highlight-current
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import OrgApi from '@/apis/organization'

export default {
  name: 'Organization',
  data() {
    return {
      title: {
        en: 'Organizational structure management',
        zh: '组织架构管理'
      },
      nodeProps: {
        children: 'children',
        label: 'name'
      },
      currentCompanyId: null,
      rankVisible: false,
      ranks: []
    }
  },
  methods: {
    async loadCompany(node, resolve) {
      const parentId = node.level === 0 ? 0 : node.data.id
      const { data } = await OrgApi.orgs(parentId)

      resolve(data)
    },
    async loadRank(node, resolve) {
      if (node.level === 0) {
        return
      }
      const { data } = await OrgApi.ranks(this.currentCompanyId, node.data.id)

      resolve(data)
    },
    async loadRankTopLevel() {
      const { data } = await OrgApi.ranks(this.currentCompanyId)

      this.ranks = data
    },
    onCurrentCompanyChange(data, node) {
      this.currentCompanyId = data.id

      this.loadRankTopLevel()
      if (!this.rankVisible) {
        this.rankVisible = true
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
