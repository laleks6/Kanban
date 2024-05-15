import { Dispatch, SetStateAction } from "react";

export type TaskKanban = {
  id: number;
  order: number;
  data: number;
  tags: TypeTag[];
  description: DescriptionKanban[];
};
export type DescriptionKanban = {
  id: number;
  data: string[];
};
export type TypeColumn = {
  id: number;
  order: number;
  name: string;
  status: string;
  color: Color;
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
export type Color = {
  bgColor: string;
  textColor: string;
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
