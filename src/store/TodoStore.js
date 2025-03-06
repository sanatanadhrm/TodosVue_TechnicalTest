import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import axios from "axios";

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    selectedId: ref(null),
    todosUpdated: ref({
      id: null,
      title: "",
      body: "",
      date: "",
    }),
    isCreated: ref(false),
    todosCreated: ref({
      title: "",
      body: "tulis sesuatu disini....",
    }),
    todosValue: ref([]),
    originalTodosValue: ref([]), // Tambahkan ini untuk menyimpan data asli

  }),
  actions: {
    setSelectedId(id) {
      this.selectedId = id;
    },
    setIsActivated(){
      this.isCreated = true;
    },
    setIsDeactivated(){
      this.isCreated = false;
    },

    setTodoHighlightTrue(id, isHighlighted) {
      const todo = this.todosValue.find((todo) => todo.id === id);
      if (todo) {
        todo.isHighlighted = isHighlighted;
      }
    },

    setTodoHighlightFalse() {
      this.todosValue.forEach((todo) => {
        todo.isHighlighted = false;
      });
    },

    setTodoUpdated(){
      this.todosValue.forEach((todo) => {
        if(todo.id === this.todosUpdated.id){
          todo.title = this.todosUpdated.title;
          todo.body = this.todosUpdated.body;
        }
      });
    },
    async fetchTodos() {
      try {
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");

        const todos = data.map((todo) => ({
          ...todo,
          date: new Date().toLocaleDateString("id-ID"), // Format tanggal lokal
          isHighlighted: false,
        }));
        this.todosValue = todos;
        this.originalTodosValue = [...todos]; // Simpan data asli

        return todos; // Mengembalikan hasil fetch
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },

    async fetchTodoById(id) {
      try {
        const { status } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (status !== 200) {
          throw new Error("Data tidak ditemukan!");
        }
        
        const data = this.todosValue.find((todo) => todo.id === id);
        this.todosUpdated = { ...data, date: new Date().toLocaleDateString("id-ID") };
      } catch (error) {
        console.error("Error fetching post by id:", error);
      }
    },

    updateTitle(newTitle) {
      this.todosUpdated.title = newTitle;
    },

    updateBody(newBody) {
      this.todosUpdated.body = newBody;
    },

    searchByTitle(title) {
      if (!title) {
        this.todosValue = [...this.originalTodosValue]; // Kembalikan data asli jika kosong
        return;
      }
      this.todosValue = this.originalTodosValue.filter((todo) =>
        todo.title.toLowerCase().includes(title.toLowerCase())
      );
    },
    
    async updateTodo() {
      try {
        if (!this.todosUpdated.id) {
          throw new Error("ID todo tidak ditemukan!");
        }
    
    
        const response = await axios.put(
          `https://jsonplaceholder.typicode.com/posts/${this.todosUpdated.id}`,
          {
            title: this.todosUpdated.title,
            body: this.todosUpdated.body,
          }
        );

        if(response.status === 200){
          this.todosValue.forEach((todo) => {
            if(todo.id === this.todosUpdated.id){
              todo.title = this.todosUpdated.title;
              todo.body = this.todosUpdated.body;
            }
          });
        }
        
    
        return response;
      } catch (error) {
        console.error("Error updating post:", error);
      }
    },

    async deleteTodo(id) {
      try {
        const response = await axios.delete(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        if(response.status === 200){
          this.todosValue = this.todosValue.filter((todo) => todo.id !== id);
        }
        return response;
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    },

    async createTodo() {
      try {
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          {
            title: this.todosCreated.title,
            body: this.todosCreated.body,
          }
        );

        if(response.status === 201){
          const newTodo = {
            id: response.data.id + Math.floor(Math.random()*1000),
            title: this.todosCreated.title,
            body: this.todosCreated.body,
            date: new Date().toLocaleDateString("id-ID"),
            isHighlighted: false,
          };
          this.todosValue.unshift(newTodo);
        }
    
        return response;
      } catch (error) {
        console.error("Error posting post:", error);
      }
    } 
  },
});
