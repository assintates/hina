<template>
  <v-snackbar timeout="2000" v-model="show" onclose="">
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn
        color="pink"
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Snackbar',
  data() {
    return {
      show: false,
      message: ''
    }
  },
  computed: {
    ...mapGetters({
      state_message: 'snackbar/GET_SNACK_STATE'
    })
  },
  watch: {
    state_message: 'PopSnack'
  },
  mounted() {
  },

  methods: {
    PopSnack() {
      this.message = this.state_message
      this.show = true
    }
  }
}
</script>
