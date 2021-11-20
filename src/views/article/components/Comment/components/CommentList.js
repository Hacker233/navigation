export default {
  props: {
    sub: {
      type: Boolean,
      default: false
    }
  },
  render(h) {
    const className = this.sub ? 'sub-comment-list' : 'comment-list'
    return h('div', { class: className }, this.$slots.default)
  }
}
