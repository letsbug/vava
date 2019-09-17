<template>
  <el-row :gutter="15" class="va-body-container painted-face-demo">
    <el-col :span="18">
      <div v-if="selected === 0" class="compare-content" v-html="history[selected].word"></div>
      <div v-else class="compare-content" v-html="compareResult"></div>
    </el-col>
    <el-col :span="6">
      <el-timeline>
        <el-timeline-item
          v-for="(ht, i) in history"
          :key="i"
          :color="selected > -1 ? i === selected ? colorMap[ht.version] : colorMap[-1] : colorMap[ht.version]"
          :icon="selected === i ? 'el-icon-check': null"
          :timestamp="dateFormat(ht.mtime, 'yyyy.MM.dd hh:mm:ss')"
          :class="{ 'checked': selected === i || selected === -1 }"
          placement="top"
          @click.native="selected = selected === i ? -1 : i"
        >
          <div>By: <strong>{{ ht.user }}</strong></div>
          <div>Version: {{ ht.version + 1 }}</div>
        </el-timeline-item>
      </el-timeline>
    </el-col>
  </el-row>
</template>

<script>
import { histories } from '@/apis/paintedFace'
import PaintedFace from '@/vendor/painted-face'
import { dateFormat } from '@/tools/_dater'

export default {
  name: 'PaintedFace',
  data() {
    return {
      history: [],
      compareResult: '',
      colorMap: {
        '-1': '#e4e7ed',
        0: '#343a40',
        1: '#dc4371',
        2: '#dc9599',
        3: '#dc4ab1',
        4: '#bf6bdc',
        5: '#b9a3fe',
        6: '#8596fe',
        7: '#489dfe',
        8: '#1ecafe',
        9: '#0cfecf',
        10: '#07fe7c',
        11: '#a0fe52',
        12: '#ecfeb5',
        13: '#fee439',
        14: '#feb280',
        15: '#fe7e46',
        16: '#fe6c08'
      },
      selected: -1
    }
  },
  watch: {
    selected() {
      this.compare()
    }
  },
  async mounted() {
    this.history = await histories()

    this.compare()
  },
  methods: {
    generator(raw) {
      const { fragment } = raw
      let { type } = raw
      type = type === '+' ? 'add' : type === '-' ? 'sub' : ''

      if (type !== 'add' && type !== 'sub') {
        return fragment
      }

      const { mtime, user, version, lv } = raw
      let result = '<span class="version-marker"'
      result += `oper-type="${type}" oper-time="${mtime}" oper-user="${user}" version="${version}" last-version="${lv}" style="`
      result += type === 'add'
        ? `background-color: ${this.colorMap[raw.version]}`
        : `text-decoration: line-through`
      result += `;">${raw.fragment}</span>`

      return result
    },
    compare() {
      const selected = this.selected
      if (selected === 0) {
        return
      }

      const history = selected === -1
        ? this.history
        : this.history.filter(v => (+v.version === selected || +v.version === selected - 1))

      const paintedFace = new PaintedFace({ content: 'word', initialVersion: 0 })
      const compareResult = paintedFace.execute(history)
      let result = ''

      compareResult.forEach(str => {
        result += this.generator(str)
      })

      this.compareResult = result
    },
    dateFormat
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/_variables";

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

[oper-type=sub] {
  text-decoration: line-through;
}
</style>
