import { createContext } from "react";
import {
  TypeActiveModalContext,
  TypeTaskSettingsContext,
  TypeindexContext,
} from "../types/baseTypes";

const ColumnIndexContext = createContext<TypeindexContext>(-1);
const TaskIndexContext = createContext<TypeindexContext>(-1);
const TaskSettingsContext = createContext<null | TypeTaskSettingsContext>(null);
const ActiveModalContext = createContext<null | TypeActiveModalContext>(null);

export {
  ColumnIndexContext,
  TaskIndexContext,
  TaskSettingsContext,
  ActiveModalContext,
};
