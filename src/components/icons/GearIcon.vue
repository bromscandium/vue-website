<script setup>
import { PUBLIC_URL } from "../../constants/env";

defineProps({
  width: { type: Number, default: 50 },
  height: { type: Number, default: 50 },
  alt: { type: String, default: "Settings" },
});
</script>

<template>
  <img
    :src="`${PUBLIC_URL}/icons/ui/gear.svg`"
    :width="width"
    :height="height"
    :alt="alt"
  />
</template>
