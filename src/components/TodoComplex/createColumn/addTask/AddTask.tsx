import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../../store/kanbanSlice";
import Button from "../../../button/Button";
import style from "./addTask.module.scss";
function AddTask() {
  const [status, setStatus] = useState(false);
  const [value, setvalue] = useState("");
  const dispatch = useDispatch();
  const clickNewTask = () => {
    console.log("textarea");
    !status && setStatus(!status);
  };
  const clickAddBtn = () => {
    setvalue("");
    dispatch(addTask(value));
    status && setStatus(!status);
    console.log("textarea");
  };
  const clickCloseBtn = () => {
    console.log("textarea");
    status && setStatus(!status);
  };
  return (
    <div className={style.addTask} onClick={clickNewTask}>
      <textarea
        className={style.textarea}
        onChange={(e) => setvalue(e.target.value)}
        value={value}
        placeholder="New task"
      ></textarea>
      {status && (
        <div className={style.blockBtn}>
          <Button
            className={style.button}
            text={"add+"}
            onClick={clickAddBtn}
          />
          <Button className={style.button} text={"x"} onClick={clickCloseBtn} />
        </div>
      )}
    </div>
  );
}
export default AddTask;
