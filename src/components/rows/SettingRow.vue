<script setup>
import "./styles/SettingRow.css";

defineProps({
  label: String,
  options: Array,
  selectedValue: String,
});

const emit = defineEmits(["change"]);
</script>

<template>
  <div class="setting-row">
    <span class="setting-label">{{ label }}</span>
    <div class="setting-options">
      <button
        v-for="option in options"
        :key="option.value"
        :class="['setting-option', { active: selectedValue === option.value }]"
        @click="emit('change', option.value)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>
