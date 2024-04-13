import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import style from "./complex.module.scss";
import CreateColumn from "./createColumn/CreateColumn";

function TodoComplex() {
  const arrTasks = [
    { id: 1, data: 1 },
    { id: 2, data: 2 },
    { id: 3, data: 3 },
    { id: 4, data: 4 },
  ];
  // const [tasks, setTasks] = useState(arrTasks);
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.kanban.columns);

  return (
    <article className={style.complex}>
      {columns.map((el, i) => (
        <CreateColumn key={`${el.id}`} data={el} inedex={i} />
      ))}
    </article>
  );
}

export default TodoComplex;
