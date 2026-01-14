<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import ArrowLeftIcon from "../icons/ArrowLeftIcon.vue";
import ArrowRightIcon from "../icons/ArrowRightIcon.vue";
import ForecastCard from "../cards/ForecastCard.vue";
import "./styles/ForecastSection.css";
import { useIconSize } from "../../composables/useIconSize";

const props = defineProps({
  forecastData: Array,
  city: String,
  formatLabel: Function,
});

const currentIndex = ref(0);
const itemsPerView = ref(3);
const scrollContainerRef = ref(null);

const iconSize = useIconSize(24, 12);

const updateItems = () => {
  if (window.innerWidth <= 768) itemsPerView.value = 2;
  else itemsPerView.value = 3;
};

const scrollToIndex = (index) => {
  if (!scrollContainerRef.value) return;
  scrollContainerRef.value.scrollTo({
    left: index * 190,
    behavior: "smooth",
  });
  currentIndex.value = index;
};

const scrollLeft = () => scrollToIndex(Math.max(0, currentIndex.value - 1));

const scrollRight = () => {
  const maxIndex = Math.max(0, props.forecastData.length - itemsPerView.value);
  scrollToIndex(Math.min(maxIndex, currentIndex.value + 1));
};

const canScrollLeft = computed(() => currentIndex.value > 0);
const canScrollRight = computed(
  () => currentIndex.value < props.forecastData.length - itemsPerView.value
);

onMounted(() => {
  updateItems();
  window.addEventListener("resize", updateItems);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateItems);
});
</script>

<template>
  <div class="forecast-page">
    <div class="forecast-container">
      <button
        class="forecast-arrow"
        @click="scrollLeft"
        :disabled="!canScrollLeft"
      >
        <ArrowLeftIcon :width="iconSize" :height="iconSize" />
      </button>

      <div class="forecast-scroll" ref="scrollContainerRef">
        <ForecastCard
          v-for="item in forecastData"
          :key="item.dt"
          :city="city"
          :time="formatLabel(item.dt)"
          :icon="item.weather?.[0]?.icon"
          :temp="Math.round(item.main?.temp)"
          :real-feel="Math.round(item.main?.feels_like)"
          :wind="Math.round(item.wind?.speed)"
          :humidity="item.main?.humidity"
          :timestamp="item.dt"
        />
      </div>

      <button
        class="forecast-arrow"
        @click="scrollRight"
        :disabled="!canScrollRight"
      >
        <ArrowRightIcon :width="iconSize" :height="iconSize" />
      </button>
    </div>
  </div>
</template>
