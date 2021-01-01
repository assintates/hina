<template>
  <video
    :width="width"
    :height="height"
    :controls="controls"
    :muted="muted"
    :poster="poster"
    @change="videoElementMouseOut($event)"
    @focus="videoElementMouseOut($event)"
    @load="videoElementMouseOut($event)"
    @mouseover="videoElementMouseHover($event)"
    @mouseout="videoElementMouseOut($event)"
    @touchstart="videoElementTouchStart($event)"
    @touchend="videoElementTouchEnd($event)"
  >
    <source
      :src="source"
      :type="type"
    >
  </video>
</template>

<script>
export default {
  name: 'img-preview',
  props: {
    source: {
      type: String,
      default: ''
    },
    poster: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'video/webm'
    },
    muted: {
      type: Boolean,
      default: true
    },
    controls: {
      type: Boolean,
      default: false
    },

    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    }
  },
  mounted() {
  },

  methods: {
    videoElementMouseHover(event) {
      event.target.load()
      event.target.play()
    },
    videoElementMouseOut(event) {
      event.target.load()
    },
    videoElementTouchStart(event) {
      event.target.load()
      event.target.play()
    },
    videoElementTouchEnd(event) {
      event.target.pause()
    }
  }
}
</script>
