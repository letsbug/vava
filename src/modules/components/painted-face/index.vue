<template>
  <el-row :gutter="15" class="va-body-container painted-face-demo">
    <el-col :span="18">
      <h5 class="va-body-title">
        {{ $t('router.paintedFace') }}
        <small class="text-muted">{{ subtitle }}</small>
      </h5>
      <div v-if="selected === 0" class="compare-content" v-html="history[selected].content"></div>
      <div v-else class="compare-content" v-html="compareResult"></div>
    </el-col>
    <el-col :span="6">
      <el-timeline>
        <el-timeline-item
          v-for="(ht, i) in history"
          :key="i"
          :color="selected > -1 ? (i === selected ? colorMap[ht.version] : colorMap[-1]) : colorMap[ht.version]"
          :icon="selected === i ? 'el-icon-check' : null"
          :timestamp="dateFormat(ht.timestamp, 'yyyy.MM.dd hh:mm:ss')"
          :class="{ checked: selected === i || selected === -1 }"
          placement="top"
          @click.native="selected = selected === i ? -1 : i"
        >
          <div>
            By: <strong>{{ ht.author }}</strong>
          </div>
          <div>
            Version: {{ ht.version + 1 }}
            <el-tag v-if="ht.version === 0" :type="i !== selected ? 'info' : ''" size="small">{{
              $i18n.locale === 'en' ? ' Initialize' : ' 初始版本'
            }}</el-tag>
            <el-tag v-if="ht.version === history.length - 1" :type="i !== selected ? 'info' : ''" size="small">{{
              $i18n.locale === 'en' ? ' Current' : ' 当前版本'
            }}</el-tag>
          </div>
        </el-timeline-item>
      </el-timeline>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { apiHistories } from '@/apis/painted-face';
import IPaintedFace from '@/vendor/painted-face';
import { parseDate } from '@/utils/datetime';
import { ITypePaintedFace } from '@/apis/types';

@Component({ name: 'PaintedFace' })
export default class extends Vue {
  private history: ITypePaintedFace[] = [];
  private compareResult: string = '';
  private colorMap: { [key: string]: string } = {
    '-1': '#e4e7ed',
    0: '#343a40',
    1: '#dc4371',
    2: '#dc4ab1',
    3: '#bf6bdc',
    4: '#b9a3fe',
    5: '#8596fe',
    6: '#489dfe',
    7: '#1ecafe',
    8: '#0cfecf',
    9: '#07fe7c',
    10: '#a0fe52',
    11: '#ecfeb5',
    12: '#fee439',
    13: '#feb280',
    14: '#fe7e46',
    15: '#fe6c08'
  };
  private selected: number = -1;

  private get subtitle() {
    return this.$i18n.locale === 'en'
      ? 'Rich text document history version comparison tool'
      : '富文本文档历史版本比对工具';
  }

  @Watch('selected')
  private onSelectedChange() {
    this.compare();
  }

  async mounted() {
    const id = 1;
    const { data } = (await apiHistories(id)) as any;

    if (!data || data.length < 1) {
      return;
    }
    this.history = data;
    this.compare();
  }

  private generator(raw: any) {
    const { fragment } = raw;
    let { type } = raw;
    type = type === '+' ? 'add' : type === '-' ? 'sub' : '';

    if (type !== 'add' && type !== 'sub') {
      return fragment;
    }

    const { mtime, user, version, lv } = raw;
    let result = '<span class="version-marker"';
    result += `oper-type="${type}" oper-time="${mtime}" oper-user="${user}" version="${version}" last-version="${lv}" style="`;
    result += type === 'add' ? `background-color: ${this.colorMap[raw.version]}` : `text-decoration: line-through`;
    result += `;">${raw.fragment}</span>`;

    return result;
  }

  private compare() {
    const selected = this.selected;
    if (selected === 0) {
      return;
    }

    const history =
      selected === -1 ? this.history : this.history.filter(v => +v.version === selected || +v.version === selected - 1);

    const paintedFace = new IPaintedFace({
      content: 'content',
      user: 'author',
      mtime: 'timestamp',
      initialVersion: 0
    });
    const compareResult = paintedFace.execute(history);
    let result = '';

    compareResult.forEach((str: any) => {
      result += this.generator(str);
    });

    this.compareResult = result;
  }

  private dateFormat = parseDate;
}
</script>

<style scoped lang="scss">
@import '~@/styles/_variables';

.painted-face-demo {
  height: 100%;
  line-height: 2;
}
.el-col {
  height: 100%;
  overflow-y: auto;
}
/deep/ {
  .el-timeline {
    padding-top: $spacer-xxs;
  }
  .el-timeline-item {
    cursor: pointer;

    .el-timeline-item__timestamp,
    .el-timeline-item__content {
      color: $color-gray-500;
      transition: color $transition-duration;
    }

    &.checked {
      .el-timeline-item__timestamp,
      .el-timeline-item__content {
        color: $color-text-primary;
      }
    }

    &:hover {
      .el-timeline-item__node {
        transform: scale3d(1.4, 1.4, 1.4);
        animation: ani-bounce--hover $transition-duration;
      }
    }
  }

  .el-timeline-item__node {
    transition: all, $transition-duration;
  }
}

.el-tag {
  margin-left: $spacer-sm;
}

[oper-type='sub'] {
  text-decoration: line-through;
}
</style>
