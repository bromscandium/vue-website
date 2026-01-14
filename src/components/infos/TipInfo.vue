<script setup>
import "./styles/TipInfo.css";

defineProps({
  tip: String,
});
</script>

<template>
  <div v-if="tip" class="tip-info">
    <h3 class="tip-title">Small Tip:</h3>
    <p class="tip-text">{{ tip }}</p>
  </div>
</template>
