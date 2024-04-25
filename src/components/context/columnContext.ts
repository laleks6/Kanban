import { createContext } from "react";

type TypeContext = number;

const ColumnIndexContext = createContext<TypeContext>(-1);
const TaskIndexContext = createContext<TypeContext>(-1);

export { ColumnIndexContext, TaskIndexContext };
