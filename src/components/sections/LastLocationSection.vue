<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import LocationCard from "../cards/LocationCard.vue";
import "./styles/LastLocationSection.css";
import ArrowRightIcon from "../icons/ArrowRightIcon.vue";
import ArrowLeftIcon from "../icons/ArrowLeftIcon.vue";
import { getWeatherIcon } from "../../helpers/weatherIcon";
import { useIconSize } from "../../composables/useIconSize";

const props = defineProps({
  locations: Array,
});

const emit = defineEmits(["select", "delete"]);

const currentIndex = ref(0);
const itemsPerView = ref(3);
const canScrollLeft = ref(false);
const canScrollRight = ref(true);
const scrollContainerRef = ref(null);

const iconSize = useIconSize(24, 12);

const updateItems = () => {
  if (window.innerWidth <= 768) itemsPerView.value = 2;
  else itemsPerView.value = 3;
};

const updateScrollButtons = () => {
  const el = scrollContainerRef.value;
  if (!el) return;

  canScrollLeft.value = el.scrollLeft > 0;
  canScrollRight.value = el.scrollLeft < el.scrollWidth - el.clientWidth - 10;
};

const scrollToIndex = (index) => {
  const el = scrollContainerRef.value;
  if (!el) return;

  const scrollPosition = index * 220;
  el.scrollTo({ left: scrollPosition, behavior: "smooth" });
  currentIndex.value = index;
};

const scrollLeft = () => {
  scrollToIndex(Math.max(0, currentIndex.value - 1));
};

const scrollRight = () => {
  const maxIndex = Math.max(0, props.locations.length - itemsPerView.value);
  scrollToIndex(Math.min(maxIndex, currentIndex.value + 1));
};

const showArrows = () => props.locations.length > itemsPerView.value;

onMounted(() => {
  updateItems();
  window.addEventListener("resize", updateItems);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateItems);
});

watch(
  [currentIndex, () => props.locations, itemsPerView],
  () => {
    updateScrollButtons();
  },
  { immediate: true }
);
</script>

<template>
  <div v-if="locations?.length" class="last-locations-section">
    <div class="locations-carousel">
      <button
        v-if="showArrows()"
        class="carousel-arrow carousel-arrow-left"
        :disabled="!canScrollLeft"
        @click="scrollLeft"
      >
        <ArrowLeftIcon :width="iconSize" :height="iconSize" />
      </button>

      <div
        class="locations-row"
        ref="scrollContainerRef"
        @scroll="updateScrollButtons"
      >
        <LocationCard
          v-for="location in locations"
          :key="location.id"
          :city="location.city"
          :country="location.country"
          :temperature="location.temperature"
          :last-searched="location.lastSearched"
          :units="location.savedUnits"
          :icon="
            location.weatherData?.weather?.[0]?.icon
              ? getWeatherIcon(location.weatherData.weather[0].icon)
              : null
          "
          @select="emit('select', location)"
          @delete="emit('delete', location.id)"
        />
      </div>

      <button
        v-if="showArrows()"
        class="carousel-arrow carousel-arrow-right"
        :disabled="!canScrollRight"
        @click="scrollRight"
      >
        <ArrowRightIcon :width="iconSize" :height="iconSize" />
      </button>
    </div>
  </div>
</template>
