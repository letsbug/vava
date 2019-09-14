'use strict'

const fields = {}

const mergeRangeImpl = {
  '==': function(mergeResult, mergeIndex, compareResult, compareIndex) {
    const mergeRange = mergeResult[mergeIndex]
    const compareRange = compareResult.ranges[compareIndex]
    const mep2 = mergeRange.ep2
    const cep1 = compareRange.ep1
    if (mep2 > cep1) {
      const range1 = Object.assign({}, compareRange, {
        'user': mergeRange[fields.user],
        'version': mergeRange[fields.version],
        'lv': compareRange[fields.version] // lastversion
      })
      mergeResult.splice(mergeIndex, 1, range1)

      const length = compareRange.fragment.length
      const fragment = mergeRange.fragment.substr(length)
      const range2 = Object.assign({}, mergeRange, {
        'sp1': mergeRange.ep1 - fragment.length,
        'sp2': mergeRange.ep2 - fragment.length,
        'fragment': fragment
      })
      mergeResult.splice(mergeIndex + 1, 0, range2)
    } else {
      const length = mergeRange.fragment.length

      const range1 = Object.assign({}, compareRange, {
        'user': mergeRange[fields.user],
        'version': mergeRange[fields.version],
        'ep1': compareRange.sp1 + length,
        'ep2': compareRange.sp2 + length,
        'fragment': compareRange.fragment.substr(0, length),
        'lv': compareRange[fields.version] // lastversion
      })
      mergeResult.splice(mergeIndex, 1, range1)
      compareResult.ranges.splice(compareIndex, 1, Object.assign({}, range1))

      const range2 = Object.assign({}, compareRange, {
        'sp1': range1.ep1,
        'sp2': range1.ep2,
        'fragment': compareRange.fragment.substr(length)
      })

      if (range2.fragment.length > 0) {
        compareResult.ranges.splice(compareIndex + 1, 0, range2)
      }
    }
  },

  '=+': function(mergeResult, mergeIndex, compareResult, compareIndex) {
    // const mergeRange = mergeResult[mergeIndex]
    const compareRange = compareResult.ranges[compareIndex]
    const range = Object.assign({}, compareRange, {
      'lv': compareRange[fields.version] // lastversion
    })
    mergeResult.splice(mergeIndex, 0, range)
  },

  '=-': function(mergeResult, mergeIndex, compareResult, compareIndex) {
    const mergeRange = mergeResult[mergeIndex]
    const compareRange = compareResult.ranges[compareIndex]
    const mep2 = mergeRange.ep2
    const cep1 = compareRange.ep1
    if (mep2 > cep1) {
      const length = compareRange.fragment.length
      let offset = 0
      if (mergeRange[fields.version] !== fields.initialVersion) { // 非初始版本
        const range = Object.assign({}, mergeRange, {
          'ep1': mergeRange.sp1 + length,
          'ep2': mergeRange.sp2 + length,
          'fragment': compareRange.fragment
        })
        offset++
        mergeResult.splice(mergeIndex, 0, range)
      }

      const range1 = Object.assign({}, compareRange, {
        'version': mergeRange[fields.version],
        'lv': compareRange[fields.version] // lastversion
      })

      const fragment = mergeRange.fragment.substr(length)
      const range2 = Object.assign({}, mergeRange, {
        'sp1': mergeRange.ep1 - fragment.length,
        'sp2': mergeRange.ep2 - fragment.length,
        'fragment': fragment
      })

      mergeResult.splice(mergeIndex + offset, 1, range1, range2)
    } else {
      const length = mergeRange.fragment.length

      const range1 = Object.assign({}, compareRange, {
        'ep1': compareRange.sp1 + length,
        'ep2': compareRange.sp2,
        'fragment': mergeRange.fragment,
        'lv': compareRange[fields.version] // lastversion
      })
      mergeResult.splice(mergeIndex, 1, range1)
      compareResult.ranges.splice(compareIndex, 1, Object.assign({}, range1))

      const range2 = Object.assign({}, compareRange, {
        'sp1': range1.ep1,
        'sp2': range1.ep2,
        'fragment': compareRange.fragment.substr(length),
        'lv': compareRange[fields.version] // lastversion
      })

      if (range2.fragment.length > 0) {
        compareResult.ranges.splice(compareIndex + 1, 0, range2)
      }
    }
  },

  '+=': function(mergeResult, mergeIndex, compareResult, compareIndex) {
    const mergeRange = mergeResult[mergeIndex]
    const compareRange = compareResult.ranges[compareIndex]
    const mep2 = mergeRange.ep2
    const cep1 = compareRange.ep1
    if (mep2 > cep1) {
      const range1 = Object.assign({}, compareRange, {
        'type': '+',
        'ep1': compareRange.sp1,
        'user': mergeRange[fields.user],
        'version': mergeRange[fields.version],
        'lv': compareRange[fields.version] // lastversion
      })

      const length = compareRange.fragment.length
      const fragment = mergeRange.fragment.substr(length)
      const range2 = Object.assign({}, mergeRange, {
        'sp2': mergeRange.ep2 - fragment.length,
        'fragment': fragment
      })

      mergeResult.splice(mergeIndex, 1, range1, range2)
    } else {
      const length = mergeRange.fragment.length

      const range1 = Object.assign({}, compareRange, {
        'type': '+',
        'user': mergeRange[fields.user],
        'version': mergeRange[fields.version],
        'ep1': compareRange.sp1,
        'ep2': compareRange.sp2 + length,
        'fragment': mergeRange.fragment,
        'lv': compareRange[fields.version] // lastversion
      })
      mergeResult.splice(mergeIndex, 1, range1)
      compareResult.ranges.splice(compareIndex, 1, Object.assign({}, range1))

      const fragment = compareRange.fragment.substr(length)
      const range2 = Object.assign({}, compareRange, {
        'sp1': compareRange.ep1 - fragment.length,
        'sp2': compareRange.ep2 - fragment.length,
        'fragment': fragment
      })

      if (range2.fragment.length > 0) {
        compareResult.ranges.splice(compareIndex + 1, 0, range2)
      }
    }
  },

  '++': function(mergeResult, mergeIndex, compareResult, compareIndex) {
    // const mergeRange = mergeResult[mergeIndex]
    const compareRange = compareResult.ranges[compareIndex]
    const range = Object.assign({}, compareRange, {
      'lv': compareRange[fields.version] // lastversion
    })
    mergeResult.splice(mergeIndex, 0, range)
  },

  '+-': function(mergeResult, mergeIndex, compareResult, compareIndex) {
    const mergeRange = mergeResult[mergeIndex]
    const compareRange = compareResult.ranges[compareIndex]
    const mep2 = mergeRange.ep2
    const cep1 = compareRange.ep1
    if (mep2 > cep1) {
      const length = compareRange.fragment.length

      const range = Object.assign({}, mergeRange, {
        'ep1': mergeRange.sp1 + length,
        'ep2': mergeRange.sp2 + length,
        'fragment': compareRange.fragment
      })

      mergeResult.splice(mergeIndex, 0, range)

      const range1 = Object.assign({}, compareRange, {
        'lv': compareRange[fields.version] // lastversion
      })

      const fragment = mergeRange.fragment.substr(length)
      const range2 = Object.assign({}, mergeRange, {
        'user': mergeRange[fields.user],
        'version': mergeRange[fields.version],
        'sp1': mergeRange.ep1,
        'sp2': mergeRange.ep2 - fragment.length,
        'fragment': fragment
      })

      mergeResult.splice(mergeIndex + 1, 1, range1, range2)
    } else {
      const length = mergeRange.fragment.length

      const range1 = Object.assign({}, compareRange, {
        'ep1': compareRange.sp1 + length,
        'ep2': compareRange.sp2,
        'fragment': mergeRange.fragment,
        'lv': compareRange[fields.version] // lastversion
      })
      mergeResult.splice(mergeIndex + 1, 0, range1)
      compareResult.ranges.splice(compareIndex, 1, Object.assign({}, range1))

      const range2 = Object.assign({}, compareRange, {
        'sp1': range1.ep1,
        'sp2': range1.ep2,
        'fragment': compareRange.fragment.substr(length),
        'lv': compareRange[fields.version] // lastversion
      })

      if (range2.fragment.length > 0) {
        compareResult.ranges.splice(compareIndex + 1, 0, range2)
      }
    }
  }
}

