<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getForecast } from "../api/openWeather";
import { getTimeFormatSetting } from "../store/timeFormats";
import ForecastSection from "../components/sections/ForecastSection.vue";

const route = useRoute();
const router = useRouter();

const forecastData = ref([]);
const loading = ref(true);

const fetchForecast = async () => {
  const city = route.query.city;

  if (!city) {
    router.push("/vue-website/");
    return;
  }

  loading.value = true;
  const data = await getForecast(city);

  if (data?.list) {
    forecastData.value = data.list.slice(0, 8);
  }

  loading.value = false;
};

const formatTime = (timestamp) => {
  const timeFormat = getTimeFormatSetting();
  const date = new Date(timestamp * 1000);

  if (timeFormat === "24") {
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
};

onMounted(() => {
  fetchForecast();
});

watch(
  () => route.query.city,
  () => {
    fetchForecast();
  }
);
</script>

<template>
  <div v-if="loading" class="forecast-loading">Loading...</div>
  <ForecastSection
    v-else
    :forecast-data="forecastData"
    :city="route.query.city"
    :format-label="formatTime"
  />
</template>
