<script setup>
import { ref, watch, onUnmounted } from "vue";
import Modal from "./Modal.vue";
import { WEATHER_MAP_LAYERS, layersArray } from "../../constants/mapLayers";
import {
  initMap,
  addWeatherLayer,
  loadLeaflet,
} from "../../helpers/mapInitializer";
import "./styles/MapModal.css";

const props = defineProps({
  isOpen: Boolean,
  lat: Number,
  lon: Number,
  city: String,
});

defineEmits(["close"]);

const selectedLayer = ref(WEATHER_MAP_LAYERS.CLOUDS.id);
const isDropdownOpen = ref(false);
const mapContainerRef = ref(null);
let mapInstance = null;
let weatherLayer = null;

const initializeMap = async () => {
  if (!mapContainerRef.value) return;

  await loadLeaflet();

  mapInstance = initMap(
    window.L,
    mapContainerRef.value,
    props.lat,
    props.lon,
    props.city
  );

  weatherLayer = addWeatherLayer(window.L, mapInstance, selectedLayer.value);
};

const cleanupMap = () => {
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
    weatherLayer = null;
  }
};

watch(
  () => props.isOpen,
  async (isOpen) => {
    if (isOpen) {
      await new Promise((r) => setTimeout(r, 100));
      await initializeMap();
    } else {
      cleanupMap();
    }
  }
);

watch([() => props.lat, () => props.lon], ([lat, lon]) => {
  if (props.isOpen && mapInstance) {
    mapInstance.setView([lat, lon], 10);
  }
});

watch(selectedLayer, (newLayer) => {
  if (!mapInstance) return;

  if (weatherLayer) {
    mapInstance.removeLayer(weatherLayer);
  }

  weatherLayer = addWeatherLayer(window.L, mapInstance, newLayer);
});

onUnmounted(() => {
  cleanupMap();
});

const handleLayerSelect = (layerId) => {
  selectedLayer.value = layerId;
  isDropdownOpen.value = false;
};

const getSelectedLayerName = () =>
  layersArray.find((l) => l.id === selectedLayer.value)?.name ||
  WEATHER_MAP_LAYERS.CLOUDS.name;
</script>

<template>
  <Modal :is-open="isOpen" @close="$emit('close')" title="Map">
    <div class="map-modal-content">
      <div class="map-container" ref="mapContainerRef">
        <div class="map-layer-control">
          <button
            class="layer-control-button"
            @click="isDropdownOpen = !isDropdownOpen"
          >
            <span class="layer-name">{{ getSelectedLayerName() }}</span>
          </button>

          <div v-if="isDropdownOpen" class="layer-control-menu">
            <button
              v-for="layer in layersArray"
              :key="layer.id"
              :class="[
                'layer-control-option',
                { active: selectedLayer === layer.id },
              ]"
              @click="handleLayerSelect(layer.id)"
            >
              {{ layer.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>
