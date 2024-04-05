import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos,
  },
  reducers: {
    addTodo(state, action) {},
    deleteTodo(state, action) {},
    toggleTodo(state, action) {},
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
