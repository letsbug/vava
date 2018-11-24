<template>
  <div>UserPicker</div>
</template>

<script>
import account from '@/services/account'

export default {
  name: 'UserPicker',
  data() {
    return {}
  },
  mounted() {
    account.list().then(res => {
      console.log(res)
    })
  }
}
</script>
