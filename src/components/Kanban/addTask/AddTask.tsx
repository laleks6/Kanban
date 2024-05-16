import { useState } from "react";
import { useAppDispatch } from "../../hook/hook";
import { addTask } from "../../store/kanbanSlice";
import style from "./addTask.module.scss";
import ContentEditable from "react-contenteditable";

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
      <ContentEditable
        className={style.content}
        onChange={(e) => setvalue(e.target.value)}
        html={`${value}`}
        data-placeholder="New task"
      />
      {status && (
        <div className={style.blockBtn}>
          <button type="button" className={style.button} onClick={clickAddBtn}>
            add
          </button>
          <button
            type="button"
            className={style.button}
            onClick={clickCloseBtn}
          >
            x
          </button>
        </div>
      )}
    </div>
  );
}
export default AddTask;
