import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TaskTodo } from "../types/baseTypes";
/* eslint-disable no-param-reassign */

type TodosState = {
  todos: TaskTodo[];
};
const initialState: TodosState = {
  todos: [],
};
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.todos.push({
        id: Date.now(),
        discription: action.payload,
        status: true,
      });
      console.log(action.payload, "add");
    },
    deleteTodo(state, action: PayloadAction<number>) {
      console.log(action.payload, "delete");
      state.todos = state.todos.filter((el) => el.id !== action.payload);
    },
    deleteCompletedTodos(state) {
      state.todos = state.todos.filter((el) => el.status);
    },
    toggleTodo(state, action) {
      console.log(action.payload, "toggle");
      const task = state.todos.find((el) => el.id === action.payload);
      if (task) task.status = !task.status;
    },
  },
});

export const { addTodo, deleteTodo, deleteCompletedTodos, toggleTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
