import { createSlice } from "@reduxjs/toolkit";
import Task from "../TodoComplex/task/Task";

const kanbanSlice = createSlice({
  name: "kanban",
  initialState: {
    columns: [
      {
        id: Date.now(),
        name: "",
        status: "beforeCreate",
      },
    ],
    tasks: [
      { id: 1, order: 1, data: 1 },
      { id: 2, order: 2, data: 2 },
      { id: 3, order: 3, data: 3 },
      { id: 4, order: 4, data: 4 },
    ],
  },
  reducers: {
    createTabel(state) {
      console.log("createtable");
      state.columns.push({
        id: Date.now(),
        name: "",
        status: "beforeCreate",
      });
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
      console.log("addtask dispatch", action.payload);
      state.tasks.push({
        id: Date.now(),
        order: state.tasks.length + 1,
        data: action.payload,
      });
    },
    changeArr(state, action) {
      console.log("CHANGE", action.payload);
      state.tasks = action.payload;
    },
  },
});

export const {
  createTabel,
  changeNameTabel,
  reorder,
  changeSatus,
  addTask,
  changeArr,
} = kanbanSlice.actions;
export default kanbanSlice.reducer;
