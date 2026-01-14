<script setup>
import { getUnitsSetting } from "../../store/units";
import "./styles/TemperatureInfo.css";

defineProps({
  temperature: [Number, String],
  realFeel: [Number, String],
  iconUrl: String,
});

const units = getUnitsSetting();
const unitSymbol = units === "imperial" ? "°F" : "°C";
</script>

<template>
  <div class="temperature-info">
    <div class="weather-icon-large">
      <img :src="iconUrl" alt="Weather icon" class="weather-icon-img" />
    </div>
    <div class="temperature-display">
      <span class="temperature-value">{{ temperature }}{{ unitSymbol }}</span>
      <span class="real-feel">RealFeel: {{ realFeel }}{{ unitSymbol }}</span>
    </div>
  </div>
</template>
