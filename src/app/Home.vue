<script setup>
import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import SearchBarInput from "../components/inputs/SearchBarInput.vue";
import LastLocationSection from "../components/sections/LastLocationSection.vue";
import {getWeather} from "../api/openWeather";
import {deleteLastLocation, getLastLocations, getSaveLocationsSetting, saveLastLocation,} from "../store/locations";
import "./styles/Home.css";

const router = useRouter();

const searchValue = ref("");
const lastLocations = ref([]);
const isLoading = ref(false);
const error = ref("");

onMounted(() => {
  const shouldShowLocations = getSaveLocationsSetting();
  if (shouldShowLocations) {
    lastLocations.value = getLastLocations();
  }
});

const handleSearch = async () => {
  if (!searchValue.value.trim()) {
    error.value = "Please enter a city name";
    return;
  }

  isLoading.value = true;
  error.value = "";

  try {
    const weatherData = await getWeather(searchValue.value);

    if (!weatherData) {
      error.value = "City not found. Please try again.";
      isLoading.value = false;
      return;
    }

    const locationData = {
      id: Date.now(),
      city: weatherData.name,
      country: weatherData.sys.country,
      temperature: Math.round(weatherData.main.temp),
      weatherData: weatherData,
    };

    if (getSaveLocationsSetting()) {
      saveLastLocation(locationData);
      lastLocations.value = [locationData, ...lastLocations.value].slice(0, 10);
    }

    router.push({
      path: "/vue-website/weather",
      query: { city: weatherData.name },
    });
  } catch (err) {
    console.error("Error fetching weather:", err);
    error.value = "Something went wrong. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

const handleLocationSelect = (location) => {
  router.push({
    path: "/vue-website/weather",
    query: { city: location.city },
  });
};

const handleLocationDelete = (locationId) => {
  deleteLastLocation(locationId);
  lastLocations.value = lastLocations.value.filter(
    (loc) => loc.id !== locationId
  );
};

const showLastLocations = computed(
  () => getSaveLocationsSetting() && lastLocations.value.length > 0
);
</script>

<template>
  <div class="home-container">
    <div class="search-section">
      <h1 class="search-title">Search a city for weather...</h1>
      <SearchBarInput
        v-model="searchValue"
        @search="handleSearch"
        :disabled="isLoading"
      />
      <p v-if="error" class="error-message">{{ error }}</p>
      <p v-if="isLoading" class="loading-message">Searching...</p>
    </div>

    <LastLocationSection
      v-if="showLastLocations"
      :locations="lastLocations"
      @select="handleLocationSelect"
      @delete="handleLocationDelete"
    />
  </div>
</template>
