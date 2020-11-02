<template>
  <v-row style="overflow: hidden;">

    <!-- explicitly disable overflow because of tablets and nav -->
    <!-- Default header  -->
    <v-row v-if="$vuetify.breakpoint.mdAndUp && !parax" justify="space-between" class="pl-1 pr-6 ml-1 mr-6">
      <h1 style="align-self: center" v-text="GetNS(name)"></h1>
      <div v-if="showmore" class="" style="align-self: center">
        <v-btn color="rgba(0,0,0,0)" depressed :to="link">
          <v-row>
            <h1 v-if="$vuetify.breakpoint.mdAndUp" style="align-self: center; text-transform: none !important;">Show
              more</h1>
            <h3 v-if="$vuetify.breakpoint.smAndDown" style="align-self: center">Show more</h3>
            <v-icon v-if="$vuetify.breakpoint.mdAndUp" class="pl-1" style="align-self: center">mdi-arrow-right-circle
            </v-icon>
            <v-icon v-if="$vuetify.breakpoint.smAndDown" class="pl-1" style="align-self: center">
              mdi-arrow-right-circle
            </v-icon>
          </v-row>
        </v-btn>
      </div>
    </v-row>
    <!-- END Default header  -->


    <!-- Default header for parallax tab and pc -->
    <div v-if="parax && $vuetify.breakpoint.mdAndUp" class="pl-1 pr-6 ml-1 mr-6 pt-12" style="width: 100%">
      <v-row justify="space-between">
        <div>
          <v-col justify="space-between">
            <v-avatar tile size="10rem"
                      style="box-shadow:  0 0.9px 2.2px rgba(0, 0, 0, 0.051),  0 2.1px 5.3px rgba(0, 0, 0, 0.073),  0 3.9px 10px rgba(0, 0, 0, 0.09),  0 6.9px 17.9px rgba(0, 0, 0, 0.107),  0 13px 33.4px rgba(0, 0, 0, 0.129),  0 31px 80px rgba(0, 0, 0, 0.18)">
              <v-img
                :src="`https://proxy.ixil.cc/ren?width=500&height=500&method=cover&image=`+image"></v-img>
            </v-avatar>
            <h1 v-text="artist" />
            <div class="" style="align-self: center">
              <v-btn color="rgba(0,0,0,0)" depressed large :to="`/a/`+iid">
                <v-row>
                  <h1 style="align-self: center; text-transform: none !important;">View</h1>
                  <v-icon class="pl-1" style="align-self: center">
                    mdi-arrow-right-circle
                  </v-icon>
                </v-row>
              </v-btn>
            </div>
          </v-col>
        </div>
        <div>
          <v-col>
            <h1
              style="align-self: center; font-family: 'Playfair Display', serif; font-size: 5rem;  text-shadow: -2px 5px 9px rgba(0,0,0,0.42);"
              v-text="GetNS(source)" />
            <v-row justify="end">
              <v-btn color="rgba(0,0,0,0)" depressed large :to="`/sagasu?source=`+source">
                <v-row style="width: inherit" justify="space-around">
                  <h1 style="align-self: center; text-transform: none !important; ">Visit source</h1>
                  <v-icon class="pl-3" style="align-self: center">
                    mdi-arrow-right-circle
                  </v-icon>
                </v-row>
              </v-btn>
            </v-row>
          </v-col>
        </div>
      </v-row>
    </div>
    <!-- END parallax MD  -->


    <!-- Default header for parallax Mobile -->
    <div v-if="parax && $vuetify.breakpoint.smAndDown" class="pl-1 pr-6 ml-1 mr-6" style="width: 100%">
      <div :style="`transform: translateY(${ $vuetify.breakpoint.xs ? '1.2rem' : '-0.4rem'}) translateX(-0.5rem)`">
        <v-col justify="space-between">
          <v-avatar tile size="10rem"
                    style="box-shadow:  0 0.9px 2.2px rgba(0, 0, 0, 0.051),  0 2.1px 5.3px rgba(0, 0, 0, 0.073),  0 3.9px 10px rgba(0, 0, 0, 0.09),  0 6.9px 17.9px rgba(0, 0, 0, 0.107),  0 13px 33.4px rgba(0, 0, 0, 0.129),  0 31px 80px rgba(0, 0, 0, 0.18)">
            <v-img contain
                   :src="`https://proxy.ixil.cc/ren?width=500&height=500&method=cover&image=${image}`"></v-img>
          </v-avatar>
          <h1 v-text="artist" />
          <div class="" style="align-self: center">
            <v-btn color="rgba(0,0,0,0)" depressed large :to="`/a/`+iid">
              <v-row>
                <h1 style="align-self: center; text-transform: none !important;">View</h1>
                <v-icon class="pl-1" style="align-self: center">
                  mdi-arrow-right-circle
                </v-icon>
              </v-row>
            </v-btn>
          </div>
        </v-col>
      </div>
      <v-row justify="space-around">

        <div>
          <v-col>
            <h1
              style="align-self: center; font-family: 'Playfair Display', serif; font-size: 4rem;  text-shadow: -2px 5px 9px rgba(0,0,0,0.42);"
              v-text="GetNS(source)" />
            <v-row justify="end">
              <v-btn color="rgba(0,0,0,0)" depressed large :to="`/sagasu?source=`+source">
                <v-row style="width: inherit" justify="space-around">
                  <h1 style="align-self: center; text-transform: none !important; ">Visit source</h1>
                  <v-icon class="pl-3" style="align-self: center">
                    mdi-arrow-right-circle
                  </v-icon>
                </v-row>
              </v-btn>
            </v-row>
          </v-col>
        </div>
      </v-row>
    </div>
    <!-- END parallax SM -->


    <!-- Mobile only header  -->
    <v-btn color="rgba(0,0,0,0)" depressed v-if="$vuetify.breakpoint.smAndDown && !parax" width="100%" height="3rem"
           style="border-radius: 0;"
           :to="link">
      <v-row justify="space-between" class="pl-0 pr-6 ml-0 mr-6">
        <h2 style="align-self: center" v-text="GetNS(name)"></h2>
        <div style="align-self: center" v-if="showmore">
          <v-row>
            <h3 style="align-self: center">Show more</h3>
            <v-icon class="pl-1" style="align-self: center">
              mdi-arrow-right-circle
            </v-icon>
          </v-row>
        </div>
      </v-row>
    </v-btn>
    <!-- END Mobile only header  -->


    <!-- Default List content  -->
    <section v-if="($vuetify.breakpoint.mdAndUp && parax) || !($vuetify.breakpoint.smAndDown && parax)"
             style="overflow: hidden;">
      <vue-horizontal-list v-if="parax" style="" :items="data" :options="options">
        <template v-slot:default="{item}">
          <color-card class="pb-5" :shadow="parax" :album="{thumb: item, color: ['#fc1c64','#fc1c64','#fc1c64']}"
                      style="" />
        </template>
      </vue-horizontal-list>
      <vue-horizontal-list v-if="!parax" style="" :items="items" :options="options">
        <template v-slot:default="{item}">
          <nuxt-link :to="`/a/`+item.id">
            <color-card class="pb-5" :shadow="parax"
                        :album="{thumb: item.thumb, color: ['#fc1c64','#fc1c64','#fc1c64']}" style="" />
          </nuxt-link>
        </template>
      </vue-horizontal-list>
    </section>
    <!-- END Default List content  -->


    <!-- List content for parallax mobile  -->
    <v-responsive v-if="$vuetify.breakpoint.smAndDown && parax" align="center" style="padding-top: 5rem;">
      <div v-if="$vuetify.breakpoint.smOnly" style="width: 100%;height: 22rem; display: flex; flex-flow: row wrap;">
        <div v-if="$vuetify.breakpoint.smOnly" v-for="(item, n) in data" :key="n" class="mb-4"
             style=" flex: 1 0 11%; border-radius: 5px; width: fit-content; height: fit-content;">
          <v-img class="pxct-sm" height="10rem" width="15rem"
                 style="border-radius: 5px; box-shadow:  0 0.9px 2.2px rgba(0, 0, 0, 0.051),  0 2.1px 5.3px rgba(0, 0, 0, 0.073),  0 3.9px 10px rgba(0, 0, 0, 0.09),  0 6.9px 17.9px rgba(0, 0, 0, 0.107),  0 13px 33.4px rgba(0, 0, 0, 0.129),  0 31px 80px rgba(0, 0, 0, 0.18);"
                 :src="`https://proxy.ixil.cc/ren?width=400&height=500&method=cover&image=`+item" v-ripple>
          </v-img>
        </div>
      </div>
      <div v-if="$vuetify.breakpoint.xsOnly" style="width: 100%;height: 26rem; display: flex; flex-flow: row wrap;">
        <div v-for="(item, n) in data" :key="n" class="mb-4"
             style=" flex: 1 0 11%; border-radius: 5px; width: fit-content; height: fit-content;">
          <v-img class="pxct-xs" height="7rem" width="10rem"
                 style="border-radius: 5px; box-shadow:  0 0.9px 2.2px rgba(0, 0, 0, 0.051),  0 2.1px 5.3px rgba(0, 0, 0, 0.073),  0 3.9px 10px rgba(0, 0, 0, 0.09),  0 6.9px 17.9px rgba(0, 0, 0, 0.107),  0 13px 33.4px rgba(0, 0, 0, 0.129),  0 31px 80px rgba(0, 0, 0, 0.18);"
                 :src="`https://proxy.ixil.cc/ren?width=400&height=500&method=cover&image=`+item" v-ripple>
          </v-img>
        </div>
      </div>
    </v-responsive>

  </v-row>
