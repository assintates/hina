<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"/>
      <v-spacer/>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-history</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt/>
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
      width="50%"
    >
      <div
        class="pl-4 pt-2 pb-3 transition-swing text-lg-h1-100rem font-weight-black  text-sm-h4 text-md-h3"
        v-text="'Recently Viewed'"
        style="overflow-y: hidden; overflow-x: hidden;"
      >
      </div>
      <v-col
        v-for="(item, i) in this.RecentViews"
        :key="i"
        cols="12"
        v-if="$vuetify.breakpoint.mdAndUp"
      >
        <div style="height: 10rem; background-size: 50% 100%; object-fit: cover; border-radius: 5px;"
             :style="
             `background: linear-gradient(286deg, ${hexToRgb(item.color[1], 0.4553571770505077)} 3%, ${hexToRgb(item.color[1], 0.010343171448266806)} 19%, ${hexToRgb(item.color[0], 0.819502835313813)} 52%, ${hexToRgb(item.color[0], 1)} 64%,  ${hexToRgb(item.color[0], 0.9699230033810399)} 80%, ${hexToRgb(item.color[0], 1)} 99%), url(${item.thumb}) right no-repeat`">
          <div class="d-flex flex-no-wrap justify-space-between" style="height: inherit">
            <div class="d-flex flex-no-wrap justify-space-between flex-column align-self-start" style="height: inherit">
              <v-card-title
                class="headline text-md flex-wrap"
                v-text="item.name"
                style="overflow: hidden; text-overflow: ellipsis; text-shadow: 1px 1px 1px #000000;"
              ></v-card-title>

              <div class="ml-1 mt-1  align-self-start">
                <v-card-subtitle  v-text="item.idol"></v-card-subtitle>
              </div>
              <v-card-subtitle class="" v-text="item.source"></v-card-subtitle>
            </div>
          </div>

        </div>
      </v-col>
      <v-col
        v-for="(item, i) in this.RecentViews"
        :key="i"
        cols="12"
        v-if="$vuetify.breakpoint.smAndDown"
      >
        <v-card
          :color="item.color[2]"
          dark
        >
          <v-img
            class="white--text align-end"
            height="200px"
            :src="item.thumb"
          >
          </v-img>
          <v-card-subtitle class="pb-0">{{item.idol}}</v-card-subtitle>

          <v-card-text class="text--primary">
            {{item.name}}
          </v-card-text>
        </v-card>
      </v-col>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span><a href="https://github.com/ixilia">ixilia</a> | Bloom &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>

  import { mapGetters, mapState } from 'vuex'

  export default {
    data() {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        fixers: [],
        items: [
          {
            icon: 'mdi-apps',
            title: 'Welcome',
            to: '/'
          },
          {
            icon: 'mdi-chart-bubble',
            title: 'Inspire',
            to: '/inspire'
          }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
      }
    },

    computed: {
      ...mapGetters({
        RecentViews: 'history/GET_HISTORY_DATA'
      })
    },

    created() {

    },

    beforeMount() {
      this.$store.dispatch("history/LOAD_HISTORY")
    },

    watch: {
    },

    mounted() {
    },

    beforeDestroy(){
    },

    methods: {
      hexToRgb(hex, opacity) {
        return 'rgba(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16) }).concat(opacity||1).join(',') + ')';
      }
    }

  }
</script>
