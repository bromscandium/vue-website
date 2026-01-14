import { ref, onMounted, onUnmounted } from "vue";

export const useIconSize = (defaultSize = 24, mobileSize = 18) => {
  const iconSize = ref(defaultSize);

  const updateSize = () => {
    iconSize.value = window.innerWidth <= 540 ? mobileSize : defaultSize;
  };

  onMounted(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateSize);
  });

  return iconSize;
};
