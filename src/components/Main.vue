<template>
  <v-container class="text-white" fluid>
    <v-responsive max-width="400" class="mx-auto">
      <v-text-field
        v-model="searchData"
        :loading="loading"
        density="compact"
        variant="solo"
        label="Search for a city or a state"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @input="getSearchData"
      ></v-text-field>
    </v-responsive>

    <!-- alerts -->
    <v-alert
      closable
      color="error"
      max-width="400"
      class="ma-auto my-3"
      v-if="searchError"
      >No results found</v-alert
    >
    <v-alert
      closable
      color="error"
      max-width="400"
      class="ma-auto my-3"
      v-if="!serverError && ApiResult < 1"
      >No matched results, Try again</v-alert
    >
    <!-- alerts -->

    <!-- cards -->
    <template v-else>
      <v-card
        v-for="result in ApiResult"
        :key="result.id"
        class="ma-auto my-3"
        max-width="400"
      >
        <v-card-text>
          {{ result.place_name }}
        </v-card-text>
      </v-card>
    </template>
    <!-- cards -->
  </v-container>
</template>
<script lang="ts" setup>
// import axios from 'axios'
import { ref } from "vue";
import axios from "axios";

// ref for the input
const searchData = ref("");

// refs for loading effect on the input
const loading = ref(false);
const loaded = ref(false);

const handleQueryTime: any = ref();

// loading effect
const handleLoading = () => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
    loaded.value = true;
  }, 1000);
};

// storing Fetched data
const ApiResult = ref();

// handling Errors
const searchError = ref(false);
const serverError = ref(false);

// public api key
const pubKey =
  "pk.eyJ1IjoidG9jaHkiLCJhIjoiY2xsanFydHF2MWhpdDNwcWo1anh6dTBueCJ9.HkannWSMFIVGEcK8xZUZ2Q";

//consuming geocoding api
const getSearchData = () => {
  if (searchData.value != "" || null) {
    handleLoading();
  }
  handleQueryTime.value = setTimeout(async () => {
    if (searchData.value != "" || null) {
      try {
        const res = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchData.value}.json?access_token=${pubKey}&types=place`
        );
        ApiResult.value = res.data.features;
      } catch (err) {
        console.error(err);
        searchError.value = true;
        serverError.value = true
      }
      return
    }

    ApiResult.value = "";
    searchData.value = "";
  }, 1000);
};
</script>
<style></style>
