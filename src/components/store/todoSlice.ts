import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
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
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
