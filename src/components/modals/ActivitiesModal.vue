<script setup>
import Modal from "./Modal.vue";
import ActivityRow from "../rows/ActivityRow.vue";
import { ACTIVITY_ORDER } from "../../constants/activities";
import { buildActivityData } from "../../helpers/activities";
import { getUnitsSetting, getWindSpeedUnit } from "../../store/units";
import "./styles/ActivitiesModal.css";

defineProps({
  isOpen: Boolean,
  weatherData: Object,
  aqi: Number,
});

defineEmits(["close"]);

const units = getUnitsSetting();
</script>

<template>
  <Modal :is-open="isOpen" @close="$emit('close')" title="Activities">
    <div class="activities-grid">
      <ActivityRow
        v-for="activity in ACTIVITY_ORDER"
        :key="activity.id"
        :icon="activity.icon"
        :name="activity.name"
        :value="
          buildActivityData(activity, weatherData, aqi, units, getWindSpeedUnit)
            .value
        "
        :quality="
          buildActivityData(activity, weatherData, aqi, units, getWindSpeedUnit)
            .quality
        "
      />
    </div>
  </Modal>
</template>
