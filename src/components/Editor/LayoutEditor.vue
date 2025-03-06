<template>
  <div
    class="w-full h-full flex justify-center items-center flex-col bg-white px-[24px] space-y-[24px]"
  >
    <div class="flex justify-between items-center w-full mt-[24px]">
      <input
        type="text"
        @input="updateTitle"
        v-model="text"
        placeholder="Judul Catatan"
        class="font-Nunito text-[24px] font-semibold outline-none bg-transparent w-full"
        v-if="isEditable"
      />
      <span
        v-else
        class="font-Nunito text-[24px] font-semibold outline-none bg-transparent w-full"
      >
        {{ text || "Tidak ada judul" }}
      </span>
      <button
        @click="$emit('toggleDelete')"
        class="hover:bg-[#F4F7F8] p-[8px] rounded-lg"
        v-show="!isCreated && !isMobileView"
      >
        <img
          src="../../assets/delete_icon.svg"
          alt="delete"
          class="w-[24px] h-[24px]"
        />
      </button>
    </div>
    <div class="w-full border-t border-[#EFEFEF] my-4"></div>

    <TiptapEditor
      :todoBody="todoBody"
      :isEditable="isEditable"
      :toggleEdit="toggleEdit"
    />
  </div>
</template>

<script>
import TiptapEditor from "./TiptapEditor.vue";
import { useMobileViewStore } from "../../store/MobileViewStore";

import { watch, ref, computed } from "vue";

export default {
  name: "LayoutEditor",
  props: {
    todo: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    isEditable: {
      type: Boolean,
      required: false,
      default: false,
    },
    isCreated: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["toggleEditable", "toggleDelete"],
  components: {
    TiptapEditor,
  },
  setup(props, { emit }) {
    const text = ref("");
    const todoBody = ref("");
    const mobileViewStore = useMobileViewStore();
    const isMobileView = computed(() => mobileViewStore.isMobileView);
    watch(
      () => props.todo,
      (newValue) => {
        if (newValue) {
          text.value = newValue.title;
          todoBody.value = newValue.body;
        }
      },
      { immediate: true }
    );

    const updateTitle = (e) => {
      text.value = e.target.value;
    };

    const toggleEdit = (newBody) => {
      emit("toggleEditable", text.value, newBody); // Panggil emit agar parent menangani perubahan isEditable
    };

    return {
      text,
      todoBody,
      updateTitle,
      toggleEdit,
      isMobileView,
    };
  },
};
</script>
