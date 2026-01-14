<script setup>
import BinIcon from "../icons/BinIcon.vue";
import { useIconSize } from "../../composables/useIconSize";

defineEmits(["click"]);

const iconSize = useIconSize(22, 16);
</script>

<template>
  <button @click="$emit('click', $event)">
    <BinIcon :width="iconSize" :height="iconSize" />
  </button>
</template>
