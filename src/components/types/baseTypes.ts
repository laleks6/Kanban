import { Dispatch, SetStateAction } from "react";

export type TaskKanban = {
  id: number;
  order: number;
  data: number;
  tags: never[];
  description: string;
};

export type TypeColumn = {
  id: number;
  order: number;
  name: string;
  status: string;
  tasks: TaskKanban[];
};

export type TaskTodo = {
  id: number;
  discription: string;
  status: boolean;
};

export type TypeTag = {
  id: number;
  value: string;
  bgColor: string;
  textColor: string;
};

export type ColumnTag = {
  columnIndex: number;
  taskIndex: number;
  tag: TypeTag;
};

export type TypeindexContext = number;

export type TypeActiveModalContext = {
  modalActive: boolean;
  setModalActive: Dispatch<SetStateAction<boolean>>;
};

export type TypeTaskDataContext = {
  indexColumn: TypeindexContext;
  indexTask: TypeindexContext;
};

export type TypeTaskSettingsContext = {
  taskSettings: boolean;
  setTaskSettings: Dispatch<SetStateAction<boolean>>;
  indices: TypeTaskDataContext | null;
  setIndices: Dispatch<SetStateAction<TypeTaskDataContext | null>>;
};
