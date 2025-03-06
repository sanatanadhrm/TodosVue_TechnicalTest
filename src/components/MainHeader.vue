<template>
  <header class="p-4 flex items-center justify-between">
    <div class="flex items-center space-x-2">
      <img
        alt="Vue logo"
        src="../assets/logo.svg"
        class="h-[40px]"
        v-show="!isMobileView"
      />
      <h1
        v-if="
          !isMobileView ||
          (isMobileView && todoStore.selectedId == null && !todoStore.isCreated)
        "
        class="text-[16px] font-[500] font-Roboto"
      >
        Catatan
      </h1>
      <button v-else @click="backFunction">
        <img
          alt="Vue logo"
          src="../assets/arrow_back.svg"
          class="h-[40px]"
          v-show="isMobileView"
        />
      </button>
    </div>
    <button v-show="isMobileView" @click="$emit('popSearchBar')">
      <img alt="search icon" src="../assets/search_icon.svg" class="h-[24px]" />
    </button>
  </header>
</template>

<script>
import { useMobileViewStore } from "../store/MobileViewStore";
import { computed } from "vue";
import { useTodoStore } from "../store/TodoStore";
export default {
  name: "HeaderComponent",
  emits: ["popSearchBar"],
  setup() {
    const todoStore = useTodoStore();

    const mobileViewStore = useMobileViewStore();
    const isMobileView = computed(() => mobileViewStore.isMobileView);

    const backFunction = () => {
      todoStore.setSelectedId(null);
      todoStore.setIsDeactivated();
    };
    return {
      todoStore,
      isMobileView,
      backFunction,
    };
  },
};
</script>