class StringIndex {
  charValueIndex = {}
  sortedCharValue = []

  buildIndex(content) {
    const charValueIndex = this.charValueIndex = {} // {char1:{show:5, pos:10, index:[index1, index2....]},...}
    const sortedCharValue = this.sortedCharValue = [] // [char1,char2,...]

    for (let i = 0, length = content.length; i < length; i++) {
      const value = content[i]
      let item = charValueIndex[value]

      if (!item) {
        item = {
          show: 1,
          pos: sortedCharValue.length,
          index: [i]
        }
        charValueIndex[value] = item
        sortedCharValue.push(value)
        continue
      }

      item.show = item.show + 1
      item.index.push(i)

      this.reLocate(item.pos)
    }
  }

  reLocate(pos) {
    // current
    const charValueIndex = this.charValueIndex
    const sortedCharValue = this.sortedCharValue
    const value = sortedCharValue[pos]
    const item = charValueIndex[value]

    while (pos > 0) {
      pos--
      const preValue = sortedCharValue[pos]
      const preItem = charValueIndex[preValue]

      if (preItem.show >= item.show) {
        break
      }

      // swap
      sortedCharValue[pos] = value
      sortedCharValue[pos + 1] = preValue

      preItem.pos = pos + 1
      item.pos = pos
    }
  }
}

