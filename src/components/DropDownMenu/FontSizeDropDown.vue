<template>
  <div
    class="flex items-center space-x-2 w-fit h-[40px] p-2 bg-[#fff] border rounded-md mt-1 shadow-lg"
  >
    <!-- <button
      class="hover:bg-[#F4F7F8] w-[25px] h-full p-1 text-center flex items-center justify-center rounded-sm"
    >
      -
    </button> -->
    <input
      type="number"
      v-model="fontSize"
      class="w-[50px] h-[20px] border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
    />
    <!-- <button
      class="hover:bg-[#F4F7F8] w-[25px] h-full p-1 text-center flex items-center justify-center rounded-sm"
    >
      +
    </button> -->
  </div>
</template>

<script>
import { ref, watch, computed } from "vue";
import { useTextEditorStore } from "../../store/TextEditorStore.js";

export default {
  name: "FontSizeDropDown",
  setup() {
    const store = useTextEditorStore();
    // Gunakan computed untuk binding ke v-model
    const fontSize = computed({
      get: () => store.fontSize,
      set: (value) => store.setFontSize(Number(value) || 11), // Convert input ke number
    });
    return { store, fontSize };
  },
};
</script>
