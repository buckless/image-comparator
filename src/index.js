import ImageComparator from './ImageComparator.vue'

const Library = {
  install(Vue, options) {
    Vue.component('b-image-comparator', ImageComparator)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Library)
}

export { Library }
