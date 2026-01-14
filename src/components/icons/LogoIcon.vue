<script setup>
import "./styles/LogoIcon.css";
import { PUBLIC_URL } from "../../constants/env";

defineProps({
  width: { type: Number, default: 50 },
  height: { type: Number, default: 50 },
  alt: { type: String, default: "Logo" },
});
</script>

<template>
  <img
    :src="`${PUBLIC_URL}/logo512.png`"
    class="logo-icon"
    :width="width"
    :height="height"
    :alt="alt"
  />
</template>
