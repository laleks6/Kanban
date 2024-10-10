import { useAppDispatch } from "../../hook/hook";
import { deleteTodo, toggleTodo } from "../../store/todoSlice";
import { type TaskTodo } from "../../types/baseTypes";
import style from "./Task.module.scss";
import binImg from "../../../assets/recycle-bin.png";
import checkBOx from "../../../assets/check-mark-green.png";

type Props = { arr: TaskTodo[] };
function BlockTask({ arr }: Props) {
  const dispatch = useAppDispatch();

  console.log(arr, "task");
  return (
    <div className={style.taskBlock}>
      {arr.map((el) => (
        <div
          className={` ${style.task} ${!el.status && style.done} `}
          key={el.id}
          id={`e${el.id}`}
        >
          <label className={style.labelCheckbox} htmlFor={`${el.id}`}>
            <input
              id={`${el.id}`}
              className={style.checbox}
              type="checkbox"
              checked={!el.status}
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
