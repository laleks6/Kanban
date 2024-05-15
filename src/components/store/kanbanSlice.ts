/* eslint-disable prettier/prettier */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ColumnTag, TypeColumn } from "../types/baseTypes";
/* eslint-disable no-param-reassign */
type Columns = {
  columns: TypeColumn[];
};
const initialState: Columns = {
  columns: [
    {
      id: Date.now(),
      order: 0,
      name: "+ Create column",
      status: "beforeCreate",
      color: { bgColor: "", textColor: "" },
      tasks: [
        { id: 1, order: 0, data: 1, tags: [], description: [] },
        { id: 2, order: 1, data: 2, tags: [], description: [] },
      ],
    },
  ],
};
const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    createTabel(state) {
      console.log("createtable");
      state.columns.push({
        id: Date.now(),
        name: "+ Create column",
        order: state.columns.length,
        status: "beforeCreate",
        color: { bgColor: "", textColor: "#0000" },
        tasks: [],
      });
    },
    removeColumn(state, action) {
      state.columns.splice(action.payload, 1);
    },
    changeNameTabel(state, action) {
      console.log(action.payload.id, action.payload.name, "changeNameTabel");
      const tabel = state.columns.find((el) => el.id === action.payload.id);

      tabel!.name = action.payload.name;
    },
    reorder(state, action) {
      console.log(action.payload, "changeNameTabel");
      state.columns = [...action.payload];
    },
    changeSatus(state, action) {
      console.log(action.payload.id, action.payload.status, "changeSatus");
      const tabel = state.columns.find((el) => el.id === action.payload.id);

      tabel!.status = action.payload.status;
    },
    addTask(state, action) {
      state.columns[action.payload.index].tasks.push({
        id: Date.now(),
        order: state.columns[action.payload.index].tasks.length,
        data: action.payload.task,
        tags: [],
        description: [],
      });
    },
    deleteTask(state, action) {
      console.log("Delete", action.payload);
      const { indexColumn, indexTask } = action.payload;
      state.columns[indexColumn].tasks.splice(indexTask, 1);
    },

    changeIndexTask(state, action) {
      console.log("CHANGE", action.payload);
      state.columns[action.payload.index].tasks = action.payload.tasks;
    },
    changeIndexTaskColumns(state, action) {
      // dropColumnIndex, newArrTask, currentColumnIndex, currentColumnTasks

      state.columns[action.payload.dropColumnIndex].tasks =
        action.payload.newArrTasks;
      state.columns[action.payload.currentColumnIndex].tasks =
        action.payload.currentColumnTasks;
    },
    changeIndexColumns(state, action) {
      // dropColumnIndex, currentColumnInde
      state.columns = action.payload;
      console.log(state.columns);
    },
    changeBackgroundColorTitle(state, action) {
      // dropColumnIndex, currentColumnInde
      state.columns[action.payload.index].color.bgColor =
        action.payload.bgColor;
      state.columns[action.payload.index].color.textColor =
        action.payload.textColor;
    },
    changeTaskTitile(state, action) {
      const { indexColumn, indexTask, value } = action.payload;
      console.log(action.payload, "changeTaskTitile");
      state.columns[indexColumn].tasks[indexTask].data = value;
    },
    addDescriptionTask(state, action) {
      const { indexColumn, indexTask, descriptionValue } = action.payload;
      console.log(action.payload, "changeTaskTitile");
      state.columns[indexColumn].tasks[indexTask].description.push({
        id: Date.now(),
        data: descriptionValue,
      });
    },
    deleteDescriptionTask(state, action) {
      const { indexColumn, indexTask, indexDescription } = action.payload;
      console.log(action.payload, "changeTaskTitile");
      state.columns[indexColumn].tasks[indexTask].description.splice(
        indexDescription,
        1
      );
    },
    changeDescriptionTask(state, action) {
      const { indexColumn, indexTask, indexDescription, value } =
        action.payload;
      console.log(action.payload, "changeTaskDEscription");
      state.columns[indexColumn].tasks[indexTask].description[
        indexDescription
      ].data = value;
    },
    addTaskTag(state, action: PayloadAction<ColumnTag>) {
      console.log(action.payload, "TAG");
      const { columnIndex, taskIndex, tag } = action.payload;
      console.log(action.payload, "TAG");
      state.columns[columnIndex].tasks[taskIndex].tags.push(tag);
    },
    removeTag(state, action) {
      console.log(action.payload, "TAG delete");
      const { columnIndex, taskIndex, tagIndex } = action.payload;
      console.log(state.columns[columnIndex].tasks[taskIndex].tags, "-----");
      state.columns[columnIndex].tasks[taskIndex].tags.splice(tagIndex, 1);
    },
    changeColorTag(state, action) {
      console.log(action.payload, "TAG changeColorTag");
      const { columnIndex, taskIndex, tagTaskIndex, bgColor, textColor } =
        action.payload;
      const tag =
        state.columns[columnIndex].tasks[taskIndex].tags[tagTaskIndex];
      tag.bgColor = bgColor;
      tag.textColor = textColor;
    },
  },
});

export const {
  createTabel,
  changeNameTabel,
  reorder,
  changeSatus,
  addTask,
  deleteTask,
  changeIndexTask,
  changeIndexTaskColumns,
  changeIndexColumns,
  changeBackgroundColorTitle,
  removeColumn,
  changeTaskTitile,
  addDescriptionTask,
  deleteDescriptionTask,
  changeDescriptionTask,
  addTaskTag,
  removeTag,
  changeColorTag,
} = kanbanSlice.actions;
export default kanbanSlice.reducer;
