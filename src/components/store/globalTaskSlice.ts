import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Tag, TaskTodo } from "../types/baseTypes";
/* eslint-disable no-param-reassign */
type TodosState = {
  todos: TaskTodo[];
  tags: Tag[];
};
const initialState: TodosState = {
  todos: [],
  tags: [],
};

const globalTaskSlice = createSlice({
  name: "globalTask",
  initialState,
  reducers: {
    addGlobalTag(state, action) {
      console.log(action.payload, "MODAL GLOBAL");
      state.tags.push(action.payload);
    },
  },
});

export const { addGlobalTag } = globalTaskSlice.actions;
export default globalTaskSlice.reducer;
