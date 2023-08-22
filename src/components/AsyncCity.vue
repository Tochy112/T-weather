<template>
  <!-- banner -->
  <v-container v-if="route.query.preview" fluid>
    <div class="my-0 bg-primary pa-2 text-center">
      <p class="my-1">
        Click on the + sign to start tracking this city
      </p>

      <RouterLink :to="{name: 'home'}" class="text-white">return to home</RouterLink>
    </div>
  </v-container>
  <!-- banner -->

  <!-- weather overview -->
  <v-container class="text-white text-center">
    <h2 class="my-3">{{ route.params.city }}</h2>
    <p>
      {{
        new Date(weatherData.currentTime).toLocaleDateString("en-us", {
          weekday: "short",
          day: "2-digit",
          month: "long",
        })
      }}
      {{
        new Date(weatherData.currentTime).toLocaleTimeString("en-us", {
          timeStyle: "short",
        })
      }}
    </p>

    <h1 class="mb-8">{{ Math.round(weatherData.current.temp) }}&deg;</h1>
    <p>
      Feels like
      {{ Math.round(weatherData.current.feels_like) }} &deg;
    </p>
    <h3>
      {{ weatherData.current.weather[0].description }}
    </h3>
    <v-img
      width="100px"
      height="100px"
      class="ma-auto"
      :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
      alt=""
    />

    <hr />
  </v-container>
  <!-- weather overview -->

  <!-- hourly weather -->
  <v-container class="text-white text-center">
    <h3>Hourly Weather</h3>

    <div class="container d-flex my-4 py-4">
      <div v-for="hourData in weatherData.hourly" :key="hourData.dt">
        <p>
          {{
            new Date(hourData.currentTime).toLocaleTimeString("en-us", {
              hour: "numeric",
            })
          }}
        </p>

        <v-img
          width="70px"
          height="70px"
          class="ma-auto"
          :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
        />

        <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
      </div>
    </div>
  </v-container>
  <!-- hourly weather -->

  <!-- Weekly weather -->

  <v-container class="py-4 text-white text-center">
    <div>
      <h2 class="mb-4">7 Day Forecast</h2>
      <div class="d-flex justify-center py-3 contain">
        <div
          v-for="day in weatherData.daily"
          :key="day.dt"
          class="flex items-center"
        >
          <p>
            {{
              new Date(day.dt * 1000).toLocaleDateString("en-us", {
                weekday: "long",
              })
            }}
          </p>
          <v-img
            class="ma-auto"
            width="70px"
            height="70px"
            :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            alt=""
          />
          <div class="d-flex mx-2 justify-end">
            <p class="mx-2">H: {{ Math.round(day.temp.max) }}</p>
            <p>L: {{ Math.round(day.temp.min) }}</p>
          </div>
        </div>
      </div>
    </div>
  </v-container>

  <!-- weekly weather -->
</template>
<script lang="ts" setup>
import { useRoute, RouterLink } from "vue-router";
import axios from "axios";
const route = useRoute();
const API = `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`;

const getWeatherData = async () => {
  try {
    const res = await axios.get(API);
    const data = res.data;

    // cal current date & time to UTC
    const localOffset: number = new Date().getTimezoneOffset() * 60000;
    const utc: number = res.data.current.dt * 1000 + localOffset;
    res.data.currentTime = utc + 1000 * res.data.timezone_offset;

    // cal hourly weather offset to UTC
    res.data.hourly.forEach((hour: any) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * res.data.timezone_offset;
    });

    return data;
  } catch (err) {
    console.log(err);
  }
};

const weatherData = await getWeatherData();

console.log(weatherData);
</script>
<style scoped>
hr {
  width: 90vw;
  height: 2px;
  color: #fff;
}
h1 {
  font-size: 3rem;
}
.container, .contain {
  overflow-x: scroll;
}
.container::-webkit-scrollbar,
.contain::-webkit-scrollbar {
  height: 1px;
  width: 20px;
  background: #ec6e4c;
}
</style>
