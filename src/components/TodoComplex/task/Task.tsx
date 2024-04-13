import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeArr } from "../../store/kanbanSlice";
import style from "./task.module.scss";
function Task({ data, tasks }) {
  const dispatch = useDispatch();
  const changeArrTasks = (arr) => dispatch(changeArr(arr));
  const handleDragStart = (e, task) => {
    console.log(e, task, "handleDragStart");
    e.dataTransfer.setData("task", `${task.order}`);
  };
  const handleDragLeave = (e) => {};
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDragEnd = (e) => {};
  const handleDrop = (e, task) => {
    e.preventDefault();
    const deleteTask = [...tasks];
    const currentOrder = +e.dataTransfer.getData("task");
    const dropIndex = deleteTask.indexOf(task);
    const currentTask = deleteTask.find((el) => el.order === currentOrder);
    const currentIndex = deleteTask.indexOf(currentTask);
    [deleteTask[dropIndex], deleteTask[currentIndex]] = [
      deleteTask[currentIndex],
      deleteTask[dropIndex],
    ];

    changeArrTasks(deleteTask);
    console.log(deleteTask, "delete");
  };

  // useEffect(() => {
  //   setArrTasks(tasks);
  // }, [tasks]);

  return (
    <div
      className={style.task}
      draggable={true}
      onDragStart={(e) => handleDragStart(e, data)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDragEnd={(e) => handleDragEnd(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e, data)}
    >
      {data.data}
    </div>
  );
}
export default Task;
