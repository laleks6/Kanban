import { useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  createTabel,
  changeNameTabel,
  changeSatus,
} from "../../store/kanbanSlice";
import Button from "../../button/Button";
import style from "./createColumn.module.scss";
import Task from "../task/Task";
import AddTask from "./addTask/AddTask";
type Props = {
  key: string;
  data: any;
  inedex: any;
};
function CreateColumn({ data, inedex }: Props) {
  const status = useSelector((state) => state.kanban.columns[inedex].status);
  const tasks = useSelector((state) => state.kanban.tasks);
  //   const [creatBlock, setCreateBlock] = useState(false);
  const [nameBlock, setNameBlock] = useState("");
  const dispatch = useDispatch();
  console.log(data, "arrNameTaskBlock");
  const clickCreateBlock = () => {
    // !active && setActive(!active);
    console.log("clickCreateBlock");
    // setStyleActive("createColumn");
    dispatch(changeSatus({ id: data.id, status: "createColumn" }));
  };
  const clickCloseBtn = () => {
    // setActive(!active);
    console.log("clickCloseBtn");
    // setStyleActive("beforeCreate");
    dispatch(changeSatus({ id: data.id, status: "beforeCreate" }));
  };
  const clickCreateBtn = () => {
    // setStyleActive("afterCreate");
    dispatch(createTabel());
    dispatch(changeNameTabel({ id: data.id, name: nameBlock }));
    dispatch(changeSatus({ id: data.id, status: "afterCreate" }));
    console.log("clickCreateBtn");
    // setCreateBlock(!creatBlock);
  };

  console.log("check move  state class block", data.id, data.name, data.status);

  return (
    <div className={`${style.createTableBlock} ${style[status]}`}>
      <div className={style.titleColumn} onClick={clickCreateBlock}>
        <h4>{data?.name}</h4>
        <p>Create column +</p>
      </div>
      <div className={`${style.create} `}>
        <input
          className={style.input}
          type="text"
          maxLength={70}
          placeholder=""
          onChange={(e) => setNameBlock(e.target.value)}
        />
        <div className={style.createBtn}>
          <Button
            className={style.input}
            text={"add"}
            onClick={clickCreateBtn}
          />
          <Button className={style.input} text={"X"} onClick={clickCloseBtn} />
        </div>
      </div>
      <div className={style.mainBlokTasks}>
        {tasks.map((el, i) => (
          <Task key={`id_${i}`} data={el} tasks={tasks} />
        ))}
        <AddTask />
      </div>
    </div>
  );
}

export default CreateColumn;
