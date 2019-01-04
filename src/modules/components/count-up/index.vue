<template>
  <div class="va-body-container">
    <div class="text-center text-primary">
      <i-count-up
        ref="countUpViewer"
        :start-val="params.start" :end-val="params.end" :decimals="params.decimals" :duration="params.duration"
        :options="options" class="va-count-up" @ready="onReady"
      />
    </div>
    <hr />
    <el-form inline :model="paramsForm" size="small">
      <el-form-item label="Params: " style="margin: 0;">
        <span class="form-params"><el-input v-model="paramsForm.start" type="number" style="width: 70px;" /> Start</span>
        <span class="form-params"><el-button type="primary" plain>Swap</el-button></span>
        <span class="form-params"><el-input v-model="paramsForm.end" type="number" style="width: 70px;" /> End</span>
        <span class="form-params"><el-input v-model="paramsForm.decimals" style="width: 50px;" /> Decimals</span>
        <span class="form-params"><el-input v-model="paramsForm.duration" style="width: 50px;" /> Duration</span>
      </el-form-item>
    </el-form>
    <hr />
    <el-form inline :model="optionsForm" size="small">
      <el-form-item label="Options: " style="margin: 0;">
        <span class="form-params"><el-checkbox v-model="optionsForm.easing">Use easing</el-checkbox></span>
        <span class="form-params"><el-checkbox v-model="optionsForm.grouping">Use grouping</el-checkbox></span>
        <span class="form-params"><el-input v-model="optionsForm.separator" style="width: 43px;" /> Separator</span>
        <span class="form-params"><el-input v-model="optionsForm.prefix" style="width: 43px;" /> Prefix</span>
        <span class="form-params"><el-input v-model="optionsForm.suffix" style="width: 43px;" /> Suffix</span>
      </el-form-item>
    </el-form>
    <hr />
    <el-form inline :model="paramsForm" size="small">
      <el-form-item label="Methods: " style="margin: 0;">
        <span class="form-params">
          <el-button type="primary" plain @click="handleStart">Start</el-button>
        </span>
        <span class="form-params">
          <el-button type="primary" plain @click="handlePauseResume">Pause/Resume</el-button>
        </span>
        <span class="form-params">
          <el-button type="primary" plain @click="handleReset">Reset</el-button>
        </span>
        <span class="form-params">
          <el-input v-model="paramsForm.end" style="width: 70px; vertical-align: top;" />
          <el-button type="primary" plain @click="handleUpdate">Update</el-button>
        </span>
        <span class="form-params">
          <el-checkbox v-model="paramsForm.alert" type="primary">Alert on complete</el-checkbox>
        </span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ICountUp from 'vue-countup-v2'

export default {
  name: 'CountUp',
  metaInfo: {
    title: 'CountUp'
  },
  components: { ICountUp },
  data() {
    return {
      params: {},
      options: {},
      paramsOrigin: { start: 0, end: 12580, decimals: 2, duration: 2, alert: false },
      paramsForm: {},
      optionsForm: { easing: true, grouping: true, separator: ',', decimal: '.', prefix: '$', suffix: '' }
    }
  },
  created() {
    this.paramsForm = { ...this.paramsOrigin }
    this.params = { ...this.paramsForm }
    this.options = { ...this.optionsForm }
  },
  methods: {
    handleStart() {
      this.$refs['countUpViewer'].reset()
      this.params = { ...this.paramsForm }
      this.params.start = +this.params.start
      this.params.end = +this.params.end
      this.$refs['countUpViewer'].start(function() {
        console.log('Clicked start button')
      })
    },
    handlePauseResume() {
      this.$refs['countUpViewer'].pauseResume()
    },
    handleReset() {
      this.$refs['countUpViewer'].reset()
      this.paramsForm = { ...this.params }
    },
    handleUpdate() {
      this.params = { ...this.paramsForm }
      this.$refs['countUpViewer'].update()
    },
    onReady(instance, CountUp) {
      console.log(instance, CountUp)
      if (this.paramsForm.alert) this.$alert('CountUp is completed.')
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

.va-count-up {
  font-size: 12vw;
}
.form-params + .form-params {
  margin-left: $spacer-lg;
}
/deep/ .el-input__inner {
  padding: 0 $spacer-xs;
}
</style>
