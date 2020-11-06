<template>
  <v-row justify="space-around">
    <v-container>
      <v-text-field
        v-model="textd"
        color="success"
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
      textd: ''
    }
  },

  methods: {

    GetData() {
      let strap = this.textd
      if (strap !== undefined && strap !== null) {
        let regexp = /^.*?\.com\/(.*?)\/.*$/
        axios.get(`https://api.ixil.cc/bloom/misha/reqi?id=${regexp.exec(strap)[1]}`)
          .then((res) => {
            this.textd = ''
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
