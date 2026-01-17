<script setup>
import "./styles/CityButton.css";

defineProps({
  city: String,
});

defineEmits(["click"]);

</script>

<template>
  <div class="city-button" role="button" tabindex="0" @click="$emit('click')">
    <span class="city-button-text">{{ city }}</span>
  </div>
</template>
