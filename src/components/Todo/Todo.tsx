import { useState } from "react";
import { useAppSelector } from "../hook/hook";
import FormAdd from "./form-add/FormAdd";
import BlockTask from "./blockTask/BlockTask";
import style from "./mainSimple.module.scss";
import TaskManagement from "./taskManagement/TaskManagement";
import { type TaskTodo } from "../types/baseTypes";

function Todo() {
  const arrTasks = useAppSelector((state) => state?.todo.todos);
  const [stateTask, useStateTask] = useState("All");

  const filterArrtask = (arr: TaskTodo[]): TaskTodo[] => {
    if (stateTask === "Active") return arr.filter((el) => el.status);
    if (stateTask === "Completed") return arr.filter((el) => !el.status);
    return arr;
  };
  const arr = filterArrtask(arrTasks);

  const HandleChangeStateTask = (status: string): void => {
    useStateTask(status);
  };

  return (
    <article className={style.blockSimple}>
      <FormAdd />
      {arrTasks.length ? <BlockTask arr={arr} /> : <h3>No todo</h3>}
      <TaskManagement
        stateTask={stateTask}
        HandleChangeStateTask={HandleChangeStateTask}
      />
    </article>
  );
}

export default Todo;
