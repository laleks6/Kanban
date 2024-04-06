import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo } from "../../store/todoSlice";
import style from "./Task.module.scss";

function BlockTask({ tasks }) {
  const dispatch = useDispatch();
  console.log(tasks, "task");
  return (
    <div className={style.taskBlock}>
      {tasks.map((el) => (
        <div
          className={` ${style.task} ${!el.status && style.done} `}
          key={el.id}
          id={el.id}
        >
          <input
            className={style.checbox}
            type="checkbox"
            onClick={() => dispatch(toggleTodo(el.id))}
          />
          <span>{el.discription}</span>
          <button onClick={() => dispatch(deleteTodo(el.id))}>
            <img src="" alt="" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default BlockTask;
