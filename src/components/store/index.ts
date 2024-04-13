import { configureStore } from "@reduxjs/toolkit";
import todoReduser from "./todoSlice";
import kanbanReduser from "./kanbanSlice";

export default configureStore({
  reducer: {
    todo: todoReduser,
    kanban: kanbanReduser,
  },
});
