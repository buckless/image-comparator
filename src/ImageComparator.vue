<template>
  <div class="b-image-comparator" :class="dark" @mousemove.passive="move" @touchmove.passive="move">
    <div class="b-image-comparator__image">
      <img :src="image1" @load="update" />
    </div>
    <div class="b-image-comparator__image b-image-comparator__image-last" :style="clip" ref="image-2">
      <img :src="image2" />
    </div>
    <div class="b-image-comparator__slider" :style="handle" @mousedown="down" @touchstart="down" @mouseup="up" @touchend="up">
      <div class="b-image-comparator__slider__arrow"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialValue: {
      type: Number,
      default: 0.3
    },

    darkMode: {
      type: Boolean,
      default: false
    },

    image1: {
      type: String,
      required: true
    },

    image2: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      value: this.initialValue,
      dragging: false,
      width: 0,
      height: 0,
      left: 0
    }
  },

  computed: {
    dark() {
      return this.darkMode ? 'b-image-comparator--dark' : ''
    },

    clip() {
      return {
        clip: `rect(0px, ${this.value * this.width}px, ${this.height}px, 0px)`
      }
    },

    handle() {
      return {
        left: `${this.value * this.width}px`
      }
    }
  },

  methods: {
    update() {
      this.width = this.$el.getBoundingClientRect().width
      this.height = this.$el.getBoundingClientRect().height
      this.left = this.$el.getBoundingClientRect().left
    },

    down() {
      this.dragging = true
    },

    up() {
      this.dragging = false
    },

    move(e) {
      if (!this.dragging) {
        return
      }

      const left = (e.touches && e.touches[0]) ? e.touches[0].pageX : e.x

      let value = (left - this.left) / this.width
      value = Math.min(1, value)
      value = Math.max(0, value)

      this.value = value
    },
  },

  mounted() {
    window.addEventListener('resize', () => {
      requestAnimationFrame(() => this.update())
    }, { passive: true })

    this.left = this.$el.getBoundingClientRect().left
  }
}
</script>

<style>
.b-image-comparator {
  display: inline-flex;
  position: relative;
  overflow: hidden;
}

.b-image-comparator__image {
  pointer-events: none;
  user-select: none;
}

.b-image-comparator__image > img {
  max-width: 100%;
}

.b-image-comparator__image-last {
  position: absolute;
  top: 0;
  left: 0;
}

.b-image-comparator__slider {
  height: 38px;
  width: 38px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -22px;
  margin-top: -22px;
  border: 3px solid white;
  background-color: rgba(255,255,255,.4);
  cursor: pointer;
  border-radius: 100%;
  box-shadow: 0px 0px 12px rgba(0,0,0,.12);
  z-index: 40;
}

.b-image-comparator__slider:before {
  content: '';
  position: absolute;
  top: -10000px;
  height: 9997px;
  width: 4px;
  left: 50%;
  margin-left: -2px;
  background-color: #fff;
}

.b-image-comparator__slider:after {
  content: '';
  position: absolute;
  bottom: -10000px;
  height: 9997px;
  width: 4px;
  left: 50%;
  margin-left: -2px;
  background-color: #fff;
}

.b-image-comparator__slider__arrow {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 4px;
  background-color: #fff;
  width: 20px;
  transform: translate(-50%, -50%);
}

.b-image-comparator__slider__arrow:after {
  content: '';
  width: 0;
  height: 0;
  border: 6px inset transparent;
  position: absolute;
  top: 50%;
  margin-top: -6px;
  border-right: 6px solid white;
  left: 50%;
  margin-left: -18px;
}

.b-image-comparator__slider__arrow:before {
  content: '';
  width: 0;
  height: 0;
  border: 6px inset transparent;
  position: absolute;
  top: 50%;
  margin-top: -6px;
  border-left: 6px solid white;
  right: 50%;
  margin-right: -18px;
}

.b-image-comparator--dark .b-image-comparator__slider__arrow,
.b-image-comparator--dark .b-image-comparator__slider:before,
.b-image-comparator--dark .b-image-comparator__slider:after {
  background-color: #444;
}

.b-image-comparator--dark .b-image-comparator__slider {
  border-color: #444;
}

.b-image-comparator--dark .b-image-comparator__slider__arrow:after {
  border-right-color: #444;
}

.b-image-comparator--dark .b-image-comparator__slider__arrow:before {
  border-left-color: #444;
}
</style>