</template>

<script>
  import ColorCard from '../Cards/ColorCard'
  import VueHorizontalList from 'vue-horizontal-list';

  export default {
    name: 'ColorCardList',
    components: { ColorCard, VueHorizontalList },

    props: {
      name: {
        type: String,
        default: 'www.jkforum.net'
      },
      data: {
        type: Array,
        default: null
      },
      iid: {
        type: String,
        default: `NUll`
      },
      items: {
        type: Array,
        default: null
      },
      showmore: {
        type: Boolean,
        default: true
      },
      image: {
        type: String,
        default: `NUll`
      },
      source: {
        type: String,
        default: ``
      },
      link: {
        type: String,
        default: ``
      },
      artist: {
        type: String,
        default: `NUll`
      },
      images: {
        type: Array,
        default: null
      },
      parax: {
        type: Boolean,
        default: false
      }

    },

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
            // padding between each item
            padding: 20
          },
          navigation: {
            // when to show navigation
            start: 1025,
            color: '#000'
          }
        },
      }
    },

    mounted() {
      this.options.item.padding = 25
    },
    methods: {
      /**
       * @return {string}
       */
      GetNS(str) {
        if (str.includes('.')) {
          let st = str.replace(/.[a-zA-Z]*$/, '')
          if (st.includes('.')) return st.replace(/^[0-9a-zA-Z]*./, '').toUpperCase()
          else return st.toUpperCase()
        } else return str
      }
    }
  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');

.cc-list {
  overflow-x: scroll;
  white-space: nowrap;
}
</style>
