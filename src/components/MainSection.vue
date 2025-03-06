<template>
  <div
    class="bg-[#F4F7F8] w-full h-full flex justify-center items-center p-[24px] max-[768px]:p-0 overflow-hidden"
  >
    <LayoutEditor
      v-if="(selectedTodo !== null && todoForUpdate !== null) || isCreated"
      :todo="isCreated ? todoForCreate : todoForUpdate"
      :isCreated="isCreated"
      :isEditable="isEditable"
      @toggleEditable="toggleEditable"
      @toggleDelete="toggleDelete"
    />
    <EmptySectionComponent v-else @activatedCreate="activatedCreate" />
    <SuccessNotifiation
      ref="successNotificationRef"
      :message="
        isCreated ? 'Catatan berhasil dibuat' : 'Catatan berhasil diubah'
      "
    />
  </div>
</template>

<script>
import EmptySectionComponent from "./EmptySection/EmptySection.vue";
import LayoutEditor from "./Editor/LayoutEditor.vue";
import { useTodoStore } from "../store/TodoStore.js";
import { computed, watch, ref, onMounted } from "vue";
import SuccessNotifiation from "./Notification/SuccessNotifiation.vue";

export default {
  name: "MainSectionComponent",
  components: {
    EmptySectionComponent,
    LayoutEditor,
    SuccessNotifiation,
  },
  setup() {
    const todoStore = useTodoStore();
    const selectedTodo = computed(() => todoStore.selectedId);
    const isCreated = computed(() => todoStore.isCreated);
    const todoForCreate = computed(() => todoStore.todosCreated);
    const todoForUpdate = computed(() => todoStore.todosUpdated); // Ambil data yang akan diedit
    const isEditable = ref(false);

    const successNotificationRef = ref(null);

    onMounted(() => {
      if (selectedTodo.value) {
        todoStore.fetchTodoById(selectedTodo.value);
      }
    });

    // Watch untuk update todo setiap kali selectedTodo berubah
    watch(selectedTodo, async (newValue) => {
      if (newValue) {
        await todoStore.fetchTodoById(newValue);
      }
    });

    const putData = async (newTitle, newBody) => {
      todoStore.updateTitle(newTitle);
      todoStore.updateBody(newBody);
      const response = await todoStore.updateTodo();
      if (response.status === 200) {
        if (successNotificationRef.value) {
          todoStore.setTodoUpdated();
          successNotificationRef.value.showToast();
        }
      }
    };

    const deleteData = async () => {
      const response = await todoStore.deleteTodo();
      if (response.status === 200) {
        todoStore.setSelectedId(null);
      }
    };

    const createData = async () => {
      const response = await todoStore.createTodo();
      if (response.status === 201) {
        todoStore.setIsDeactivated();
        if (successNotificationRef.value) {
          successNotificationRef.value.showToast();
        }
      }
    };

    const toggleEditable = async (newTitle, newBody) => {
      if (isEditable.value) {
        if (isCreated.value) {
          createData();
        } else {
          putData(newTitle, newBody);
        }
      }
      isEditable.value = !isEditable.value;
    };

    const toggleDelete = async () => {
      if (selectedTodo.value) {
        deleteData();
      }
    };

    const activatedCreate = () => {
      todoStore.setIsActivated();
    };

    return {
      selectedTodo,
      todoForUpdate,
      isEditable,
      toggleEditable,
      successNotificationRef,
      toggleDelete,
      todoForCreate,
      isCreated,
      activatedCreate,
    };
  },
};
</script>
