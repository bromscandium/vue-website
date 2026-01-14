<script setup>
import "./styles/SearchBarInput.css";
import MagnifyingGlassIcon from "../icons/MagnifyingGlassIcon.vue";
import { useIconSize } from "../../composables/useIconSize";

const model = defineModel({ type: String, default: "" });

defineProps({
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["search"]);

const iconSize = useIconSize(20, 10);

const handleSubmit = (e) => {
  e.preventDefault();
  emit("search");
};
</script>

<template>
  <form class="search-bar" @submit="handleSubmit">
    <input
      type="text"
      class="search-input"
      placeholder="Write a city here"
      v-model="model"
      :disabled="disabled"
    />
    <button class="search-button" :disabled="disabled" @click="handleSubmit">
      <MagnifyingGlassIcon :width="iconSize" :height="iconSize" />
    </button>
  </form>
</template>
