<template>
  <v-col justify-content="center">
    <p style="padding-top: 10%; text-align: center; font-weight: 400; font-size: 4rem;">Signing in...</p>
    <v-snackbar
      elevation="10"
      color="green"
      v-bind:value="true"
      :timeout="2000"
    >
      <v-row>
        <v-icon class="pl-5" style="justify-self: center;">mdi-check-circle</v-icon>
        <h4 style="padding-left: 1rem; text-align: center;">logged in</h4>
      </v-row>
    </v-snackbar>
  </v-col>
</template>

<script>
export default {
  name: 'signed-in'
}
</script>

<style scoped>

</style>
