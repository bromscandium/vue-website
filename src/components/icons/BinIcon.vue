<script setup>
import { PUBLIC_URL } from "../../constants/env";

defineProps({
  width: { type: Number, default: 50 },
  height: { type: Number, default: 50 },
  alt: { type: String, default: "Bin" },
});
</script>

<template>
  <img
    :src="`${PUBLIC_URL}/icons/ui/bin.svg`"
    :width="width"
    :height="height"
    :alt="alt"
  />
</template>
