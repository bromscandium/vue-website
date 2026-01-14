<script setup>
import ArrowLeftIcon from "../icons/ArrowLeftIcon.vue";
import "./styles/CityButton.css";
import { useIconSize } from "../../composables/useIconSize";

defineProps({
  city: String,
});

defineEmits(["click"]);

const iconSize = useIconSize(36, 18);
</script>

<template>
  <div class="city-button" role="button" tabindex="0" @click="$emit('click')">
    <ArrowLeftIcon :width="iconSize" :height="iconSize" />
    <span class="city-button-text">{{ city }}</span>
  </div>
</template>
