<template>
  <!-- Sidebar -->
  <aside class="w-fit h-full p-3 space-y-3">
    <MainSearchBar v-show="!isMobileView || !searchActivated" />
    <div
      class="max-h-[80vh] overflow-y-auto space-y-2"
      ref="todoContainer"
      @scroll="handleScroll"
    >
      <div v-for="todo in visibleTodos" :key="todo.id" class="flex flex-col">
        <SideBarCard
          :title="todo.title"
          :description="todo.body"
          :date="todo.date"
          :isHighlighted="todo.isHighlighted"
          :class="
            todo.isHighlighted && todoStore.selectedId !== null
              ? 'border-blue-300 bg-blue-50'
              : 'bg-white'
          "
          :id="todo.id"
          @toggle="toggleHighlight(todo.id)"
        />
      </div>
    </div>
    <SearchAddButton
      v-show="isMobileView"
      class="absolute bottom-8 right-5 z-50"
    />
  </aside>
</template>

<script>
import { onMounted, watch, watchEffect, ref, computed } from "vue";
import MainSearchBar from "./MainSearchBar.vue";
import SideBarCard from "./Card/SideBarCard.vue";
import { useMobileViewStore } from "../store/MobileViewStore.js";
import { useTodoStore } from "../store/TodoStore.js";
import SearchAddButton from "./Button/SearchAddButton.vue";
export default {
  name: "SideBarComponent",
  props: {
    todos: {
      type: Array,
      required: false,
      default: () => [],
    },
    searchActivated: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    MainSearchBar,
    SideBarCard,
    SearchAddButton,
  },
  setup(props) {
    //store
    const todoStore = useTodoStore();
    const mobileViewStore = useMobileViewStore();

    //todos & lists
    const todoContainer = ref(null); // Reference untuk container scroll
    const itemsPerLoad = 10; // Jumlah item yang dimuat per batch
    const loadedItems = ref(itemsPerLoad); // Jumlah item yang sudah dimuat

    // Check apakah aplikasi berada di mode mobile
    const isMobileView = computed(() => mobileViewStore.isMobileView);

    // Lazy loading dengan computed
    const visibleTodos = computed(() =>
      props.todos.slice(0, loadedItems.value)
    );

    watch(
      () => props.todos,
      () => {
        loadedItems.value = itemsPerLoad;
      }
    );
    // Toggle highlight ketika item diklik
    const toggleHighlight = (id) => {
      todoStore.setTodoHighlightFalse();
      if (todoStore.isCreated) {
        todoStore.setIsDeactivated();
      }
      todoStore.setTodoHighlightTrue(id, true);
      if (todoStore.selectedId === id) {
        todoStore.setSelectedId(null);
        return;
      }
      todoStore.setSelectedId(id);
    };

    // Scroll event handler untuk lazy loading
    const handleScroll = () => {
      if (!todoContainer.value) return;

      const { scrollTop, scrollHeight, clientHeight } = todoContainer.value;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        if (loadedItems.value < props.todos.length) {
          loadedItems.value += itemsPerLoad;
        }
      }
    };

    return {
      toggleHighlight,
      visibleTodos,
      todoContainer,
      handleScroll,
      todoStore,
      isMobileView,
    };
  },
};
</script>
