import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Tag, TaskTodo } from "../types/baseTypes";
/* eslint-disable no-param-reassign */
type TodosState = {
  todos: TaskTodo[];
  tags: Tag[];
  deleteTag: Tag[];
};
const initialState: TodosState = {
  todos: [],
  tags: [],
  deleteTag: [],
};

const globalTaskSlice = createSlice({
  name: "globalTask",
  initialState,
  reducers: {
    addGlobalTag(state, action) {
      console.log(action.payload, "MODAL GLOBAL");
      state.tags.push(action.payload);
    },
    changeColorGlobalTag(state, action) {
      console.log(action.payload, "TAG changeColorTag");
      const { tagTaskGlobalIndex, bgColor, textColor } = action.payload;
      const tag = state.tags[tagTaskGlobalIndex];

      tag.bgColor = bgColor;
      tag.textColor = textColor;
    },
    deleteTag(state, action) {
      console.log(action.payload, "TAG DeleetTag");
      const { tags, deleteTag } = state;

      deleteTag.splice(0, 1, tags[action.payload]);

      tags.splice(action.payload, 1);
    },
  },
});

export const { addGlobalTag, changeColorGlobalTag, deleteTag } =
  globalTaskSlice.actions;
export default globalTaskSlice.reducer;
