<template>
  <v-col justify="space-between" style="overflow-x: hidden">
    <home-promotion-list class="pt-2 pb-5" />

    <h1 v-if="$vuetify.breakpoint.smAndUp" class="pb-3"
        style="-webkit-touch-callout: none; -webkit-user-select: none; user-select: none; font-size: 4rem; text-align: center;  background: linear-gradient(#eee, #333);  -webkit-background-clip: text;  -webkit-text-fill-color: transparent;">
      From Hina</h1>
    <h1 v-if="$vuetify.breakpoint.xsOnly" class="pb-3"
        style="-webkit-touch-callout: none; -webkit-user-select: none; user-select: none; font-size: 2.5rem; text-align: center;  background: linear-gradient(#eee, #333);  -webkit-background-clip: text;  -webkit-text-fill-color: transparent;">
      From Hina</h1>
    <color-card-list v-if="itemsn.length > 0" :items="itemsn" link="/sagasu" name="New Albums" class="pt-3 pb-6" />
    <v-parallax class=""
                :src="`https://proxy.ixil.cc/prox?image=`+itemsd.gliphs[0]"
                style="width: 100%; height: fit-content;">
      <div>
        <color-card-list :data="itemsd.gliphs" :artist="itemsd.idol" :source="itemsd.source" :image="itemsd.thumb"
                         :parax="true" :iid="itemsd.id" :name="itemsd.source" class="" />
      </div>
    </v-parallax>
    <color-card-list v-if="itemsu.length > 0" :items="itemsu" :showmore="false" name="Picks" class="pt-10 pb-5" />
    <color-card-list v-if="itemsa.length > 0" :items="itemsa" :showmore="false" name="AI 4x Albums" class="pb-5" />
  </v-col>
</template>

<script>
import axios from 'axios'
import ColorCard from '../layouts/Cards/ColorCard'
import ColorCardList from '../layouts/Lists/ColorCardList'
import HomePromote from '../layouts/Carousel/HomePromote'
import HomePromotionList from '../layouts/Lists/HomePromotionList'

export default {
  components: {
    HomePromotionList,
    HomePromote,
    ColorCardList,
    ColorCard
  },
  data() {
    return {


      itemsn: [],
      itemsu: [],
      itemsa: []
    }
  },

  asyncData({ params }) {
    return axios.get(`https://app.ixil.cc/api/bloom/hina/random`)
      .then((res) => {
        return { itemsd: res.data }
      })
  },
  mounted() {
    axios.get(`https://app.ixil.cc/api/bloom/hina?page=1&op=16`)
      .then((res) => {
        this.itemsn = res.data.data
      })
    axios.get(`https://app.ixil.cc/api/bloom/hina/random?many=true`)
      .then((res) => {
        this.itemsu = res.data
      })
    axios.get(`https://app.ixil.cc/api/bloom/hina/pollen/feed?random=true`)
      .then((res) => {
        this.itemsa = res.data.data
      })

  },
  methods: {}
}
</script>
