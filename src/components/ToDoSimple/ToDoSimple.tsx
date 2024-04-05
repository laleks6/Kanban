import { useContext } from "react";
import Input from "./input/Input";
import FormAdd from "./form-add/FormAdd";

function ToDoSimple() {
  return (
    <article className="todo">
      <FormAdd />
    </article>
  );
}

export default ToDoSimple;
