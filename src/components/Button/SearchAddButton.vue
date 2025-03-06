<template>
  <button
    class="w-[48px] h-[40px] text-center ml-3 sm:rounded-full max-[768px]:bg-[#00A2B9] bg-[#F4F7F8] rounded-lg max-[768px]:rounded-full max-[768px]:w-[56px] max-[768px]:h-[56px]"
    @click="activatedCreate"
  >
    <img src="../../assets/add_icon.svg" alt="add icon" class="inline-block" />
  </button>
</template>

<script>
import { useTodoStore } from "../../store/TodoStore";
export default {
  name: "SearchAddButton",
  setup() {
    const todoStore = useTodoStore();
    const activatedCreate = () => {
      todoStore.setIsActivated();
      todoStore.setSelectedId(null);
    };
    return { activatedCreate };
  },
};
</script>
