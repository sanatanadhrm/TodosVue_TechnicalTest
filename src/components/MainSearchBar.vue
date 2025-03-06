<template>
  <div class="relative w-full">
    <!-- Ikon Pencarian -->
    <img
      src="../assets//search_icon.svg"
      alt="search icon"
      class="absolute top-2 left-3"
    />

    <!-- Input Search -->
    <div class="flex items-center">
      <input
        type="text"
        @input="searchFunction"
        v-model="search"
        placeholder="Cari sesuatu..."
        class="w-full h-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <SearchAddButton v-show="!isMobileView" />
    </div>
  </div>
</template>

<script>
import SearchAddButton from "./Button/SearchAddButton.vue";
import { useMobileViewStore } from "../store/MobileViewStore";
import { useTodoStore } from "../store/TodoStore";
import { computed, ref } from "vue";
export default {
  name: "MainSearchBar",
  components: {
    SearchAddButton,
  },
  setup() {
    const todoStore = useTodoStore();
    const mobileViewStore = useMobileViewStore();
    const isMobileView = computed(() => mobileViewStore.isMobileView);

    const search = ref("");
    const searchFunction = () => {
      todoStore.searchByTitle(search.value);
    };
    return { isMobileView, search, searchFunction };
  },
};
</script>
