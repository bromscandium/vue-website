<script setup>
import { useRouter, useRoute } from "vue-router";
import TabButton from "../buttons/TabButton.vue";
import "./styles/TabRow.css";
import { tabs } from "../../constants/tabs";

const props = defineProps({
  city: String,
});

const router = useRouter();
const route = useRoute();

const handleTabClick = (path) => {
  router.push(`${path}?city=${encodeURIComponent(props.city)}`);
};
</script>

<template>
  <div class="tab-row">
    <TabButton
      v-for="tab in tabs"
      :key="tab.path"
      :label="tab.label"
      :active="route.path === tab.path"
      @click="handleTabClick(tab.path)"
    />
  </div>
</template>
