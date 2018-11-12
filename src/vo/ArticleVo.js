class ArticleVo {
  constructor(props) {
    /**
     * 文章ID
     * @type {number}
     */
    this.id = props.id

    /**
     * 发布时间
     * @type {date}
     */
    this.timestamp = props.timestamp

    /**
     * 文章作者
     * @type {string}
     */
    this.author = props.author

    /**
     * 审核者
     */
    this.auditor = props.auditor

    /**
     * 文章标题
     * @type {string}
     */
    this.title = props.title

    /**
     * 文章概览
     * @type {string}
     */
    this.summery = props.summery

    /**
     * 文章正文
     * @type {string}
     */
    this.content = props.content

    /**
     * 置顶等级 1-5
     * @type {number}
     */
    if (props.level < 1 || props.level > 5) throw new Error('The props \'level\' must between 1 and 5.')
    this.level = props.level

    /**
     * 文章状态 ['draft', 'committed', 'failing', 'published', 'audited', 'deleted']
     * @type {string}
     */
    this.status = props.status

    /**
     * 发布时间
     * @type {date}
     */
    this.display = props.display

    /**
     * 浏览量
     * @type {number}
     */
    this.pv = props.pv
  }
}

export default ArticleVo
