<template>
  <v-row justify="space-around">
    <v-container>
      <v-text-field
        v-model="textd"
        color="success"
        :loading="loading"
      ></v-text-field>
      <v-btn @click="GetData">
        REQUEST
      </v-btn>
    </v-container>
  </v-row>
</template>

<script>
import axios from 'axios'

export default {
  name: 'reqi',
  data() {
    return {
      textd: '',
      loading: false
    }
  },

  methods: {

    GetData() {
      let strap = this.textd
      if (strap !== undefined && strap !== null) {
        this.loading = true
        let regexp = /^.*?\.com\/(.*?)\/.*$/
        if (regexp.exec(strap) === null) {
          regexp = /^.*?\.com\/(.*?)\?.*$/.compile()
        }
        axios.get(`https://app.ixil.cc/api/bloom/misha/reqi?id=${regexp.exec(strap)[1]}`)
          .then((res) => {

          }).finally(() => {
          this.textd = ''
          this.loading = false
        })

      }
    }
  }
}
</script>

<style scoped>

</style>
