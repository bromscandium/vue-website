<script setup>
import { computed } from "vue";
import "./styles/Header.css";
import { useRouter, useRoute } from "vue-router";
import SettingsButton from "../buttons/SettingsButton.vue";
import LogoButton from "../buttons/LogoButton.vue";
import CancelButton from "../buttons/CancelButton.vue";
import CityButton from "../buttons/CityButton.vue";

const router = useRouter();
const route = useRoute();

const isSettings = computed(() => route.path === "/vue-website/settings");
const city = computed(() => route.query.city);
</script>

<template>
  <header class="header">
    <div class="header-left">
      <CancelButton v-if="isSettings" @click="router.go(-1)" />
      <SettingsButton v-else @click="router.push('/vue-website/settings')" />
    </div>

    <div class="header-center">
      <CityButton
        v-if="city"
        :city="city"
        @click="router.push('/vue-website')"
      />
      <h1 v-else class="header-title">
        {{ isSettings ? "Settings" : "Weather App" }}
      </h1>
    </div>

    <div class="header-right">
      <LogoButton @click="router.push('/vue-website')" />
    </div>
  </header>
</template>
