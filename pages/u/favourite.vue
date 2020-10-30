<template>
  <v-col>
    <v-divider class="TopView"/>
    <div style="">
      <v-row justify="space-around" style="padding-bottom: 9rem">
        <v-container style="padding-left: 2rem; padding-right: 2rem;">
          <masonry
            :cols="{default: 4, 1000: 3, 700: 2, 400: 2}"
            :gutter="{default: '30px', 700: '15px'}"
          >
            <n-link v-for="(item, index) in datan.data" :key="index"
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
    <v-divider/>
    <v-pagination
      v-model="Page"
      :length="datan.maxres"
      :total-visible="7"
      @input="$router.push('?page='+Page)"
    ></v-pagination>
  </v-col>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'favourite',
  watchQuery(newQuery, oldQuery) {
    // Only execute component methods if the old query string contained `bar`
    // and the new query string contains `foo`
    if (newQuery.page !== undefined) {
      this.QueryTerm = newQuery.query
      this.HeadSearchUp()
    }
  },
  data() {
    return {
      datan: [],
      Page: 1,
      el: null
    }
  },

  asyncData({ params }) {

  },

  computed: {},

  watch: {},

  mounted() {
    console.log(this.$route.query.qp)
    this.HeadSearchUp()

    this.el = this.$el.getElementsByClassName('TopView')[0]
  },

  methods: {

    HeadSearchUp() {
      return axios.get(`http://localhost:3001/bloom/strat/user/get/favs?page=${this.Page}&op=30&email=${this.$auth.user.email}`, {
        headers: {
          Authorization: this.$auth.getToken('auth0') //the token is a variable which holds the token
        }

      })
        .then((res) => {
          this.datan = res.data
        })
    }
  }
}
</script>

<style scoped>

</style>
