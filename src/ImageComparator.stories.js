import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import ImageComparator from './ImageComparator.vue'

const stories = storiesOf('ImageComparator', module)

const Simple = Vue.component('story-simple', {
  components: { ImageComparator },
  methods: { action },
  template: `
    <image-comparator
      image1="http://via.placeholder.com/500x500"
      image2="https://i.imgur.com/lqBfukG.jpg"/>
  `
})

stories.add('simple', () => Simple)
