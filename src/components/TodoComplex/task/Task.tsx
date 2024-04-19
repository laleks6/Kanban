import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  changeIndexTask,
  changeIndexTaskColumns,
} from "../../store/kanbanSlice";
import style from "./task.module.scss";
function Task({ data, tasks, column, columns }) {
  const dispatch = useDispatch();
  const changeTasks = (arr) => dispatch(changeIndexTask(arr));
  const changeColumns = (arr) => dispatch(changeIndexTaskColumns(arr));
  const handleDragStart = (e, task, columnId) => {
    console.log(e, task, column, "handleDragStart");
    if (e.target.classList.contains("mainTaskDiv")) {
      e.dataTransfer.setData("task", `${task.id}`);
      e.dataTransfer.setData("column", `${columnId.id}`);
    } else {
      e.preventDefault();
    }
  };
  const handleDragLeave = (e) => {
    e.target.classList.remove(style.taskDND);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.target.classList.add(style.taskDND);
  };
  const handleDrop = (e, task, dropColumn, allColumns) => {
    e.target.classList.remove(style.taskDND);
    console.log(e, task, column, "handleDrop");
    e.preventDefault();
    const newArrTasks = [...tasks];
    const newArrColumns = [...allColumns];
    const currentTaskId = +e.dataTransfer.getData("task");
    const currentColumnId = +e.dataTransfer.getData("column");
    const currentColumn = newArrColumns.find((el) => el.id === currentColumnId);
    const currentTask = newArrTasks.find((el) => el.id === +currentTaskId);
    const currentColumnIndex = newArrColumns.indexOf(currentColumn);
    const dropColumnIndex = newArrColumns.indexOf(dropColumn);
    const dropTaskIndex = newArrTasks.indexOf(task);
    const currentTaskIndex = newArrTasks.indexOf(currentTask);
    if (dropColumn.id === +currentColumnId) {
      console.log(" columns true");
      // [newArrTasks[dropTaskIndex], newArrTasks[currentTaskIndex]] = [
      //   newArrTasks[currentTaskIndex],
      //   newArrTasks[dropTaskIndex],
      // ];
      const deleteTask = newArrTasks.splice(currentTaskIndex, 1);
      newArrTasks.splice(dropTaskIndex, 0, ...deleteTask);
      console.log("AAAAAAA----", newArrTasks, deleteTask);
      changeTasks({ index: dropColumnIndex, tasks: newArrTasks });
    } else {
      const currentColumnTasks = [...currentColumn.tasks];
      const currentColumnTask = currentColumnTasks.find(
        (el) => el.id === +currentTaskId
      );
      const currentColumnTaskIndex =
        currentColumnTasks.indexOf(currentColumnTask);

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
    console.log("delete");
  };

  return (
    <div
      className={`mainTaskDiv ${style.task}`}
      draggable={true}
      onDragStart={(e) => handleDragStart(e, data, column, columns)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e, data, column, columns)}
    >
      {data.data}
    </div>
  );
}
export default Task;
