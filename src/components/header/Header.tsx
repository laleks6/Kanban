import { Link } from "react-router-dom";
import style from "./header.module.scss";
import icon from "../../assets/diary.png";

import TodoSimple from "../ToDoSimple/TodoSimple";
import TodoComplex from "../TodoComplex/TodoComplex";

function Header() {
  return (
    <>
      <header className={style.header}>
        <Link to="/simple">Simple</Link>
        <Link to="/">
          <h1>
            <span>Todo</span>
            <img src={icon} alt="icon-home-page" />
          </h1>
        </Link>
        <Link to="/Complex">Complex</Link>
      </header>
    </>
  );
}

export default Header;
