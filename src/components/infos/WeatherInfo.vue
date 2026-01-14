<script setup>
import "./styles/WeatherInfo.css";

defineProps({
  wind: [Number, String],
  humidity: [Number, String],
  airQuality: String,
  windUnit: String,
});

const getAirQualityClass = (quality) => {
  if (quality === "Good") return "quality-good";
  if (quality === "Moderate") return "quality-moderate";
  return "quality-poor";
};
</script>

<template>
  <div class="weather-info">
    <div class="info-item">
      <span class="info-label">Wind:</span>
      <span class="info-value">{{ wind }} {{ windUnit }}</span>
    </div>
    <div class="info-item">
      <span class="info-label">Humidity:</span>
      <span class="info-value">{{ humidity }}%</span>
    </div>
    <div class="info-item">
      <span class="info-label">Air Quality:</span>
      <span :class="['info-value', getAirQualityClass(airQuality)]">
        {{ airQuality || "Loading..." }}
      </span>
    </div>
  </div>
</template>