class PaintedFace {
  /**
   * 大花脸：文档比对工具、历史操作痕迹查找
   *
   * {
   *  @param content {String} The index name of the body field name
   *  @param version {String} The index name of the versoin field name
   *  @param mtime {String} The index name of the update time field name
   *  @param user {String} The index name of the author field name
   * }
   *
   * @param initialVersion {Number} Initial version number of the word
   */
  constructor({ content = 'content', version = 'version', mtime = 'mtime', user = 'user', initialVersion = 1 }) {
    // 元数据字段名索引
    fields.content = content
    fields.version = version
    fields.mtime = mtime
    fields.user = user
    fields.initialVersion = initialVersion

    // 在找到一个多长的匹配串时，则认为两个版本的的位置相匹配
    this.minMatchLength = 30

    // 相比比较内容的百分比，真实的最小匹配长度为：min(content长度*this.minMatchPercent,this.minMatchLength)
    this.minMatchPercent = 0.2

    // 当前比较的两个版本的索引信息
    this.leftIndex = null
    this.rightIndex = null
  }

  /**
   * 执行比对
   *
   * @param versions {Array} 版本历史列表
   * @returns {Array<Object>} 执行比对后的操作痕迹列表
   */
  execute(versions) {
    let compareResult; let mergeResult

    for (let i = 0, length = versions.length - 1; i < length; i++) {
      compareResult = this.compare(versions[i], versions[i + 1])
      mergeResult = this.merge(mergeResult, compareResult)
    }

    return mergeResult
  }

  findEqualRange(leftContent, leftPos, rightContent, rightPos) {
    const len1 = leftContent.length
    const len2 = rightContent.length

    // next direction
    let ep1 = leftPos; let ep2 = rightPos

    while (ep1 < len1 && ep2 < len2) {
      if (leftContent[ep1] !== rightContent[ep2]) {
        break
      }
      ep1++
      ep2++
    }

    return { sp1: leftPos, ep1: ep1, sp2: rightPos, ep2: ep2 }
  }

  findAvailableRange(leftContent, leftPos, rightContent, rightPos, stringIndex) {
    const tmpChar = leftContent[leftPos]
    const rightIndexItem = stringIndex.charValueIndex[tmpChar]

    // 右边不存在该字符，则肯定找不到，直接退出
    if (!rightIndexItem) {
      return null
    }

    // 兼容更短内容的版本比较，如：对标题进行比较，标题一般10-20个字
    // 故每次比较的最小长度为当前长度的一个比例与设定的最小长度中更小值
    let minMatchLength = Math.floor((leftContent.length - leftPos) * this.minMatchPercent)
    minMatchLength = Math.max(Math.min(minMatchLength, this.minMatchLength), 1)

    const rightPoss = rightIndexItem.index
    for (let i = 0, length = rightPoss.length; i < length; i++) {
      if (rightPoss[i] < rightPos) { // 排除之前已经处理过的内容
        continue
      }

      const range = this.findEqualRange(leftContent, leftPos, rightContent, rightPoss[i])

      if (range.ep1 - range.sp1 > minMatchLength) {
        return range
      }
    }

    return null
  }

  findMatchedRange(leftContent, leftPos, rightContent, rightPos) {
    // 从左侧取一个字符，去右边的内容中进行查找
    let range = this.findAvailableRange(leftContent, leftPos, rightContent, rightPos, this.rightIndex)
    if (range) {
      return range
    }

    // 从右侧取一个字符，去左边的内容中进行查找，参数调换位置，这样可以调用同一个接口
    range = this.findAvailableRange(rightContent, rightPos, leftContent, leftPos, this.leftIndex)
    if (range) {
      return {
        sp1: range.sp2,
        ep1: range.ep2,
        sp2: range.sp1,
        ep2: range.ep1
      }
    }

    range = this.findEqualRange(leftContent, leftPos, rightContent, rightPos)

    if (range.sp1 !== range.ep1) { // 相等但长度没有得到指标
      return range
    }

    return null
  }

