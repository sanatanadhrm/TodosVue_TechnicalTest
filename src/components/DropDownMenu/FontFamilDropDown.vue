<template>
  <ul class="w-[100px] h-full p-2 bg-[#fff] mt-1 shadow-lg rounded-md">
    <li class="mb-2">
      <button
        class="hover:bg-[#F4F7F8] w-full h-full p-1 flex items-center rounded-sm"
        @click="updateFontFamily('Roboto')"
      >
        <span> Roboto </span>
      </button>
    </li>
    <li class="mb-2">
      <button
        class="hover:bg-[#F4F7F8] w-full h-full p-1 flex items-center rounded-sm"
        @click="updateFontFamily('sans-serif')"
      >
        <span> Sans Serif </span>
      </button>
    </li>
    <li class="mb-2">
      <button
        class="hover:bg-[#F4F7F8] w-full h-full p-1 flex items-center rounded-sm"
        @click="updateFontFamily('Comic Sans MS, Comic Sans')"
      >
        <span> Comic </span>
      </button>
    </li>
  </ul>
</template>

<script>
import { useTextEditorStore } from "../../store/TextEditorStore.js";

export default {
  name: "FontFamilDropDown",
  setup() {
    const store = useTextEditorStore();

    const updateFontFamily = (font) => {
      store.setFontFamily(font);
    };

    return { store, updateFontFamily };
  },
};
</script>
