import { useSelector } from "react-redux";
import FormAdd from "./form-add/FormAdd";
import BlockTask from "./blockTask/BlockTask";
import style from "./mainSimple.module.scss";

function TodoSimple() {
  const arrTask = useSelector((state) => state?.todo.todos);
  return (
    <article className={style.blockSimple}>
      <FormAdd />
      {arrTask.length > 0 && <BlockTask tasks={arrTask} />}
    </article>
  );
}

export default TodoSimple;
