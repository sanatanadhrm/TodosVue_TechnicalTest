<template>
  <button
    class="fixed bottom-5 right-5 w-[56px] h-[56px] bg-[#00A2B9] rounded-full flex items-center justify-center max-[768px]:top-1 max-[768px]:right-2 max-[768px]:bg-white"
    @click="$emit('toggle', content)"
  >
    <img :src="iconSrc" alt="icon" class="w-6 h-6" />
  </button>
</template>

<script>
import edit_icon from "../../assets/edit_note_icon.svg";
import save_icon from "../../assets/save_icon.svg";
import edit_icon_secondary from "../../assets/edit_note_black_icon.svg";
import save_icon_secondary from "../../assets/save_black_icon.svg";
import { useMobileViewStore } from "../../store/MobileViewStore";
import { computed } from "vue";
export default {
  name: "FloatingButtonEditor",
  props: {
    isEditable: {
      type: Boolean,
      required: true,
    },
    content: {
      type: String,
      required: false,
      default: "",
    },
    emits: ["toggle"],
  },
  data() {
    return {
      edit_icon,
      save_icon,
      edit_icon_secondary,
      save_icon_secondary,
    };
  },
  setup(props) {
    const mobileViewStore = useMobileViewStore();
    const isMobileView = computed(() => mobileViewStore.isMobileView);
    // Gunakan computed agar gambar berubah sesuai `isEditable`
    const iconSrc = computed(() => {
      if (props.isEditable === true) {
        return isMobileView.value === true ? save_icon_secondary : save_icon;
      } else if (props.isEditable === false) {
        return isMobileView.value === true ? edit_icon_secondary : edit_icon;
      }
    });
    return { iconSrc };
  },
};
</script>
