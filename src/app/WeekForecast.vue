<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getForecast } from "../api/openWeather";
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
    const grouped = {};

    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(item);
    });

    const dailyForecasts = Object.keys(grouped).map((date) =>
      grouped[date].reduce((prev, curr) => {
        const prevHour = new Date(prev.dt * 1000).getHours();
        const currHour = new Date(curr.dt * 1000).getHours();
        return Math.abs(currHour - 12) < Math.abs(prevHour - 12) ? curr : prev;
      })
    );

    forecastData.value = dailyForecasts.slice(0, 7);
  }

  loading.value = false;
};

const formatDay = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
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
    :format-label="formatDay"
  />
</template>
