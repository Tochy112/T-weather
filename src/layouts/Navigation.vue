<template>
  <nav>
    <v-app-bar elevation="3">
      <RouterLink :to="{ name: 'home' }" class="route">
        <v-app-bar-title class="ma-10 text-secondary">
          t-weda
          <v-icon>mdi-weather-partly-lightning</v-icon>
        </v-app-bar-title>
      </RouterLink>
      <v-spacer></v-spacer>
      <div class="ma-10 d-flex">
        <v-icon @click="toggleModalActive" class="mx-1 text-secondary hover"
          >mdi-information</v-icon
        >
        <v-icon class="text-secondary hover" @click="comingSoonFn">mdi-plus</v-icon>
      </div>
      <!-- <v-app-bar-nav-icon /> -->
    </v-app-bar>

    <BaseModal :modalActive="modalActive" @close-modal="toggleModalActive">
      <v-card-text>
        <h2 class="mb-2 text-secondary">How it works</h2>
        <ol class="pa-4">
          <li>
            Search for your city by entering the name into the search bar.
          </li>
          <li>
            Select a city within the results, this will take you to the current
            weather of your selection.
          </li>
          <li>
            Track the city by clicking on the "+" icon in the top right. This
            will save the city to view at a later time on the home page.
          </li>
        </ol>

        <h2 class="mb-2 text-secondary">Removing a city</h2>
        <p>
          If you no longer wish to track a city, simply select the city and click on the delete button.
        </p>
      </v-card-text>
    </BaseModal>
  </nav>
</template>

<script lang="ts" setup>
import BaseModal from "@/components/BaseModal.vue";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const feature = ref("")
const comingSoonFn = () => {
  alert(feature.value="coming soon")
}

// modal toggle
const modalActive = ref(false);
const toggleModalActive = () => {
  modalActive.value = !modalActive.value;
};
</script>

<style scoped>
.route {
  text-decoration: none;
}
.hover {
  cursor: pointer;
}
</style>
