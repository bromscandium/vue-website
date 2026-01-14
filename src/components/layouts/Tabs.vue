<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import TabRow from "../rows/TabRow.vue";
import "./styles/Tabs.css";

const route = useRoute();
const city = computed(() => route.query.city);
</script>

<template>
  <div class="tabs-layout">
    <TabRow :city="city" />
    <router-view />
  </div>
</template>
