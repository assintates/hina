<template>
  <v-app dark>
    <Snackbar />
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="false"
      temporary
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
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-tooltip bottom v-if="DownloadState">
        <template v-slot:activator="{ on, attrs }">
          <v-progress-circular
            :rotate="360"
            :size="40"
            :width="8"
            :value="(DownloadProgress / DownloadTotal) * 100"
            color="primary"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>
              mdi-arrow-down
            </v-icon>
          </v-progress-circular>
        </template>
        <span style="font-family: 'Michroma', sans-serif;">{{ Math.round((DownloadProgress / DownloadTotal) * 100) }} <a
          style="font-family: 'Aldrich', sans-serif;">%</a></span>
      </v-tooltip>

      <!--  Search   -->
      <v-container>
        <v-btn icon to="/sagasu">
          <v-icon
            class="search-field-icon"
            size="1.5rem;"
            style="width: 3rem!important; height: 2.3rem!important;"
          >
            mdi-magnify
          </v-icon>
        </v-btn>
      </v-container>


      <v-spacer />
      <!--  User Account menu   -->
      <v-menu
        :close-on-content-click="true"
        :nudge-width="200"
        offset-y
        :close-on-click="true"
      >
        <template v-slot:activator="{ on }">
          <v-avatar
            dark
            v-on="on"
            size="35px"
          >
            <img v-if="$auth.loggedIn"
                 :src="$auth.user.picture"
                 alt="Kyro"
            >
            <v-icon v-if="!$auth.loggedIn">mdi-account-circle</v-icon>
          </v-avatar>
        </template>

        <v-card style="background: linear-gradient(180deg, rgba(8,6,6,0.66) 0%, rgba(0,0,0,0.5995448521205357) 100%);">
          <v-list style="background: linear-gradient(180deg, rgba(8,6,6,1) 0%, rgba(0,0,0,0.7130602582830007) 100%);">
            <v-list-item>
              <v-list-item-avatar>
                <img v-if="$auth.loggedIn"
                     :src="$auth.user.picture"
                     alt="Kyro"
                >
                <v-icon v-if="!$auth.loggedIn">mdi-account-circle</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ $auth.loggedIn ? $auth.user.name : 'Anon' }}</v-list-item-title>
                <v-list-item-subtitle v-if="$auth.loggedIn && !$auth.user.email_verified">Unverified ✗
                </v-list-item-subtitle>
                <v-list-item-subtitle v-if="$auth.loggedIn && $auth.user.email_verified">Verified ✓
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn
                  icon
                  @click.stop="rightDrawer = !rightDrawer"
                >
                  <v-icon>mdi-history</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>

          <v-divider />

          <v-list
            v-if="$auth.loggedIn"
            style="background: linear-gradient(180deg, rgba(8,6,6,0.81) 0%, rgba(0,0,0,0.6946008745294993) 100%);">
            <v-list-item>
              <v-btn text style="width: 115%; right: 7%" to="/u/favourite">
                FAVOURITES
              </v-btn>
            </v-list-item>
          </v-list>

          <v-card-actions>
            <v-spacer />

            <v-btn text v-if="!$auth.loggedIn" ripple
                   @click="$auth.login(/* .... */).then(() => this.$toast.success('Logged In!'))">
              Login
            </v-btn>
            <v-btn v-if="$auth.loggedIn" text ripple @click="$auth.logout()">
              Logout
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
      <!--  END User Menu  -->


    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
      :width="ESize()"
      style="z-index: 12;"
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
        <nuxt-link style="text-decoration: none;" :to="item.source === 'HINA'? `/a/${item.id}` : `/i/${item.id}`">
          <div
            class="pl-3"
            style="height: 10rem; background-size: 50% 100%; border-radius: 5px; text-decoration: none;"
            :style="`background: linear-gradient(286deg, ${hexToRgb(item.color[1], 0.4553571770505077)} 3%, ${hexToRgb(item.color[1], 0.010343171448266806)} 19%, ${hexToRgb(item.color[0], 0.819502835313813)} 52%, ${hexToRgb(item.color[0], 1)} 64%,  ${hexToRgb(item.color[0], 0.9699230033810399)} 80%, ${hexToRgb(item.color[0], 1)} 99%), url(https://proxy.ixil.cc/ren?image=${item.thumb}&width=700&height=400&method=cover) right no-repeat`">

            <v-col no-gutters style="text-decoration: none !important;">
              <div
                class="flex-nowrap"
                style="text-shadow: 2px 2px 8px #4b4a4b;  font-size: large; height: 28px;  width: 325px; overflow: hidden;  position: relative;  display: inline-block; text-overflow: ellipsis; white-space: nowrap; color: white;"
                v-text="item.name"
                align="start"
              ></div>

              <p style="padding-top: 0.5rem; font-weight: lighter; color: white;" v-text="item.idol"></p>
              <p align="start" style="padding-top: 1.4rem; font-weight: lighter; user-select: none; color: white;"
                 v-text="item.source.replace('www.','')"></p>
            </v-col>

          </div>
        </nuxt-link>
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
          :to="item.source === 'HINA'? `/a/${item.id}` : `/i/${item.id}`"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            :src="'https://proxy.ixil.cc/prox?image='+item.thumb"
          >
          </v-img>
          <v-card-subtitle class="pb-0">{{ item.idol }}</v-card-subtitle>

          <v-card-text class="text--primary">
            {{ item.name }}
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
import Snackbar from '@/components/Snackbar'
import axios from 'axios'

