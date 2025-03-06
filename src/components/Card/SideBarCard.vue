<template>
  <div class="relative w-full max-w-md overflow-hidden">
    <button
      class="absolute top-0 right-0 h-full w-16 bg-red-500 text-white flex justify-center items-center rounded-r-xl transition-all duration-300"
      :class="{ 'translate-x-0': isSwiped, 'translate-x-full': !isSwiped }"
      @click="deleteData"
    >
      <img src="../../assets/delete_white_icon.svg" alt="delete" />
    </button>
    <button
      ref="card"
      class="p-4 rounded-xl shadow-md border w-full max-w-md text-start transition-transform duration-300 relative"
      :class="{ '-translate-x-16': isSwiped, 'bg-blue-100': isHighlighted }"
      @touchstart="startSwipe"
      @touchmove="onSwipe"
      @touchend="endSwipe"
      @mousedown="startSwipe"
      @mousemove="onSwipe"
      @mouseup="endSwipe"
      @click="handleClick"
    >
      <h3 class="font-semibold text-lg">{{ title }}</h3>
      <p class="text-gray-600 mt-2 text-sm" v-html="description"></p>
      <p class="text-gray-400 text-xs mt-4">{{ date }}</p>
    </button>
  </div>
</template>

<script>
import { defineProps, ref } from "vue";
import { useTodoStore } from "../../store/TodoStore";

export default {
  name: "SideBarCard",
  props: {
    id: Number,
    title: String,
    description: String,
    date: String,
    isHighlighted: Boolean, // True untuk card yang memiliki highlight biru
  },
  emits: ["toggle"],
  setup(props, { emit }) {
    const todoStore = useTodoStore();
    const isSwiped = ref(false);
    const startX = ref(0);

    // Mulai swipe
    const startSwipe = (event) => {
      startX.value = event.touches ? event.touches[0].clientX : event.clientX;
    };

    // Proses swipe
    const onSwipe = (event) => {
      const currentX = event.touches ? event.touches[0].clientX : event.clientX;
      const deltaX = startX.value - currentX;
      if (deltaX > 50) {
        isSwiped.value = true;
      } else if (deltaX < -50) {
        isSwiped.value = false;
      }
    };

    // Akhiri swipe
    const endSwipe = () => {
      if (!isSwiped.value) return;
    };

    const handleClick = () => {
      if (isSwiped.value) {
        isSwiped.value = false;
        return;
      } else {
        emit("toggle", props.id);
      }
    };

    // Hapus item
    const deleteData = async () => {
      const response = await todoStore.deleteTodo(props.id);
      if (response.status === 200) {
        todoStore.setSelectedId(null);
        isSwiped.value = false;
      }
    };

    return { isSwiped, startSwipe, onSwipe, endSwipe, deleteData, handleClick };
  },
};
</script>
