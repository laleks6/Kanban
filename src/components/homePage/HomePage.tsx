import { Link } from "react-router-dom";
import style from "./style.module.scss";
import todoImg from "../../assets/scrin_todo.png";
import kanbanImg from "../../assets/kanban_scrin.png";

function HomePage() {
  return (
    <article className={style.blockPresentation}>
      <Link to="/simple" className={style.todo}>
        <img src={todoImg} alt="todo" className={style.imgTodo} />
      </Link>
      <Link to="/complex" className={style.kanban}>
        <img src={kanbanImg} alt="kanban" className={style.imgKanban} />
      </Link>
    </article>
  );
}

export default HomePage;
