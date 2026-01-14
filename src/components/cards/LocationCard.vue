<script setup>
import "./styles/LocationCard.css";
import DeleteButton from "../buttons/DeleteButton.vue";
import { formatTemperature } from "../../store/units";

const props = defineProps({
  city: String,
  country: String,
  temperature: Number,
  icon: String,
  units: String,
  lastSearched: Number,
});

const emit = defineEmits(["select", "delete"]);

const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) {
    return diffMins === 0 ? "Just now" : `${diffMins}m ago`;
  }
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};

const handleDelete = (event) => {
  event.stopPropagation();
  emit("delete");
};
</script>

<template>
  <div class="location-card">
    <div class="location-info" @click="emit('select')">
      <div class="location-header">
        <h3 class="location-city">{{ city }}</h3>
        <DeleteButton @click="handleDelete" />
      </div>
      <p class="location-country">{{ country }}</p>
      <p v-if="lastSearched" class="location-time">
        {{ formatDate(lastSearched) }}
      </p>
    </div>

    <div class="location-weather" @click="emit('select')">
      <div class="weather-icon">
        <img v-if="icon" :src="icon" alt="Weather" />
      </div>
      <span class="weather-temperature">
        {{ formatTemperature(Math.round(temperature), units) }}
      </span>
    </div>
  </div>
</template>
