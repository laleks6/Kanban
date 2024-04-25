/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { useAppDispatch } from "../../hook/hook";
import {
  changeIndexTask,
  changeIndexTaskColumns,
} from "../../store/kanbanSlice";
import { type TaskKanban, TypeColumn } from "../../types/baseTypes";
import { TaskIndexContext } from "../../context/columnContext";
import style from "./task.module.scss";
import Tags from "./tags/Tags";
import Button from "../../button/Button";
import dotsIcon from "../../../assets/dots.png";

type Props = {
  data: TaskKanban;
  tasks: TaskKanban[];
  taskIndex: number;
  column: TypeColumn;
  columns: TypeColumn[];
};
function Task({ data, tasks, taskIndex, column, columns }: Props) {
  const dispatch = useAppDispatch();
  const changeTasks = (arr: { index: number; tasks: TaskKanban[] }) =>
    dispatch(changeIndexTask(arr));
  const changeColumns = (arr: {
    dropColumnIndex: number;
    newArrTasks: TaskKanban[];
    currentColumnIndex: number;
    currentColumnTasks: TaskKanban[];
  }) => dispatch(changeIndexTaskColumns(arr));
  const [changeTask, setChangeTask] = useState(false);
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    task: TaskKanban,
    arrColumn: TypeColumn
  ) => {
    console.log(e, task, column, "handleDragStart");
    const target = e.target as HTMLDivElement;
    if (target.classList.contains("blockTask")) {
      e.dataTransfer.setData("task", `${task.id}`);
      e.dataTransfer.setData("column", `${arrColumn.id}`);
    } else {
      e.preventDefault();
    }
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    target.classList.remove(style.taskDND);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLDivElement;
    target.classList.add(style.taskDND);
  };
  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    task: TaskKanban,
    dropColumn: TypeColumn,
    arrColumn: TypeColumn[]
  ) => {
    const target = e.currentTarget as HTMLDivElement;
    target.classList.remove(style.taskDND);
    console.log(e, task, column, "handleDrop");
    e.preventDefault();
    const newArrTasks = [...tasks];
    const newArrColumns = [...arrColumn];
    const currentTaskId = +e.dataTransfer.getData("task");
    const currentColumnId = +e.dataTransfer.getData("column");
    const currentColumn = newArrColumns.find((el) => el.id === currentColumnId);
    const currentTask = newArrTasks.find((el) => el.id === +currentTaskId);
    let currentColumnTasks: TaskKanban[] = [];
    const dropColumnIndex = newArrColumns.indexOf(dropColumn);
    const dropTaskIndex = newArrTasks.indexOf(task);
    let currentColumnIndex = -1;
    let currentTaskIndex = -1;
    if (currentColumn) {
      currentColumnIndex = newArrColumns.indexOf(currentColumn);
      currentColumnTasks = [...currentColumn.tasks];
    }
    if (currentTask) {
      currentTaskIndex = newArrTasks.indexOf(currentTask);
    }
    if (dropColumn.id === +currentColumnId) {
      const deleteTask = newArrTasks.splice(currentTaskIndex, 1);
      newArrTasks.splice(dropTaskIndex, 0, ...deleteTask);
      changeTasks({ index: dropColumnIndex, tasks: newArrTasks });
    } else {
      const currentColumnTask = currentColumnTasks.find(
        (el) => el.id === +currentTaskId
      );
      let currentColumnTaskIndex = -1;
      if (currentColumnTask) {
        currentColumnTaskIndex = currentColumnTasks.indexOf(currentColumnTask);
        // change tasks columns
        currentColumnTasks.splice(currentColumnTaskIndex, 1);
        newArrTasks.push(currentColumnTask);
        changeColumns({
          dropColumnIndex,
          newArrTasks,
          currentColumnIndex,
          currentColumnTasks,
        });
      }
    }
    console.log("delete");
  };

  const cliclChangeTaks = () => {
    setChangeTask(!changeTask);
  };

  return (
    <TaskIndexContext.Provider value={taskIndex}>
      <div
        className={`blockTask ${style.task}`}
        draggable
        onDragStart={(e) => handleDragStart(e, data, column)}
        onDragLeave={(e) => handleDragLeave(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e, data, column, columns)}
      >
        <div className={style.taskInfo}>
          <p className={style.taskPrevDescription}> {data.data}</p>
          <Tags data={data.tags} />
        </div>

        <Button
          className={style.chengeTask}
          onClick={cliclChangeTaks}
          icon={dotsIcon}
          text=""
        />
      </div>
    </TaskIndexContext.Provider>
  );
}
export default Task;
