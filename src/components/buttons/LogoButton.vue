<script setup>
import LogoIcon from "../icons/LogoIcon.vue";
import { useIconSize } from "../../composables/useIconSize";

defineEmits(["click"]);

const iconSize = useIconSize(40, 20);
</script>

<template>
  <button @click="$emit('click')" aria-label="Home">
    <LogoIcon :width="iconSize" :height="iconSize" />
  </button>
</template>
