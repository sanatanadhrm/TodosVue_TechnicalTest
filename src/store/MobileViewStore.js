import { defineStore } from "pinia";
import { ref, onMounted, onUnmounted } from "vue";

export const useMobileViewStore = defineStore("mobileViewStore", () => {
  const isMobileView = ref(window.innerWidth <= 768);

  const updateView = () => {
    isMobileView.value = window.innerWidth <= 768;
  };

  onMounted(() => {
    updateView(); // Inisialisasi pertama kali
    window.addEventListener("resize", updateView);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateView);
  });

  return { isMobileView };
});
