import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hook/hook";
import {
  createTabel,
  changeNameTabel,
  changeSatus,
  changeIndexColumns,
} from "../../store/kanbanSlice";
import { type TypeColumn } from "../../types/baseTypes";
import Button from "../../button/Button";
import style from "./createColumn.module.scss";
import Task from "../task/Task";
import AddTask from "./addTask/AddTask";

type Props = {
  column: TypeColumn;
  inedex: number;
  columns: TypeColumn[];
};
function CreateColumn({ column, inedex, columns }: Props) {
  const status = useAppSelector((state) => state.kanban.columns[inedex].status);
  const tasks = useAppSelector((state) => state.kanban.columns[inedex].tasks);
  const [nameBlock, setNameBlock] = useState("");
  const dispatch = useAppDispatch();
  const changeColumns = (arr: TypeColumn[]) =>
    dispatch(changeIndexColumns(arr));

  console.log(column, "arrNameTaskBlock");
  const clickCreateBlock = (): void => {
    console.log("clickCreateBlock");
    dispatch(changeSatus({ id: column.id, status: "createColumn" }));
  };
  const clickCloseBtn = () => {
    console.log("clickCloseBtn");
    dispatch(changeSatus({ id: column.id, status: "beforeCreate" }));
  };
  const clickCreateBtn = () => {
    dispatch(createTabel());
    dispatch(changeNameTabel({ id: column.id, name: nameBlock }));
    dispatch(changeSatus({ id: column.id, status: "afterCreate" }));
    console.log("clickCreateBtn");
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    startColumn: TypeColumn
  ) => {
    e.dataTransfer.setData("startColumn", `${startColumn.id}`);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove(style.columnDND);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add(style.columnDND);
  };
  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    dropColumn: TypeColumn,
    arrColumns: TypeColumn[]
  ) => {
    e.preventDefault();
    e.currentTarget.classList.remove(style.columnDND);
    const newArrColumns: TypeColumn[] = [...arrColumns];
    const currentColumnId = +e.dataTransfer.getData("startColumn");
    const currentColumn = newArrColumns.find((el) => el.id === currentColumnId);
    if (currentColumn) {
      const currentColumnIndex = newArrColumns.indexOf(currentColumn);
      const dropColumnIndex = newArrColumns.indexOf(dropColumn);
      [newArrColumns[dropColumnIndex], newArrColumns[currentColumnIndex]] = [
        newArrColumns[currentColumnIndex],
        newArrColumns[dropColumnIndex],
      ];
      console.log("CHEEECK COLOMUNS", newArrColumns);
      changeColumns(newArrColumns);
    }
  };

  console.log(
    "check move  state class block",
    column.id,
    column.name,
    column.status
  );

  return (
    <div className={` ${style.createTableBlock} ${style[status]}`}>
      <div
        className={`title ${style.titleColumn}`}
        draggable
        onDragStart={(e) => handleDragStart(e, column)}
        onDragLeave={(e) => handleDragLeave(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e, column, columns)}
        onClick={clickCreateBlock}
        onKeyDown={clickCreateBlock}
        aria-hidden
      >
        <h4>{column?.name}</h4>
        <p>Create column +</p>
      </div>
      <div className={`${style.create} `}>
        <input
          className={style.input}
          type="text"
          maxLength={70}
          placeholder=""
          onChange={(e) => setNameBlock(e.target.value)}
        />
        <div className={style.createBtn}>
          <Button
            className={style.input}
            text="add"
            onClick={clickCreateBtn}
            icon=""
          />
          <Button
            className={style.input}
            text="X"
            onClick={clickCloseBtn}
            icon=""
          />
        </div>
      </div>
      <div className={style.mainBlokTasks}>
        {tasks.map((el) => (
          <Task
            key={el.id}
            data={el}
            tasks={tasks}
            column={column}
            columns={columns}
          />
        ))}
        <AddTask columnInedex={inedex} />
      </div>
    </div>
  );
}

export default CreateColumn;
