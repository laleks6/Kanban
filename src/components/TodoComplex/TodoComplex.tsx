import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import style from "./complex.module.scss";
import CreateColumn from "./createColumn/CreateColumn";

function TodoComplex() {
  // const [tasks, setTasks] = useState(arrTasks);
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.kanban.columns);

  return (
    <article className={style.complex}>
      {columns.map((el, i) => (
        <CreateColumn
          key={`${el.id}`}
          column={el}
          inedex={i}
          columns={columns}
        />
      ))}
    </article>
  );
}

export default TodoComplex;
