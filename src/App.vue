<script setup>
import { onMounted } from "vue";
import { initializeTheme } from "./store/theme";

onMounted(() => {
  initializeTheme();
});
</script>

<template>
  <router-view />
</template>
