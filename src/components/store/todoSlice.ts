import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    tabels: [
      {
        id: Date.now(),
        name: "",
        status: "beforeCreate",
      },
    ],
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push({
        id: Date.now(),
        discription: action.payload.value,
        status: true,
      });
      console.log(action.payload.value, "add");
    },
    deleteTodo(state, action) {
      console.log(action.payload, "delete");
      state.todos = state.todos.filter((el) => el.id !== action.payload);
    },
    toggleTodo(state, action) {
      console.log(action.payload, "toggle");
      const task = state.todos.find((el) => el.id === action.payload);
      task.status = !task.status;
    },
    createTabel(state) {
      console.log("createtable");
      state.tabels.push({
        id: Date.now(),
        name: "",
        status: "beforeCreate",
      });
    },
    changeNameTabel(state, action) {
      console.log(action.payload.id, action.payload.name, "changeNameTabel");
      const tabel = state.tabels.find((el) => el.id === action.payload.id);

      tabel!.name = action.payload.name;
    },
    reorder(state, action) {
      console.log(action.payload, "changeNameTabel");
      state.tabels = [...action.payload];
    },
    changeSatus(state, action) {
      console.log(action.payload.id, action.payload.status, "changeSatus");
      const tabel = state.tabels.find((el) => el.id === action.payload.id);

      tabel!.status = action.payload.status;
    },
    addTask(state, action) {},
  },
});

export const {
  addTodo,
  deleteTodo,
  toggleTodo,
  createTabel,
  changeNameTabel,
  reorder,
  changeSatus,
} = todoSlice.actions;
export default todoSlice.reducer;
