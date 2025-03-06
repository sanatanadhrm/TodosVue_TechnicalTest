<script setup>
import { ref, computed, onMounted, watch } from "vue";
import HeaderComponent from "./components/MainHeader.vue";
import SideBarComponent from "./components/MainSideBar.vue";
import MainSectionComponent from "./components/MainSection.vue";
import { useTodoStore } from "./store/TodoStore.js";
import { useMobileViewStore } from "./store/MobileViewStore.js";

const todoStore = useTodoStore();
const mobileViewStore = useMobileViewStore();
const isMobileView = computed(() => mobileViewStore.isMobileView);
const selectedTodoId = computed(() => todoStore.selectedId);
const searchActivated = ref(false);

const todos = computed(() => todoStore.todosValue); // Reactive state untuk menyimpan todo list

onMounted(() => {
  todoStore.fetchTodos();
});

const popSearchBar = () => {
  searchActivated.value = !searchActivated.value;
};
</script>
<template>
  <div class="h-screen flex flex-col">
    <!-- Header -->
    <header class="h-[10%] max-[768px]:h-[7%]">
      <HeaderComponent @popSearchBar="popSearchBar" />
    </header>

    <section class="flex h-[90%] max-[768px]:h-[95%] overflow-hidden">
      <!-- Jika Mobile: Tampilkan Sidebar atau MainSection berdasarkan selectedTodo -->
      <SideBarComponent
        v-if="isMobileView && !selectedTodoId && !todoStore.isCreated"
        :searchActivated="searchActivated"
        :todos="todos"
      />

      <div
        v-if="isMobileView && (selectedTodoId || todoStore.isCreated)"
        class="relative w-full"
      >
        <!-- <button
          @click="goBackToSidebar"
          class="absolute top-2 left-2 bg-gray-300 px-4 py-2 rounded-md"
        >
          ← Back
        </button> -->
        <MainSectionComponent />
      </div>

      <!-- Jika Desktop: Sidebar dan MainSection tampil bersamaan -->
      <template v-if="!isMobileView">
        <SideBarComponent :todos="todos" />
        <MainSectionComponent />
      </template>
    </section>
  </div>
</template>
