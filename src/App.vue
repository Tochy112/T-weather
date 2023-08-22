<template>
  <v-app>
    <Navigation />
    <v-main class="bg-secondary text-white fill-height">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Navigation from "./layouts/Navigation.vue";
//
</script>

<style>
* {
  font-family: "Montserrat", sans-serif;
  font-family: "Open Sans", sans-serif;
}
</style>
