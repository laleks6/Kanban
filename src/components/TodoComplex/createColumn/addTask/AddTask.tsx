import React, { useState } from "react";
import { useAppDispatch } from "../../../hook/hook";
import { addTask } from "../../../store/kanbanSlice";
import Button from "../../../button/Button";
import style from "./addTask.module.scss";

type Props = { columnInedex: number };
function AddTask({ columnInedex }: Props) {
  const [status, setStatus] = useState(false);
  const [value, setvalue] = useState("");
  const dispatch = useAppDispatch();
  const clickNewTask = () => {
    console.log("textarea");
    if (!status) setStatus(!status);
  };
  const clickAddBtn = () => {
    setvalue("");
    dispatch(addTask({ index: columnInedex, task: value }));
    if (status) setStatus(!status);

    console.log("textarea");
  };
  const clickCloseBtn = () => {
    console.log("textarea");
    if (status) setStatus(!status);
    setvalue("");
  };
  return (
    <div
      className={`${style.addTask} ${status && style.activeAddTask}`}
      onClick={clickNewTask}
      onKeyDown={clickNewTask}
      aria-hidden
    >
      <textarea
        className={style.textarea}
        onChange={(e) => setvalue(e.target.value)}
        value={value}
        placeholder="New task"
      />
      {status && (
        <div className={style.blockBtn}>
          <Button className={style.button} text="add+" onClick={clickAddBtn} />
          <Button className={style.button} text="x" onClick={clickCloseBtn} />
        </div>
      )}
    </div>
  );
}
export default AddTask;
