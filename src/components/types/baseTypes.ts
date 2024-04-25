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

export type Tag = {
  value: string;
  bgColor: string;
  textColor: string;
};
export type ColumnTag = {
  columnIndex: number;
  taskIndex: number;
  tag: Tag;
};
