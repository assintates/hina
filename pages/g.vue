<template>
  <section class="container">
    <vue-plyr :options="options">
      <video
        controls
        crossorigin
        playsinline
        data-poster="http://proxy.ixil.cc/prox?image=https://www.mymypic.net/data/attachment/forum/202009/13/154847qkaknt11leedhlos.jpg"
      >
        <source v-for="(itemd, indexd) in videos"
                :key="indexd"
                :size="itemd.quality"
                :src="GetProxy(itemd.trap)"
                type="video/mp4"
        />
      </video>
    </vue-plyr>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'g',
  data() {
    return {}
  },
  asyncData({ params }) {
    return axios.get(`https://main-bloom-d-ltbdtk4j88hgmuxs-gtw.qovery.io/lia/functions/videos/phcdn?id=ph5f47b7e9d7fc0`)
      .then((res) => {
        return { videos: res.data }
      })
  },
  beforeMount() {
  },

  mounted() {
  },
  methods: {
    GetProxy(key) {
      return key.replace('https://dv.phncdn.com/', 'https://main-bloom-d-ltbdtk4j88hgmuxs-gtw.qovery.io/bpg/')
    }
  }
}
</script>

<style scoped>
.container {
  width: 30%;

  .video-player-box {
    min-height: 200px;
  }
}
</style>
