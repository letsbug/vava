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
          @node-contextmenu="noContextMenu"
        />
      </el-col>
      <el-col v-show="rankVisible" :span="12">
        <el-tree
          ref="rankTree"
          :props="nodeProps"
          :data="ranks"
          :load="loadRank"
          :expand-on-click-node="false"
          node-key="id"
          lazy
          check-on-click-node
          highlight-current
          @node-contextmenu="noContextMenu"
        />
      </el-col>
    </el-row>

    <context-menu ref="nodeContexts" :options="contextOptions" class="tree-context-menu" />
  </div>
</template>

<script>
import OrgApi from '@/apis/organization'
import { ContextMenu } from '@/components'

export default {
  name: 'Organization',
  components: { ContextMenu },
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
      ranks: [],
      contextOptions: [
        { name: '重命名', callback: this.nodeRename },
        { name: '添加', callback: this.nodeAddSubCompany },
        { name: '删除', callback: this.nodeDelete }
      ],
      contextTarget: null
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
    },
    noContextMenu($e, data, node, $self) {
      this.$refs['nodeContexts'].open($e)
      this.contextTarget = data
    },
    nodeRename() {
      this.modifyConfirm('rename')
    },
    nodeAddSubCompany() {
      this.modifyConfirm('add')
    },
    async nodeDelete() {
      const action = await this.$confirm('确定删除吗？')
      if (action !== 'confirm') {
        return
      }
      console.log('handle node delete: ', this.contextTarget)
    },
    async modifyConfirm(method) {
      const tar = this.contextTarget
      const { value } = await this.$prompt('请输入名称：', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: method === 'rename' ? tar.name : null
      })
      const { id, parentId, name, orgId } = this.contextTarget

      if (value === name) {
        return
      }

      const _method = `${tar.orgId > 0 ? 'rank' : 'org'}${method === 'rename' ? 'Update' : 'Add'}`
      const _parentId = method === 'rename' ? parentId : id

      const { success, data } = await OrgApi[_method](_parentId, value, id, orgId)
      if (!success) {
        return
      }

      this.$message.success(`${method === 'rename' ? 'Modify' : 'Add'} success.`)

      if (method === 'rename') {
        this.contextTarget.name = value
      } else {
        this.$set(data, 'isLeaf', true)
        this.$refs[`${tar.orgId > 0 ? 'rankTree' : 'companyTree'}`].append(data, this.contextTarget)
      }
    }
  }
}
</script>
