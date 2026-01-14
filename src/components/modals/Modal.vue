<script setup>
import { watch, onUnmounted } from "vue";
import CancelButton from "../buttons/CancelButton.vue";
import "./styles/Modal.css";

const props = defineProps({
  isOpen: Boolean,
  title: String,
});

const emit = defineEmits(["close"]);

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }
);

onUnmounted(() => {
  document.body.style.overflow = "unset";
});

const handleBackdropClick = (e) => {
  if (e.target === e.currentTarget) {
    emit("close");
  }
};
</script>

<template>
  <div v-if="isOpen" class="modal-backdrop" @click="handleBackdropClick">
    <div class="modal-container">
      <div class="modal-header">
        <CancelButton @click="emit('close')" />
        <h2 class="modal-title">{{ title }}</h2>
        <div class="modal-header-spacer"></div>
      </div>
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
