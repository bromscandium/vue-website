<script setup>
import { useRouter } from "vue-router";
import { getWeatherIcon } from "../../helpers/weatherIcon";
import "./styles/ForecastCard.css";
import { getUnitsSetting, getWindSpeedUnit } from "../../store/units";

const props = defineProps({
  city: String,
  temp: Number,
  icon: String,
  time: String,
  realFeel: [Number, String],
  wind: [Number, String],
  humidity: [Number, String],
  timestamp: Number,
});

const router = useRouter();

const handleClick = () => {
  router.push(
    `/vue-website/weather?city=${encodeURIComponent(props.city)}&timestamp=${props.timestamp}`
  );
};
</script>

<template>
  <div class="forecast-card" @click="handleClick">
    <div class="forecast-time">{{ time }}</div>
    <img
      class="forecast-icon"
      :src="getWeatherIcon(icon)"
      alt="weather icon"
    />
    <div class="forecast-temp">{{ Math.round(temp) }}°</div>

    <div class="forecast-details">
      <div class="forecast-detail">
        <span class="forecast-label">RealFeel:</span>
        <span class="forecast-value">{{ realFeel }}°</span>
      </div>
      <div class="forecast-detail">
        <span class="forecast-label">Wind:</span>
        <span class="forecast-value">
          {{ wind }} {{ getWindSpeedUnit(getUnitsSetting()) }}
        </span>
      </div>
      <div class="forecast-detail">
        <span class="forecast-label">Humidity:</span>
        <span class="forecast-value">{{ humidity }}%</span>
      </div>
    </div>
  </div>
</template>
