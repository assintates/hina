<template>
  <div class="ccardl">
    <div
      class="ccard-md"
      v-if="$vuetify.breakpoint.mdAndUp && !shadow"
      style="height: 16rem; width: 30rem;  border-radius: 5px; transition: all ease-in 300ms;"
      :style="`background: linear-gradient(289deg, ${hexToRgb(item.color[1], 0.4553571770505077)} 3%, ${hexToRgb(item.color[1], 0.010343171448266806)} 19%,   ${hexToRgb(item.color[0], 0.3699230033810399)} 80%, ${hexToRgb(item.color[0], 1)} 99%), url(https://proxy.ixil.cc/ren?width=500&height=400&method=cover&image=${album.thumb}) center center no-repeat; background-size: cover;`"
      v-ripple>
    </div>
    <div
      class="ccard-md"
      v-if="$vuetify.breakpoint.mdAndUp && shadow"
      style="height: 16rem; width: 30rem;  border-radius: 5px; transition: all ease-in 300ms; background-position: center center; background-size: 30rem 16rem; "
      :style="GetShadow() + `background-image: url(https://proxy.ixil.cc/ren?width=900&height=500&method=cover&image=${album.thumb}); `"
      v-ripple>
    </div>
    <div
      class="ccard-sm"
      v-if="$vuetify.breakpoint.smOnly"
      style="height: 10rem; width: 19rem;  border-radius: 5px;"
      :style="`background: linear-gradient(289deg, ${hexToRgb(item.color[1], 0.4553571770505077)} 3%, ${hexToRgb(item.color[1], 0.010343171448266806)} 19%,   ${hexToRgb(item.color[0], 0.3699230033810399)} 80%, ${hexToRgb(item.color[0], 1)} 99%), url(https://proxy.ixil.cc/ren?width=400&height=200&method=cover&image=${album.thumb}) right no-repeat; background-size: 19rem 10rem;`"
      v-ripple>
    </div>
    <div
      class="ccard-xs"
      v-if="$vuetify.breakpoint.xsOnly"
      style="height: 7rem; width: 11rem;  border-radius: 5px;"
      :style="`background: linear-gradient(300deg, ${hexToRgb(item.color[1], 0.4553571770505077)} 3%, ${hexToRgb(item.color[1], 0.010343171448266806)} 19%,   ${hexToRgb(item.color[0], 0.3699230033810399)} 80%, ${hexToRgb(item.color[0], 1)} 99%), url(https://proxy.ixil.cc/ren?width=200&height=150&method=cover&image=${album.thumb}) right no-repeat; background-size: 11rem 8rem`"
      v-ripple>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {

  name: 'ColorCard',

  props: {
    album: {
      type: Object,
      default: null
    },
    shadow: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      previous: 'n',
      item: {
        color: ['#fc1c64', '#f87a75', '#760624', '#974c4c', '#bc796e', '#5c3c34']
      }
    }
  },

  beforeMount() {  // Below code gets color palate of picture

  },

  mounted() {
    axios.get(`https://proxy.ixil.cc/color?image=${this.album.thumb}`)
      .then((res) => {
        this.item.color = res.data
      })
  },
  methods: {
    hexToRgb(hex, opacity) {
      return 'rgba(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length / 3 + '})', 'g')).map(function(l) {
        return parseInt(hex.length % 2 ? l + l : l, 16)
      }).concat(opacity || 1).join(',') + ')'
    },
    /**
     * @return {string}
     */
    GetShadow() {
      return `box-shadow:  0 1.9px 1.6px ${this.hexToRgb(this.item.color[0], 0.04)},  0 2.9px 3.9px ${this.hexToRgb(this.item.color[0], 0.14)},  0 3.0px 7.3px ${this.hexToRgb(this.item.color[0], 0.15)},  0 4px 13px ${this.hexToRgb(this.item.color[0], 0.15)},  0 5px 24.2px ${this.hexToRgb(this.item.color[0], 0.14)},  0 6px 38px ${this.hexToRgb(this.item.color[1], 0.07)};`
    }
  }
}
</script>

<style scoped>
.ccard-md:hover {
  transform: translateY(-1.5px) translateX(-1px);
}

.ccard-sm {

}

.ccard-xs {

}
</style>
