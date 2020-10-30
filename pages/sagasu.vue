<template>
  <v-col>
    <v-form v-if="OptionsShow">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field v-model="QueryTerm" clearable placeholder="Search" append-icon="mdi-magnify"
                          v-on:keyup.enter="SearchUp" @click:append="SearchUp">
            </v-text-field>
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
            <v-autocomplete
              :items="Idols"
              v-model="idols_state"
              :loading="Idols >! 0"
              deletable-chips
              small-chips
              chips
              hint="Idols"
              persistent-hint
              multiple
            ></v-autocomplete>
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
            <v-autocomplete
              disabled
              :items="platforms"
              v-model="platform_state"
              chips
              hint="Platform   -   Work In Progress"
              persistent-hint
              multiple
            ></v-autocomplete>
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
            <v-autocomplete
              v-model="source_state"
              :items="Domains"
              chips
              hint="Source"
              persistent-hint
              multiple
              single-line
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-divider class="TopView"/>
    <v-row v-if="$vuetify.breakpoint.mdAndUp & SearchState" justify="space-between"
           style="overflow: hidden; flex-wrap: wrap; height: 4rem;">
      <n-link v-for="(item, i) in Bags"
              :key="i"
              :to="{ path: '/sagasu', query: { query: item.name}}" style="text-decoration:none !important;" replace
              no-prefetch>
        <v-chip
          class="ma-5"
          :color="item.color"
          label
          text-color="white"
          style="cursor:pointer !important;"
        >
          <v-icon style="cursor:pointer !important;" left>
            mdi-label
          </v-icon>
          {{ item.name }}
        </v-chip>
      </n-link>
    </v-row>
    <v-divider v-if="$vuetify.breakpoint.smAndUp"/>

    <div style="">

      <v-row v-if="!SearchState" justify="center" style="margin-top: 5rem;">
        <v-progress-circular
          indeterminate
          size="180"
          width="10"
          color="primary"
        ></v-progress-circular>
      </v-row>


      <v-row v-if="SearchState" justify="space-around" style="padding-bottom: 9rem">
        <v-container style="padding-left: 2rem; padding-right: 2rem;">
          <h1 v-if="SearchState && !NoContent">No Result</h1>
          <masonry
            v-if="NoContent"
            :cols="{default: 4, 1000: 3, 700: 2, 400: 2}"
            :gutter="{default: '30px', 700: '15px'}"
          >
            <n-link v-for="(item, index) in Search" :key="index"
                    :to="`/a/${item.id}`" prefetch>
              <v-img max-width="17rem" max-height="20rem;"
                     style="border-radius: 5px; margin-left: 1rem; margin-right: 1rem; margin-bottom: 2rem;"
                     lazy-src="https://cdn.discordapp.com/attachments/488810702190936075/768945580038160394/unknown.png"
                     :src="`https://proxy.ixil.cc/prox?image=`+item.thumb">
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="red"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </n-link>
          </masonry>
        </v-container>
      </v-row>

    </div>
    <v-divider v-if="SearchState"/>
    <v-pagination v-if="SearchState"
                  v-model="Page"
                  :length="Pagination"
                  :total-visible="7"
                  @input="SearchUp"
    ></v-pagination>
  </v-col>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'sagasu',
  watchQuery(newQuery, oldQuery) {
    // Only execute component methods if the old query string contained `bar`
    // and the new query string contains `foo`
    if (newQuery.query !== undefined) {
      this.QueryTerm = newQuery.query
      this.SearchUp()
    }
  },
  data() {
    return {
      OptionsShow: true,
      QueryTerm: '',
      search_crumbs: [
        {
          text: 'PAGE',
          disabled: false
        },
        {
          text: '1',
          disabled: false
        }
      ],
      platforms: [
        'HINA',
        'MISHA',
        'SASHA'
      ],
      Page: 1,
      idols_state: [],
      platform_state: ['HINA'],
      source_state: [],
      colors: [
        'pink',
        'green',
        'blue',
        'red',
        'blueviolet',
        'darkorange',
        'darkyellow'
      ],
      el: null
    }
  },


  computed: {
    ...mapGetters({
      Sources: 'search/GET_SOURCES_DATA',
      Domains: 'search/GET_DOMAINS_DATA',
      SearchState: 'search/GET_SEARCH_STATE',
      NoContent: 'search/GET_SEARCH_RESULT_STATE',
      Search: 'search/GET_SEARCH_DATA',
      Idols: 'search/GET_IDOLS_DATA',
      Pagination: 'search/GET_PAGE_DATA',
      Bags: 'search/GET_BAGS_DATA',

      SelPage: 'search/GET_SELECTED_PAGE_DATA',
      SelIdol: 'search/GET_SELECTED_IDOL_DATA',
      SelSource: 'search/GET_SELECTED_SOURCE_DATA',
      SelQuery: 'search/GET_SELECTED_TERM_DATA'
    })
  },

  watch: {},

  mounted() {
    console.log(this.$route.query.qp)


    this.source_state = this.SelSource
    this.idols_state = this.SelIdol
    this.Page = this.SelPage
    this.QueryTerm = this.SelQuery
    if (this.$route.query.qp !== undefined) this.OptionsShow = JSON.parse(this.$route.query.qp.toLowerCase())
    if (this.$route.query.query !== undefined) this.QueryTerm = this.$route.query.query
    if (this.$route.query.idol !== undefined) {
      this.idols_state = this.$route.query.idol.split(',')
    }
    if (this.$route.query.source !== undefined) {
      this.source_state = this.$route.query.source.split(',')
    }
    this.SearchUp()

    this.el = this.$el.getElementsByClassName('TopView')[0]
  },

  methods: {

    HeadSearchUp() {
      this.SearchUp()
      if (this.el) {
        this.el.scrollIntoView({
          behavior: 'smooth'
        })
      }
    },


    SearchUp() {
      this.$store.dispatch('search/LOAD_SEARCH_DATA', {
        source: this.source_state,
        idol: this.idols_state,
        term: this.QueryTerm,
        page: this.Page
      })
    },

    GetColor() {
      return this.colors[Math.floor((Math.random() * this.colors.length))]

    }
  }
}
</script>

<style scoped>

</style>
