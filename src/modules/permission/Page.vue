<template>
  <div class="va-body-container">
    <h3>page</h3>
    <el-button type="primary" @click="userPickerVisible = true">Choose</el-button>
    <user-picker :visible.sync="userPickerVisible" @on-change="onChooseUser"/>
  </div>
</template>

<script>
import UserPicker from '@/components/UserPicker'

export default {
  name: 'Page',
  components: { UserPicker },
  data() {
    return {
      userPickerVisible: false
    }
  },
  methods: {
    onChooseUser(user) {
      console.log(user)
    }
  }
}
</script>
