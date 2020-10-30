<template>
  <div style="overflow: hidden;">
    <section>
      <v-col justify="space-between">
        <h1 v-if="$vuetify.breakpoint.smAndUp" class="pb-3"
            style="-webkit-touch-callout: none; -webkit-user-select: none; user-select: none; font-size: 4rem; text-align: center;  background: linear-gradient(#eee, #333);  -webkit-background-clip: text;  -webkit-text-fill-color: transparent;">
          From Sources</h1>
        <h1 v-if="$vuetify.breakpoint.xsOnly" class="pb-3"
            style="-webkit-touch-callout: none; -webkit-user-select: none; user-select: none; font-size: 2.5rem; text-align: center;  background: linear-gradient(#eee, #333);  -webkit-background-clip: text;  -webkit-text-fill-color: transparent;">
          From Sources</h1>
        <!-- Small Screen and Above -->
        <v-row v-if="$vuetify.breakpoint.smAndUp" style="height: 37rem; overflow: hidden;" justify="space-between">
          <div v-for="(item, i) in items"
               :key="i">
            <home-promote style="padding-bottom: 5rem" :data="item" />
          </div>
        </v-row>
        <!-- END Small Screen and Above -->


        <!-- extra Small Screen -->
        <v-row v-if="$vuetify.breakpoint.xsOnly" style="height: 28rem; overflow: hidden;" justify="space-between">
          <div v-for="(item, i) in items"
               :key="i">
            <home-promote style="padding-bottom: 3rem" :data="item" />
          </div>
        </v-row>
        <!-- END  extra Small Screen -->

      </v-col>
    </section>
  </div>
</template>

<script>
import HomePromote from '../Carousel/HomePromote'
import VueHorizontalList from 'vue-horizontal-list'
import axios from 'axios'


export default {
  name: 'HomePromotionList',
  components: { HomePromote },
  data() {
    return {
      options: {
        responsive: [
          { end: 546, size: 2 },
          { start: 530, end: 673, size: 2 },
          { start: 673, end: 817, size: 2 },
          { start: 817, end: 823, size: 2 },
          { start: 823, end: 1452, size: 2 },
          { start: 1452, end: 2352, size: 3 },
          { start: 1452, end: 2452, size: 4 },
          { start: 2452, size: 5 }
        ],
        list: {
          // 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
          windowed: 1200,

          // Because: #app {padding: 80px 24px;}
          padding: 0
        },
        item: {
          // css class to inject into each individual item
          class: 'ccardl',
          // padding between each item
          padding: 23
        },
        navigation: {
          // when to show navigation
          start: 1025,
          color: '#000'
        }
      },

      items: []
    }
  },

  mounted() {
    axios.get(`https://api.ixil.cc/bloom/hina/random?many=true`)
      .then((res) => {
        this.items = res.data
      })
  }
}
</script>

<style scoped>

</style>
