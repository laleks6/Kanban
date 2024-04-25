import { configureStore } from "@reduxjs/toolkit";
import todoReduser from "./todoSlice";
import kanbanReduser from "./kanbanSlice";
import globalTaskSlice from "./globalTaskSlice";

const store = configureStore({
  reducer: {
    todo: todoReduser,
    kanban: kanbanReduser,
    globalTask: globalTaskSlice,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
