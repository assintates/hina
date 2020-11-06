<template>
  <v-row justify="space-around">
    <v-container>
      <v-text-field
        v-model="textd"
        color="success"
      ></v-text-field>
      <v-btn onclick="reqest">
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
    reqest() {
      axios.get(`https://api.ixil.cc/bloom/misha/reqi?id=${this.textd}`)
        .then((res) => {
          this.textd = ''
        })
    }
  }
}
</script>

<style scoped>

</style>
