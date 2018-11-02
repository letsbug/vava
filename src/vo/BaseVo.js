class BaseVo {
  constructor(props) {
    this.page = props.page || 1
    this.size = props.size || 10
    this.total = props.total || 0
  }
}

export default BaseVo
