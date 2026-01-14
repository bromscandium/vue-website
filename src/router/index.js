import { createRouter, createWebHistory } from "vue-router";
import Home from "../app/Home.vue";
import Weather from "../app/Weather.vue";
import Settings from "../app/Settings.vue";
import DayForecast from "../app/DayForecast.vue";
import WeekForecast from "../app/WeekForecast.vue";
import HeaderLayout from "../components/layouts/HeaderLayout.vue";
import Tabs from "../components/layouts/Tabs.vue";

const routes = [
  {
    path: "/vue-website/",
    component: HeaderLayout,
    children: [
      { path: "", component: Home },
      { path: "settings", component: Settings },
      {
        path: "",
        component: Tabs,
        children: [
          { path: "weather", component: Weather },
          { path: "day-forecast", component: DayForecast },
          { path: "week-forecast", component: WeekForecast },
        ],
      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
