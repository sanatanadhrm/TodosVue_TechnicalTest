<template>
  <div
    class="flex flex-col w-fit h-full p-2 space-y-2 bg-[#fff] mt-1 shadow-lg rounded-md"
  >
    <button
      class="hover:bg-[#F4F7F8] w-[30px] h-[30px] p-1 rounded-sm"
      @click="updateTextAlign('left')"
    >
      <img :src="formatAlignLeft" alt="align left" class="w-[24px] h-[24px]" />
    </button>
    <button
      class="hover:bg-[#F4F7F8] w-[30px] h-[30px] p-1 rounded-sm"
      @click="updateTextAlign('center')"
    >
      <img
        :src="formatAlignCenter"
        alt="align center"
        class="w-[24px] h-[24px]"
      />
    </button>
    <button
      class="hover:bg-[#F4F7F8] w-[30px] h-[30px] p-1 rounded-sm"
      @click="updateTextAlign('right')"
    >
      <img
        :src="formatAlignRight"
        alt="align right"
        class="w-[24px] h-[24px]"
      />
    </button>
    <button
      class="hover:bg-[#F4F7F8] w-[30px] h-[30px] p-1 rounded-sm"
      @click="updateTextAlign('justify')"
    >
      <img
        :src="formatAlignJustify"
        alt="align justify"
        class="w-[24px] h-[24px]"
      />
    </button>
  </div>
</template>

<script>
import formatAlignLeft from "../../assets/format_align_left.svg";
import formatAlignCenter from "../../assets/format_align_center.svg";
import formatAlignRight from "../../assets/format_align_right.svg";
import formatAlignJustify from "../../assets/format_align_justify.svg";
import { useTextEditorStore } from "../../store/TextEditorStore.js";
export default {
  name: "AlignTextDropDown",
  data() {
    return {
      formatAlignLeft,
      formatAlignCenter,
      formatAlignRight,
      formatAlignJustify,
    };
  },
  setup() {
    const store = useTextEditorStore();

    const updateTextAlign = (text) => {
      store.setTextAlign(text);
    };

    return { store, updateTextAlign };
  },
};
</script>
