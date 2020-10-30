<template>
  <div v-if="loading" class="loading-page" style="z-index: 2;">
    <v-col>
      <v-progress-circular
        indeterminate
        size="180"
        width="10"
      ></v-progress-circular>
      <p>Loading...</p>
    </v-col>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(78, 75, 75, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}
</style>
