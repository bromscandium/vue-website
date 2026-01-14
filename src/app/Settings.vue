<script setup>
import { ref } from "vue";
import SettingRow from "../components/rows/SettingRow.vue";
import { getUnitsSetting, setUnitsSetting } from "../store/units";
import { UNITS } from "../constants/units";
import {
  getSaveLocationsSetting,
  setSaveLocationsSetting,
} from "../store/locations";
import {
  getTimeFormatSetting,
  setTimeFormatSetting,
} from "../store/timeFormats";
import "./styles/Settings.css";
import { THEMES } from "../constants/themes";
import { getThemeSetting, setThemeSetting } from "../store/theme";

const units = ref(getUnitsSetting());
const saveLocations = ref(getSaveLocationsSetting());
const timeFormat = ref(getTimeFormatSetting());
const theme = ref(getThemeSetting());

const handleUnitsChange = (value) => {
  units.value = value;
  setUnitsSetting(value);
};

const handleSaveLocationsChange = (value) => {
  const boolValue = value === "on";
  saveLocations.value = boolValue;
  setSaveLocationsSetting(boolValue);
};

const handleTimeFormatChange = (value) => {
  timeFormat.value = value;
  setTimeFormatSetting(value);
};

const handleThemeChange = (value) => {
  theme.value = value;
  setThemeSetting(value);
};

const unitsOptions = [
  { label: "Metric (°C, km/h, hPa)", value: UNITS.METRIC },
  { label: "Imperial (°F, mph, inHg)", value: UNITS.IMPERIAL },
];

const locationOptions = [
  { label: "On", value: "on" },
  { label: "Off", value: "off" },
];

const timeOptions = [
  { label: "12-hour", value: "12" },
  { label: "24-hour", value: "24" },
];

const themeOptions = [
  { label: "Light", value: THEMES.LIGHT },
  { label: "Dark", value: THEMES.DARK },
];
</script>

<template>
  <div class="settings-container">
    <div class="settings-section">
      <h2 class="settings-section-title">General</h2>

      <SettingRow
        label="Theme"
        :options="themeOptions"
        :selected-value="theme"
        @change="handleThemeChange"
      />
    </div>

    <div class="settings-section">
      <h2 class="settings-section-title">Units</h2>

      <SettingRow
        label="Units"
        :options="unitsOptions"
        :selected-value="units"
        @change="handleUnitsChange"
      />

      <SettingRow
        label="Time Format"
        :options="timeOptions"
        :selected-value="timeFormat"
        @change="handleTimeFormatChange"
      />
    </div>

    <div class="settings-section">
      <h2 class="settings-section-title">Privacy</h2>

      <SettingRow
        label="Save Last Locations"
        :options="locationOptions"
        :selected-value="saveLocations ? 'on' : 'off'"
        @change="handleSaveLocationsChange"
      />
    </div>
  </div>
</template>
