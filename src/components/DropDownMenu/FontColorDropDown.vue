<template>
  <div
    class="grid grid-cols-3 gap-6 h-full p-2 bg-[#fff] mt-1 shadow-lg rounded-md"
  >
    <button>
      <div
        class="p-2 bg-black rounded-lg w-[20px] h-[20px] border-2 border-[#bbb]"
        @click="updateFontColor('#000')"
      ></div>
    </button>
    <button>
      <div
        class="p-2 bg-white rounded-lg w-[20px] h-[20px] border-2 border-[#bbb]"
        @click="updateFontColor('#fff')"
      ></div>
    </button>
    <button>
      <div
        class="p-2 bg-yellow-300 rounded-lg w-[20px] h-[20px] border-2 border-[#bbb]"
        @click="updateFontColor('#FFD700')"
      ></div>
    </button>
  </div>
</template>

<script>
import { useTextEditorStore } from "../../store/TextEditorStore.js";
export default {
  name: "FontColorDropDown",
  setup() {
    const store = useTextEditorStore();

    const updateFontColor = (color) => {
      store.setFontColor(color);
    };

    return { store, updateFontColor };
  },
};
</script>
