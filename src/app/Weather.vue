<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import ModalRow from "../components/rows/ModalRow.vue";
import WeatherTipRow from "../components/rows/WeatherTipRow.vue";
import TemperatureInfo from "../components/infos/TemperatureInfo.vue";
import WeatherInfo from "../components/infos/WeatherInfo.vue";
import { getWeather, getAirQuality, getForecast } from "../api/openWeather";
import ActivitiesModal from "../components/modals/ActivitiesModal.vue";
import MapModal from "../components/modals/MapModal.vue";
import { getAirQualityText } from "../helpers/airQuality";
import { getWeatherIcon } from "../helpers/weatherIcon";
import { getWeatherTip } from "../helpers/weatherTips";
import "./styles/Weather.css";
import { getUnitsSetting, getWindSpeedUnit } from "../store/units";

const route = useRoute();
const router = useRouter();

const weatherData = ref(null);
const airQualityData = ref(null);
const loading = ref(true);
const error = ref(null);
const isDetailsOpen = ref(false);
const isMapOpen = ref(false);
const latLon = ref({ lat: null, lon: null });
const weatherTip = ref(null);

const units = getUnitsSetting();

const fetchWeather = async () => {
  const city = route.query.city;
  const timestamp = route.query.timestamp;

  if (!city) {
    router.push("/vue-website/");
    return;
  }

  try {
    loading.value = true;
    let data, lat, lon;

    if (timestamp) {
      const forecastData = await getForecast(city);
      if (!forecastData) {
        error.value = "Failed to fetch forecast data";
        return;
      }

      const targetData = forecastData.list.find(
        (item) => item.dt === parseInt(timestamp)
      );

      if (!targetData) {
        error.value = "Weather data not found";
        return;
      }

      data = { ...targetData, coord: forecastData.city.coord };
      lat = forecastData.city.coord.lat;
      lon = forecastData.city.coord.lon;
    } else {
      data = await getWeather(city);
      if (!data) {
        error.value = "Failed to fetch weather data";
        return;
      }

      lat = data.coord.lat;
      lon = data.coord.lon;
    }

    weatherData.value = data;
    latLon.value = { lat, lon };
    weatherTip.value = getWeatherTip(data, units);

    const aqi = await getAirQuality(lat, lon);
    airQualityData.value = { aqi, text: getAirQualityText(aqi) };
  } catch {
    error.value = "Something went wrong";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchWeather();
});

watch(
  () => [route.query.city, route.query.timestamp],
  () => {
    fetchWeather();
  }
);
</script>

<template>
  <div class="weather-container" v-if="loading">Loading...</div>
  <div class="weather-container" v-else-if="error || !weatherData">
    {{ error || "No data available" }}
  </div>
  <div class="weather-container" v-else>
    <div class="weather-top-row">
      <TemperatureInfo
        :temperature="Math.round(weatherData.main.temp)"
        :real-feel="Math.round(weatherData.main.feels_like)"
        :icon-url="getWeatherIcon(weatherData.weather[0].icon)"
      />
      <WeatherInfo
        :wind="Math.round(weatherData.wind.speed * 3.6)"
        :wind-unit="getWindSpeedUnit(units)"
        :humidity="weatherData.main.humidity"
        :air-quality="airQualityData?.text || 'N/A'"
      />
    </div>

    <WeatherTipRow :tip="weatherTip" />

    <ModalRow
      @details-click="isDetailsOpen = true"
      @map-click="isMapOpen = true"
    />

    <ActivitiesModal
      :is-open="isDetailsOpen"
      @close="isDetailsOpen = false"
      :weather-data="weatherData"
      :aqi="airQualityData?.aqi"
    />

    <MapModal
      :is-open="isMapOpen"
      @close="isMapOpen = false"
      :lat="latLon.lat"
      :lon="latLon.lon"
      :city="route.query.city"
    />
  </div>
</template>
