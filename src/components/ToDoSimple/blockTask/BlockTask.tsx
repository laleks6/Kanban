import React from "react";
import { useAppDispatch } from "../../hook/hook";
import { deleteTodo, toggleTodo } from "../../store/todoSlice";
import { type TaskTodo } from "../../types/baseTypes";
import style from "./Task.module.scss";
import binImg from "../../../assets/bin_icon.png";
import checkBOx from "../../../assets/check-mark-green.png";

type Props = {
  tasks: TaskTodo[];
};
function BlockTask({ tasks }: Props) {
  const dispatch = useAppDispatch();
  console.log(tasks, "task");
  return (
    <div className={style.taskBlock}>
      {tasks.map((el) => (
        <div
          className={` ${style.task} ${!el.status && style.done} `}
          key={el.id}
          id={`e${el.id}`}
        >
          <label className={style.labelCheckbox} htmlFor={`e${el.id}`}>
            <input
              id={`e${el.id}`}
              className={style.checbox}
              type="checkbox"
              onClick={() => dispatch(toggleTodo(el.id))}
            />
            <span className={style.newChecbox}>
              <img
                className={style.iconCheckbox}
                src={checkBOx}
                alt="checbox"
              />
            </span>
            <span className={style.text}>{el.discription}</span>
          </label>
          <button
            type="button"
            className={style.button}
            onClick={() => dispatch(deleteTodo(el.id))}
          >
            <img src={binImg} alt="bin" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default BlockTask;
