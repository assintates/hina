<template>
  <div style="overflow: hidden;">
    <v-sheet v-if="$vuetify.breakpoint.mdAndUp" width="30rem" elevation="5">
      <v-row style="padding-left: 1.5rem; padding-top: 1rem;">
        <v-avatar size="4.5rem"
                  style="box-shadow:  0 0.9px 2.2px rgba(0, 0, 0, 0.051),  0 2.1px 5.3px rgba(0, 0, 0, 0.073),  0 3.9px 10px rgba(0, 0, 0, 0.09),  0 6.9px 17.9px rgba(0, 0, 0, 0.107),  0 13px 33.4px rgba(0, 0, 0, 0.129),  0 31px 80px rgba(0, 0, 0, 0.18);">
          <v-img :src="`https://proxy.ixil.cc/ren?width=500&height=500&method=cover&image=`+data.thumb"></v-img>
        </v-avatar>
        <div class="" style="justify-self: self-start">
          <v-col>
            <h1
              style="align-self: self-start; width: 17rem; height: 3rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
              v-text="data.name"></h1>
            <h5>Hina</h5>
          </v-col>
        </div>
      </v-row>
      <v-sheet class="pl-0" width="fit-content"
               style="box-shadow: 1px -7px 8px -8px #000000, 1px -7px 8px 0px rgba(0,0,0,0.24);">
        <v-carousel
          :continuous="true"
          :cycle="false"
          :show-arrows="true"
          :hide-delimiter-background="true"
          :hide-delimiters="true"
          hide-delimiter-background
          delimiter-icon="mdi-minus"
          style="width: 30rem; height: 30rem"
        >
          <v-carousel-item
            v-for="(imager, i) in data.gliphs"
            :key="i"
          >
            <nuxt-link :to="`/a/`+data.id">
              <v-img :src='`https://proxy.ixil.cc/ren?width=600&height=500&method=cover&image=`+imager'
                     position="90% 60%" aspect-ratio="1.0001" />
            </nuxt-link>
          </v-carousel-item>
        </v-carousel>
      </v-sheet>
    </v-sheet>


    <v-sheet v-if="$vuetify.breakpoint.smOnly" width="15rem" elevation="5">
      <v-row style="padding-left: 1.5rem; padding-top: 1rem;">
        <v-avatar size="2.5rem"
                  style="box-shadow:  0 0.9px 2.2px rgba(0, 0, 0, 0.051),  0 2.1px 5.3px rgba(0, 0, 0, 0.073),  0 3.9px 10px rgba(0, 0, 0, 0.09),  0 6.9px 17.9px rgba(0, 0, 0, 0.107),  0 13px 33.4px rgba(0, 0, 0, 0.129),  0 31px 80px rgba(0, 0, 0, 0.18);">
          <v-img :src="`https://proxy.ixil.cc/ren?width=200&height=200&method=cover&image=`+data.thumb"></v-img>
        </v-avatar>
        <div class="" style="">
          <v-col>
            <h1
              style="font-size: 0.8rem; width: 10rem; height: 1.2rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
              v-text="data.name"></h1>
            <v-row>
              <v-icon>mdi-semantic-web</v-icon>
              <h5 style="align-self: center">:</h5>
              <h5 style="align-self: center; font-weight: 200;">HINA</h5>
            </v-row>
          </v-col>
        </div>
      </v-row>
      <v-sheet class="pl-0" width="fit-content"
               style="box-shadow: 1px -7px 8px -8px #000000, 1px -7px 8px 0px rgba(0,0,0,0.24);">
        <v-carousel
          :continuous="true"
          :cycle="false"
          :show-arrows="true"
          :hide-delimiter-background="true"
          :hide-delimiters="true"
          hide-delimiter-background
          delimiter-icon="mdi-minus"
          style="width: 15rem; height: 10rem"
        >
          <v-carousel-item
            v-for="(imager, i) in data.gliphs"
            :key="i"
          >
            <nuxt-link :to="`/a/`+data.id">
              <v-img :src='`https://proxy.ixil.cc/ren?width=500&height=500&method=cover&image=`+imager'
                     position="90% 60%" aspect-ratio="1.0001" />
            </nuxt-link>
          </v-carousel-item>
        </v-carousel>
      </v-sheet>
    </v-sheet>


    <v-sheet v-if="$vuetify.breakpoint.xsOnly" width="10rem" elevation="5">
      <div class="pl-3" style="">
        <v-col>
          <h1
            style="font-size: 1rem; width: 7rem; height: 1.3rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
            v-text="data.name"></h1>
          <v-row class="pl-2">
            <v-icon>mdi-semantic-web</v-icon>
            <h5 style="align-self: center">:</h5>
            <h5 style="align-self: center; font-weight: 200;">HINA</h5>
          </v-row>
        </v-col>
      </div>
      <v-sheet class="pl-0" width="fit-content"
               style="box-shadow: 1px -7px 8px -8px #000000, 1px -7px 8px 0px rgba(0,0,0,0.24);">
        <v-carousel
          :continuous="true"
          :cycle="true"
          :show-arrows="false"
          :hide-delimiter-background="true"
          :hide-delimiters="true"
          hide-delimiter-background
          delimiter-icon="mdi-minus"
          style="width: 10rem; height: 7rem"
        >
          <v-carousel-item
            v-for="(imager, i) in data.gliphs"
            :key="i"
          >
            <nuxt-link :to="`/a/`+data.id">
              <v-img :src='`https://proxy.ixil.cc/ren?width=300&height=300&method=cover&image=`+imager'
                     position="90% 60%" aspect-ratio="1.0001" />
            </nuxt-link>
          </v-carousel-item>
        </v-carousel>
      </v-sheet>
    </v-sheet>
  </div>
</template>
<script>
export default {
  name: 'HomePromote',
  props: {
    data: {
      type: Object,
      default: null
    },
    image: {
      type: String,
      default: ''
    },
    images: {
      type: Array,
      default: null
    },
    name: {
      type: String,
      default: 'NULL'
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>
