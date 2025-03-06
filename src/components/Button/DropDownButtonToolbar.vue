<template>
  <div class="relative">
    <button class="flex items-center space-x-2" @click="toggleDropdown">
      <slot name="label"></slot>
      <!-- Slot untuk ikon -->
      <slot name="icon"></slot>
      <!-- Slot untuk teks -->
    </button>

    <div
      v-if="isOpen"
      class="absolute bg-white mt-2 w-fit z-50 max-[768px]:mb-11 max-[768px]:bottom-0"
    >
      <slot name="dropdown"></slot>
      <!-- Slot untuk isi dropdown -->
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "DropDownButtonToolbar",
  props: {
    title: String,
  },
  setup(props) {
    const isOpen = ref(false);
    const toggleDropdown = () => (isOpen.value = !isOpen.value);

    console.log(props.title);
    return { isOpen, toggleDropdown };
  },
};
</script>