  initMergeResult(compareResult) {
    const mergeResult = []
    const leftVersion = compareResult.left
    const rightVersion = compareResult.right
    const compareRanges = compareResult.ranges

    for (let i = 0, length = compareRanges.length; i < length; i++) {
      const compareRange = compareRanges[i]
      const versionObj = compareRange.type === '+' ? rightVersion : leftVersion
      const itemRange = Object.assign({}, compareRange, {
        'version': versionObj.version,
        'lv': rightVersion.version // 最近的版本lastversion
      })

      mergeResult.push(itemRange)
    }

    return mergeResult
  }

  mergeRange(mergeResult, compareResult, compareIndex) {
    const compareRange = compareResult.ranges[compareIndex]

    // find mergeIndex
    // 存在修改模式的情况，而此时比较的索引位不变。
    let mergeIndex = this.mergeIndex || 0

    for (; mergeIndex < mergeResult.length; mergeIndex++) {
      const mergeRange = mergeResult[mergeIndex]

      // 删除的内容，对后面的版本不可见，故可以直接忽略
      if (mergeRange.type === '-') {
        continue
      }

      // 非相邻版本，可以直接忽略，compareRange仅和相邻的前一个版本进行比较
      if (compareRange.version - mergeRange.lv !== 1) {
        continue
      }

      if (mergeRange.sp2 === compareRange.sp1) {
        break
      }
    }

    this.mergeIndex = mergeIndex
    if (mergeIndex >= mergeResult.length) {
      mergeResult.push(Object.assign({}, compareRange, {
        'lv': compareRange.version // 最近的版本lastversion
      }))
      return
    }

    const method = mergeResult[mergeIndex].type + compareRange.type
    mergeRangeImpl[method].call(this, mergeResult, mergeIndex, compareResult, compareIndex)
  }

  merge(mergeResult, compareResult) {
    // 第一个版本比较结果，直接从compareResult获取merge结果
    if (!mergeResult) {
      return this.initMergeResult(compareResult)
    }

    this.mergeIndex = 0
    const compareRanges = compareResult.ranges
    for (let i = 0; i < compareRanges.length; i++) {
      this.mergeRange(mergeResult, compareResult, i)
    }

    return mergeResult
  }

