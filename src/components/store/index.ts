import { configureStore } from "@reduxjs/toolkit";
import todoReduser from "./todoSlice";
import kanbanReduser from "./kanbanSlice";

const store = configureStore({
  reducer: {
    todo: todoReduser,
    kanban: kanbanReduser,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
