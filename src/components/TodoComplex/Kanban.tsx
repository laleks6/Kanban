import React from "react";
import { useAppSelector } from "../hook/hook";
import style from "./complex.module.scss";
import CreateColumn from "./createColumn/CreateColumn";

function Kanban() {
  // const [tasks, setTasks] = useState(arrTasks);
  const columns = useAppSelector((state) => state.kanban.columns);

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

export default Kanban;
