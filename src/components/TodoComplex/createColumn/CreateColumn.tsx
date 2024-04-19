import { useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  createTabel,
  changeNameTabel,
  changeSatus,
  changeIndexColumns,
} from "../../store/kanbanSlice";
import Button from "../../button/Button";
import style from "./createColumn.module.scss";
import Task from "../task/Task";
import AddTask from "./addTask/AddTask";
type Props = { key: string; column: any; inedex: any; columns: any };
function CreateColumn({ column, inedex, columns }: Props) {
  const status = useSelector((state) => state.kanban.columns[inedex].status);
  const tasks = useSelector((state) => state.kanban.columns[inedex].tasks);
  const [nameBlock, setNameBlock] = useState("");
  const dispatch = useDispatch();
  const changeColumns = (arr) => dispatch(changeIndexColumns(arr));

  console.log(column, "arrNameTaskBlock");
  const clickCreateBlock = () => {
    console.log("clickCreateBlock");
    dispatch(changeSatus({ id: column.id, status: "createColumn" }));
  };
  const clickCloseBtn = () => {
    // setActive(!active);
    console.log("clickCloseBtn");
    // setStyleActive("beforeCreate");
    dispatch(changeSatus({ id: column.id, status: "beforeCreate" }));
  };
  const clickCreateBtn = () => {
    // setStyleActive("afterCreate");
    dispatch(createTabel());
    dispatch(changeNameTabel({ id: column.id, name: nameBlock }));
    dispatch(changeSatus({ id: column.id, status: "afterCreate" }));
    console.log("clickCreateBtn");
    // setCreateBlock(!creatBlock);
  };

  const handleDragStart = (e, startColumn, arrColumns) => {
    e.dataTransfer.setData("startColumn", `${startColumn.id}`);
  };
  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove(style.columnDND);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add(style.columnDND);
  };
  const handleDragEnd = (e) => {};
  const handleDrop = (e, dropColumn, arrColumns) => {
    e.preventDefault();
    e.currentTarget.classList.remove(style.columnDND);
    const newArrColumns = [...arrColumns];
    const currentColumnId = +e.dataTransfer.getData("startColumn");
    const currentColumn = newArrColumns.find((el) => el.id === currentColumnId);
    const currentColumnIndex = newArrColumns.indexOf(currentColumn);
    const dropColumnIndex = newArrColumns.indexOf(dropColumn);
    [newArrColumns[dropColumnIndex], newArrColumns[currentColumnIndex]] = [
      newArrColumns[currentColumnIndex],
      newArrColumns[dropColumnIndex],
    ];
    changeColumns(newArrColumns);
  };

  console.log(
    "check move  state class block",
    column.id,
    column.name,
    column.status
  );

  return (
    <div className={` ${style.createTableBlock} ${style[status]}`}>
      <div
        className={`title ${style.titleColumn}`}
        draggable={true}
        onDragStart={(e) => handleDragStart(e, column, columns)}
        onDragLeave={(e) => handleDragLeave(e)}
        onDragEnd={(e) => handleDragEnd(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e, column, columns)}
      >
        <h4>{column?.name}</h4>
        <p onClick={clickCreateBlock}>Create column +</p>
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
          <Task
            key={`id_${i}`}
            data={el}
            tasks={tasks}
            column={column}
            columns={columns}
            columnInedex={inedex}
          />
        ))}
        <AddTask columnInedex={inedex} />
      </div>
    </div>
  );
}

export default CreateColumn;
