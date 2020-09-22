<template>
  <div class="ccardl">
    <div
      class="ccard-md"
      v-if="$vuetify.breakpoint.mdAndUp"

      style="height: 16rem; width: 30rem;  border-radius: 5px;"
      :style="`background: linear-gradient(289deg, ${hexToRgb(album.color[1], 0.4553571770505077)} 3%, ${hexToRgb(album.color[1], 0.010343171448266806)} 19%,   ${hexToRgb(album.color[0], 0.3699230033810399)} 80%, ${hexToRgb(album.color[0], 1)} 99%), url(${album.thumb}) right no-repeat; background-size: cover`">
    </div>
    <div
      class="ccard-sm"
      v-if="$vuetify.breakpoint.smOnly"
      style="height: 10rem; width: 19rem;  border-radius: 5px;"
      :style="`background: linear-gradient(289deg, ${hexToRgb(album.color[1], 0.4553571770505077)} 3%, ${hexToRgb(album.color[1], 0.010343171448266806)} 19%,   ${hexToRgb(album.color[0], 0.3699230033810399)} 80%, ${hexToRgb(album.color[0], 1)} 99%), url(${album.thumb}) right no-repeat; background-size: 19rem 10rem;`">
    </div>
    <div
      class="ccard-xs"
      v-if="$vuetify.breakpoint.xsOnly"
      style="height: 7rem; width: 11rem;  border-radius: 5px;"
      :style="`background: linear-gradient(300deg, ${hexToRgb(album.color[1], 0.4553571770505077)} 3%, ${hexToRgb(album.color[1], 0.010343171448266806)} 19%,   ${hexToRgb(album.color[0], 0.3699230033810399)} 80%, ${hexToRgb(album.color[0], 1)} 99%), url(${album.thumb}) right no-repeat; background-size: 11rem 8rem`">
    </div>
  </div>
</template>

<script>
  export default {
    name: "ColorCard",

    props: {
      album: {
        type: Object,
        default: null
      }
    },

    data() {
      return {
        previous: 'n',
        item: {
          "id": "vMwxOLp7",
          "name": "曉美媽 – 惡墮★快感之牢 [33P]",
          "idol": "Unknown",
          "thumb": "https://www.mymypic.net/data/attachment/forum/threadcover/9f/8c/ae7cc7a2.jpg",
          "source": "www.jkforum.net",
          "color": ["#fc1c64","#f87a75","#760624","#974c4c","#bc796e","#5c3c34"]
        },
      }
    },

    beforeMount() {
      this.$axios.get(`https://api.ixil.cc/bloom/strat/color?image=${this.album.thumb}`)
        .then((res) => {
          this.album.color = res.data
        })
    },

    methods: {
      hexToRgb(hex, opacity) {
        return 'rgba(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16) }).concat(opacity||1).join(',') + ')';
      }
    }
  }
</script>

<style scoped>
</style>
