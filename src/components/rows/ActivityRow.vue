<script setup>
import "./styles/ActivityRow.css";
import { PUBLIC_URL } from "../../constants/env";

defineProps({
  icon: String,
  name: String,
  value: String,
  quality: String,
});

const getQualityClass = (quality) => {
  if (quality === "Good" || quality === "Low") return "quality-good";
  if (quality === "Moderate") return "quality-moderate";
  return "quality-bad";
};
</script>

<template>
  <div class="activity-row">
    <div class="activity-icon">
      <img :src="`${PUBLIC_URL}/icons/activities/${icon}.svg`" :alt="name" />
    </div>
    <div class="activity-content">
      <span class="activity-name">{{ name }}:</span>
      <span :class="['activity-value', getQualityClass(quality)]">
        {{ value }}
      </span>
    </div>
  </div>
</template>
