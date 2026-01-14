<script setup>
defineProps({
  width: { type: Number, default: 24 },
  height: { type: Number, default: 24 },
  color: { type: String, default: "currentColor" },
});
</script>

<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    fill="none"
    :stroke="color"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
</template>
