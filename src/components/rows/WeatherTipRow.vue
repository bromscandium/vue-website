<script setup>
import "./styles/WeatherTipRow.css";

defineProps({
  tip: Array,
});
</script>

<template>
  <div v-if="tip && tip.length" class="tip-row">
    <div class="tip-content">
      <h3 class="tip-title">Small Tip:</h3>
      <p class="tip-text">{{ tip.join('') }}</p>
    </div>
  </div>
</template>