export default {
  components: { Snackbar },
  data() {
    return {
      search_overlay: false,
      clipped: false,
      drawer: false,
      fixed: true,
      fixers: [],
      notific: true,

      rules: {
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      },
      items: [
        {
          icon: 'mdi-apps',
          title: 'Bloom',
          to: '/'
        },
        {
          icon: 'mdi-spa',
          title: 'HINA',
          to: '/hina'
        }
        ,
        {
          icon: 'mdi-leaf',
          title: 'MISHA',
          to: '/misha'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Bloom -  B.A-0.3'
    }
  },

  computed: {
    ...mapGetters({
      RecentViews: 'history/GET_HISTORY_DATA',
      DownloadState: 'download/GET_DOWNLOAD_STATE',
      DownloadProgress: 'download/GET_DOWNLOAD_PROGRESS',
      DownloadTotal: 'download/GET_DOWNLOAD_TOTAL',
      SearchSources: 'search/GET_SOURCES_DATA'
    }),


    progress() {
      return Math.min(100, this.pwvalue1.length * 10)
    },
    color() {
      return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
    }
  },

  created() {

  },

  beforeMount() {
    this.$store.dispatch('history/LOAD_HISTORY')
    this.$store.dispatch('search/LOAD_SOURCES_DATA')
  },

  watch: {},

  mounted() {
    this.$OneSignal.push(() => {
      this.$OneSignal.showNativePrompt()
    })

    if (this.$auth.loggedIn) {
      // Inside page components
      this.$OneSignal.push(() => {
        this.$OneSignal.isPushNotificationsEnabled((isEnabled) => {
          if (isEnabled) {
            axios.get(`https://api.ixil.cc/bloom/strat/user/get/emailhash?email=` + this.$auth.user.email, {
              headers: {
                Authorization: this.$auth.getToken('auth0') //the token is a variable which holds the token
              }
            })
              .then((res) => {
                OneSignal.setExternalUserId(res.data.hash)
                console.log('PUSHED NOTIFICATION ID:  ' + res.data.hash)
              })
          } else {
            this.$OneSignal.showNativePrompt()
          }
        })
      })
    }
  },

  beforeDestroy() {
  },

  methods: {
    hexToRgb(hex, opacity) {
      return 'rgba(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length / 3 + '})', 'g')).map(function(l) {
        return parseInt(hex.length % 2 ? l + l : l, 16)
      }).concat(opacity || 1).join(',') + ')'
    },

    GetNotified() {

    },

    /**
     * @return {string}
     */
    ESize() {
      if (this.$vuetify.breakpoint.smAndDown) return '20rem'
      else return '48rem'
    },

    RegDialog() {
      this.dialog = !this.dialog
      this.dialog2 = !this.dialog2
    }

  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@600&family=Aldrich&family=Michroma&display=swap');

.search-field {
  width: 0em;
  transition: width linear .3s;
  margin-top: 0.7rem !important;
}

.search-field:hover {
  width: 30rem;
}

.search-field:focus-within {
  width: 30rem;
}

.search-field-icon:hover {
  transform: translateY(-1px);
  cursor: pointer;
}

</style>
