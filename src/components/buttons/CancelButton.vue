<script setup>
import CrossIcon from "../icons/CrossIcon.vue";
import { useIconSize } from "../../composables/useIconSize";

defineEmits(["click"]);

const iconSize = useIconSize(40, 20);
</script>

<template>
  <button @click="$emit('click')" aria-label="Cancel">
    <CrossIcon :width="iconSize" :height="iconSize" />
  </button>
</template>
