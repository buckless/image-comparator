import BImageComparator from './ImageComparator.vue'

const ImageComparator = {
  install(Vue, options) {
    Vue.component('b-image-comparator', BImageComparator)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ImageComparator)
}

export { ImageComparator }
