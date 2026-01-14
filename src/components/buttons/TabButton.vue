<script setup>
import "./styles/TabButton.css";

defineProps({
  label: String,
  active: Boolean,
});

defineEmits(["click"]);
</script>

<template>
  <button :class="['tab-button', { active }]" @click="$emit('click')">
    {{ label }}
  </button>
</template>