  compare(leftVersion, rightVersion) {
    const ranges = []

    // 对左侧字符串进行索引
    if (this.rightIndex) { // 直接使用前一次的右侧索引，避免重复计算
      this.leftIndex = this.rightIndex
    } else {
      const leftIndex = new StringIndex()
      leftIndex.buildIndex(leftVersion[fields.content])
      this.leftIndex = leftIndex
    }

    // 对右侧字符串进行索引
    const rightIndex = new StringIndex()
    rightIndex.buildIndex(rightVersion[fields.content])
    this.rightIndex = rightIndex

    const leftContent = leftVersion[fields.content]
    const len1 = leftContent.length

    const rightContent = rightVersion[fields.content]
    const len2 = rightContent.length

    let leftPos = 0; let rightPos = 0
    let modifyLeftPos = -1; let modifyRightPos = -1

    while (leftPos < len1 && rightPos < len2) {
      // 找到当前左右两个位置匹配的区域片段
      const range = this.findMatchedRange(leftContent, leftPos, rightContent, rightPos)

      if (!range) { // 修改模式；左右都找不到，说明左侧内容被删除，同时又添加了新内容
        if (modifyLeftPos === -1) { // 记录开始位置
          modifyLeftPos = leftPos
          modifyRightPos = rightPos
        }

        leftPos++
        rightPos++
        continue
      }

      if (modifyLeftPos !== -1) { // 修改模式中的删除
        ranges.push({
          type: '-',
          sp1: modifyLeftPos,
          ep1: leftPos,
          sp2: modifyRightPos,
          ep2: modifyRightPos,
          user: rightVersion[fields.user],
          mtime: rightVersion[fields.mtime],
          version: rightVersion[fields.version],
          fragment: leftContent.substring(modifyLeftPos, leftPos)
        })
        modifyLeftPos = -1
      }

      if (leftPos !== range.sp1 && rightPos === range.sp2) { // 普通删除
        ranges.push({
          type: '-',
          sp1: leftPos,
          ep1: range.sp1,
          sp2: modifyRightPos !== -1 ? modifyRightPos : rightPos,
          ep2: modifyRightPos !== -1 ? modifyRightPos : rightPos,
          user: rightVersion[fields.user],
          mtime: rightVersion[fields.mtime],
          version: rightVersion[fields.version],
          fragment: leftContent.substring(leftPos, range.sp1)
        })
      }

      if (modifyRightPos !== -1) { // 修改模式中的新增
        // 修复相同的内容先删除后增加
        const fragment = rightContent.substring(modifyRightPos, rightPos)
        let pre = ranges[ranges.length - 1]
        let sameIndex = -1

        if (sameIndex === -1) {
          pre = ranges[ranges.length - 2]
          if (pre && pre.type === '-' && pre.fragement === fragment) {
            sameIndex = ranges.length - 2
          }
        }

        ranges.push({
          type: '+',
          sp1: range.sp1,
          ep1: range.sp1,
          sp2: modifyRightPos,
          ep2: rightPos,
          user: rightVersion[fields.user],
          mtime: rightVersion[fields.mtime],
          version: rightVersion[fields.version],
          fragment: fragment
        })
        modifyRightPos = -1
      }

      if (leftPos === range.sp1 && rightPos !== range.sp2) { // 普通增加
        ranges.push({
          type: '+',
          sp1: leftPos,
          ep1: leftPos,
          sp2: rightPos,
          ep2: range.sp2,
          user: rightVersion[fields.user],
          mtime: rightVersion[fields.mtime],
          version: rightVersion[fields.version],
          fragment: rightContent.substring(rightPos, range.sp2)
        })
      }

      if (leftPos === range.sp1 && rightPos === range.sp2) { // 相等
        range.type = '='
        range.user = rightVersion[fields.user]
        range.mtime = rightVersion[fields.mtime]
        range.version = rightVersion[fields.version]
        range.fragment = leftContent.substring(range.sp1, range.ep1)
        ranges.push(range)
        leftPos = range.ep1
        rightPos = range.ep2
        continue
      }

      if (leftPos === range.sp1) { // 普通增加的相等处理
        range.type = '='
        range.user = rightVersion[fields.user]
        range.mtime = rightVersion[fields.mtime]
        range.version = rightVersion[fields.version]
        range.fragment = leftContent.substring(leftPos, range.ep1)
        ranges.push(range)
        leftPos = range.ep1
        rightPos = range.ep2
        continue
      }

      if (rightPos === range.sp2) { // 普通删除的相等处理
        range.type = '='
        range.user = rightVersion[fields.user]
        range.mtime = rightVersion[fields.mtime]
        range.version = rightVersion[fields.version]
        range.fragment = rightContent.substring(rightPos, range.ep2)
        ranges.push(range)
        leftPos = range.ep1
        rightPos = range.ep2
        continue
      }

      break
    }

    if (modifyLeftPos !== -1) { // 修改模式中的删除
      ranges.push({
        type: '-',
        sp1: modifyLeftPos,
        ep1: leftPos,
        sp2: modifyRightPos,
        ep2: modifyRightPos,
        user: rightVersion[fields.user],
        mtime: rightVersion[fields.mtime],
        version: rightVersion[fields.version],
        fragment: leftContent.substring(modifyLeftPos, leftPos)
      })
      modifyLeftPos = -1
    }

    if (leftPos < len1) {
      ranges.push({
        type: '-',
        sp1: leftPos,
        ep1: len1,
        sp2: len2,
        ep2: len2,
        user: rightVersion[fields.user],
        mtime: rightVersion[fields.mtime],
        version: rightVersion[fields.version],
        fragment: leftContent.substring(leftPos)
      })
    }

    if (modifyRightPos !== -1) { // 修改模式中的新增
      ranges.push({
        type: '+',
        sp1: leftPos,
        ep1: leftPos,
        sp2: modifyRightPos,
        ep2: rightPos,
        user: rightVersion[fields.user],
        mtime: rightVersion[fields.mtime],
        version: rightVersion[fields.version],
        fragment: rightContent.substring(modifyRightPos, rightPos)
      })
      modifyRightPos = -1
    }

    if (rightPos < len2) {
      ranges.push({
        type: '+',
        sp1: len1,
        ep1: len1,
        sp2: rightPos,
        ep2: len2,
        user: rightVersion[fields.user],
        mtime: rightVersion[fields.mtime],
        version: rightVersion[fields.version],
        fragment: rightContent.substring(rightPos)
      })
    }

    return {
      ranges: ranges,
      left: leftVersion,
      right: rightVersion
    }
  }
}

export default PaintedFace
