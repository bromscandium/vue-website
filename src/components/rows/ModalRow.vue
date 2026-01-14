<script setup>
import TabButton from "../buttons/TabButton.vue";
import "./styles/ModalRow.css";

defineEmits(["detailsClick", "mapClick"]);
</script>

<template>
  <div class="modal-row">
    <TabButton label="Details" @click="$emit('detailsClick')" />
    <TabButton label="Map" @click="$emit('mapClick')" />
  </div>
</template>
