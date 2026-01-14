<script setup>
import GearIcon from "../icons/GearIcon.vue";
import { useIconSize } from "../../composables/useIconSize";

defineEmits(["click"]);

const iconSize = useIconSize(40, 20);
</script>

<template>
  <button @click="$emit('click')" aria-label="Settings">
    <GearIcon :width="iconSize" :height="iconSize" />
  </button>
</template>
