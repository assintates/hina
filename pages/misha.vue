<template>
  <v-col justify="space-between" style="overflow-x: hidden">
    <h1 v-if="$vuetify.breakpoint.smAndUp" class="pb-9"
        style="-webkit-touch-callout: none; -webkit-user-select: none; user-select: none; font-size: 4rem; text-align: center;  background: linear-gradient(#eee, #333);  -webkit-background-clip: text;  -webkit-text-fill-color: transparent;">
      Welcome to Misha</h1>
    <h1 v-if="$vuetify.breakpoint.xsOnly" class="pb-9"
        style="-webkit-touch-callout: none; -webkit-user-select: none; user-select: none; font-size: 2.5rem; text-align: center;  background: linear-gradient(#eee, #333);  -webkit-background-clip: text;  -webkit-text-fill-color: transparent;">
      Welcome to Misha</h1>
    <v-parallax class=""
                :src="itemsp.thumb[4]"
                style="width: 100%; height: fit-content;">
      <div>
        <color-card-list :data="itemsp.thumb" :artist="itemsp.name" prefix="i" source="Instagram"
                         :image="itemsp.thumb[1]"
                         :parax="true" :iid="itemsp.id" name="Instagram" class="" />
      </div>
    </v-parallax>
    <color-card-list v-if="itemsa !== null" :items="itemsa" prefix="i" :showmore="false" name="Random"
                     class="pt-12 pb-9" />
    <v-parallax class=""
                :src="itemsd.thumb[1]"
                style="width: 100%; height: fit-content;">
      <div>
        <color-card-list :data="itemsd.thumb" :artist="itemsd.name" prefix="i" source="Instagram"
                         :image="itemsd.thumb[0]"
                         :parax="true" :iid="itemsd.id" name="Instagram" class="" />
      </div>
    </v-parallax>
    <color-card-list v-if="itemse !== null" :items="itemse" prefix="i" :showmore="false" name="Random Picks"
                     class="pt-10 pb-5" />
    <color-card-list v-if="itemsu !== null" :items="itemsu" prefix="i" :showmore="false" name="Picks"
                     class="pt-10 pb-5" />
  </v-col>
</template>

<script>
import axios from 'axios'
import ColorCard from '../layouts/Cards/ColorCard'
import ColorCardList from '../layouts/Lists/ColorCardList'
import HomePromote from '../layouts/Carousel/HomePromote'
import HomePromotionList from '../layouts/Lists/HomePromotionList'

export default {
  name: 'misha',

  components: {
    HomePromotionList,
    HomePromote,
    ColorCardList,
    ColorCard
  },
  data() {
    return {
      itemse: [],
      itemsu: []
    }
  },

  asyncData({ params }) {
    return axios.get(`https://app.ixil.cc/api/bloom/misha/random?id=flQZX0Nt`)
      .then((res) => {
        return axios.get(`https://app.ixil.cc/api/bloom/misha/random?id=ougvfmWY`)
          .then((resd) => {
            return axios.get(`https://app.ixil.cc/api/bloom/misha/random?many=true`)
              .then((rese) => {
                return { itemsd: res.data, itemsp: resd.data, itemsa: rese.data }
              })
          })
      })
  },
  mounted() {
    axios.get(`https://app.ixil.cc/api/bloom/misha/random?many=true`)
      .then((res) => {
        this.itemsu = res.data
      })
    axios.get(`https://app.ixil.cc/api/bloom/misha/random?many=true`)
      .then((res) => {
        this.itemse = res.data
      })


  },
  methods: {}
}
</script>
