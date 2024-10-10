import { useAppDispatch, useAppSelector } from "../../hook/hook";
import { deleteCompletedTodos } from "../../store/todoSlice";
import style from "./style.module.scss";

type Props = {
  stateTask: string;
  HandleChangeStateTask: (status: string) => void;
};

function TaskManagement({ stateTask, HandleChangeStateTask }: Props) {
  const arrTask = useAppSelector((state) => state?.todo.todos);
  const dispatch = useAppDispatch();
  const activeTask = arrTask.filter((el) => el.status);
  const objBtn: Record<string, string> = {
    All: "All",
    Active: "Active",
    Completed: "Completed",
  };

  const clearCompleted = () => {
    dispatch(deleteCompletedTodos());
  };

  return (
    <div className={style.management}>
      <span>{`${activeTask.length} items left`}</span>
      <div className={style.blockBtnsStatus}>
        {Object.keys(objBtn).map((el) => (
          <button
            key={el}
            type="button"
            className={`${style.button} ${stateTask === objBtn[el] ? style.activeBtn : ""}`}
            onClick={() => HandleChangeStateTask(el)}
          >
            {el}
          </button>
        ))}
      </div>
      <button
        type="button"
        className={style.button}
        onClick={() => clearCompleted()}
      >
        Cleaar completed
      </button>
    </div>
  );
}

export default TaskManagement;
