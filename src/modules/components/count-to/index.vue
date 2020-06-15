<template>
  <div class="va-body-container">
    <pre v-highlight><code class="html" v-html="$t('countTo.intro')"/></pre>
    <div class="text-center text-primary">
      <i-count-to
        ref="countToViewer"
        :start-val="+params.start"
        :end-val="+params.end"
        :duration="params.duration"
        :decimals="params.decimals"
        :separator="params.separator"
        :prefix="params.prefix"
        :suffix="params.suffix"
        :autoplay="true"
        class="va-count-up"
      />
    </div>
    <hr />
    <dl class="dl-horizontal" style="line-height: 32px;">
      <dt>{{ $t('countTo.params') }}</dt>
      <dd>
        <span class="form-params">
          <el-input v-model="params.start" type="number" size="small" style="width: 70px;" />
          Start
        </span>
        <span class="form-params">
          <el-button type="text" size="small" @click="handleSwap">
            <i class="el-icon-sort" style="transform: rotate(90deg);" />
          </el-button>
        </span>
        <span class="form-params">
          <el-input v-model="params.end" type="number" size="small" style="width: 70px;" />
          End
        </span>
        <span class="form-params">
          <el-input v-model="params.decimals" type="number" size="small" style="width: 70px;" />
          Decimals
        </span>
        <span class="form-params">
          <el-input v-model="params.duration" type="number" size="small" style="width: 70px;" />
          Duration
        </span>
      </dd>
      <dd>
        <span class="form-params">
          <el-checkbox v-model="params.easing">Use easing</el-checkbox>
        </span>
        <span class="form-params">
          <el-input v-model="params.separator" size="small" style="width: 70px;" />
          Separator
        </span>
        <span class="form-params">
          <el-input v-model="params.prefix" size="small" style="width: 70px;" />
          Prefix
        </span>
        <span class="form-params">
          <el-input v-model="params.suffix" size="small" style="width: 70px;" />
          Suffix
        </span>
      </dd>
    </dl>
    <hr />
    <dl class="dl-horizontal" style="line-height: 32px;">
      <dt>{{ $t('countTo.methods') }}</dt>
      <dd>
        <span class="form-params">
          <el-button type="primary" size="small" plain @click="handleStart">
            {{ $t('countTo.start') }}
          </el-button>
        </span>
        <span class="form-params">
          <el-button type="primary" size="small" plain @click="handlePauseResume">
            {{ $t('countTo.pauseResume') }}
          </el-button>
        </span>
        <span class="form-params">
          <el-button type="primary" size="small" plain @click="handleReset">
            {{ $t('countTo.reset') }}
          </el-button>
        </span>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ICountTo from 'vue-count-to';

@Component({ name: 'CountTo', components: { ICountTo } })
export default class extends Vue {
  // metaInfo: { title: 'CountTo' },
  params = {
    start: 0,
    end: 12580,
    duration: 2000,
    decimals: 2,
    decimal: '.',
    separator: ',',
    prefix: '$',
    suffix: '',
    easing: true,
  };
  paramsOrigin = {};

  created() {
    this.paramsOrigin = { ...this.params };
  }

  handleSwap() {
    const _temp = this.params.end;
    this.params.end = this.params.start;
    this.params.start = _temp;
  }
  handleStart() {
    (this.$refs['countToViewer'] as any).reset();
    (this.$refs['countToViewer'] as any).start(function () {
      console.log('Clicked start button');
    });
  }
  handlePauseResume() {
    (this.$refs['countToViewer'] as any).pauseResume();
  }
  handleReset() {
    (this.$refs['countToViewer'] as any).reset();
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/_variables';

.va-count-up {
  font-size: 11vw;
}
.form-params + .form-params {
  margin-left: $spacer-lg;
}
/deep/ .el-input__inner {
  padding: 0 $spacer-xs;
}
</style>
