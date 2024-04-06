import { useSelector } from "react-redux";
import FormAdd from "./form-add/FormAdd";
import BlockTask from "./blockTask/BlockTask";

function ToDoSimple() {
  const arrTask = useSelector((state) => state?.todo.todos);
  return (
    <article className="todo">
      <FormAdd />
      {arrTask && <BlockTask tasks={arrTask} />}
    </article>
  );
}

export default ToDoSimple;
