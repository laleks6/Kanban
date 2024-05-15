import { Outlet } from "react-router-dom";
import style from "./layout.module.scss";
import Header from "../header/Header";

function Layout() {
  return (
    <div className={style.layout}>
      <Header />
      <main className={style.main}>
        <Outlet />
      </main>
      <footer className={style.footer}>2023</footer>
    </div>
  );
}

export default Layout;
