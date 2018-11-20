class BaseVo {
  constructor(props) {
    /**
     * 当前页码
     * @type {*|number|string}
     */
    this.page = props.page || 1

    /**
     * 每页数据长度
     * @type {*|number}
     */
    this.size = props.size || 10

    /**
     * 数据总长度
     * @type {*|number}
     */
    this.total = props.total || 0
  }
}

export default BaseVo
