<template>
  <v-col justify-xl="start">
    <color-card-list class=""/>
  </v-col>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import axios from '../.nuxt/axios'
import ColorCard from '../layouts/Cards/ColorCard'
import ColorCardList from '../layouts/Lists/ColorCardList'

export default {
  components: {
    ColorCardList,
    ColorCard,
    Logo,
    VuetifyLogo
  },
  mounted() {
    //this.GetAndSA()
  },
  methods: {
    GetAndSA()
    {
      this.$axios.get('https://api.ixil.cc/bloom/hina?op=50&page=1&source=www.jkforum.net').then(function (response) {
        // handle success
        const parsed = JSON.stringify(response.data.data);
        localStorage.setItem('recent', parsed);
        response.data.data.forEach( function(currentValue, index, arr) {
          console.log(currentValue)

        })
      })
    }
  }
}
</script>
