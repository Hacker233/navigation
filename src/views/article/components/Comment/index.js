import JuejinComment from './index.vue'

JuejinComment.install = function(Vue) {
  Vue.component(JuejinComment.name, JuejinComment)
}

if (typeof window !== 'undefined' && window.Vue) {
  JuejinComment.install(window.Vue)
}

export default JuejinComment
