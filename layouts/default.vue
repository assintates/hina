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
        <v-card
          :color="item.color[0]"
          dark
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div class="d-flex flex-no-wrap justify-space-between flex-column">
              <v-card-title
                class="headline text-md flex-wrap"
                v-text="item.name"
                style="overflow: hidden; text-overflow: ellipsis;"
              ></v-card-title>

              <v-card-subtitle v-text="item.idol"></v-card-subtitle>
              <v-card-subtitle v-text="item.source"></v-card-subtitle>
            </div>

            <v-avatar
              class="ma-3"
              size="145"
              tile
            >
              <v-img  :src="item.thumb"></v-img>
            </v-avatar>
          </div>
        </v-card>
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
      <span>&copy; {{ new Date().getFullYear() }}</span>
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

    }

  }
</script>
