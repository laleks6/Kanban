import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hook/hook";
import {
  createTabel,
  changeNameTabel,
  changeSatus,
  changeIndexColumns,
} from "../../store/kanbanSlice";
import { type TypeColumn } from "../../types/baseTypes";
import Button from "../../button/Button";
import style from "./createColumn.module.scss";
import Task from "../task/Task";
import AddTask from "./addTask/AddTask";
import dots from "../../../assets/dots.png";
import SettingsModal from "./settingsModal/SettingsModal";
import { ColumnIndexContext } from "../../context/columnContext";

type Props = {
  column: TypeColumn;
  inedex: number;
  columns: TypeColumn[];
};
function CreateColumn({ column, inedex, columns }: Props) {
  const status = useAppSelector((state) => state.kanban.columns[inedex].status);
  const tasks = useAppSelector((state) => state.kanban.columns[inedex].tasks);
  const colorTitle = useAppSelector(
    (state) => state.kanban.columns[inedex].color
  );
  const [nameBlock, setNameBlock] = useState("");
  const [statusCreate, setStatusCreate] = useState(false);
  const [statusSettings, setStatusSettings] = useState(false);
  const dispatch = useAppDispatch();
  const changeColumns = (arr: TypeColumn[]) =>
    dispatch(changeIndexColumns(arr));

  const clickCreateBlock = (): void => {
    console.log("clickCreateBlock");
    dispatch(changeSatus({ id: column.id, status: "createColumn" }));
  };
  const clickCloseBtn = () => {
    console.log("clickCloseBtn");
    if (!statusCreate) {
      dispatch(changeSatus({ id: column.id, status: "beforeCreate" }));
    } else dispatch(changeSatus({ id: column.id, status: "afterCreate" }));
  };
  const clickCreateBtn = () => {
    if (nameBlock) {
      dispatch(changeNameTabel({ id: column.id, name: nameBlock }));
      dispatch(changeSatus({ id: column.id, status: "afterCreate" }));
      if (!statusCreate) {
        dispatch(createTabel());
        setStatusCreate(!statusCreate);
      }
      console.log("clickCreateBtn");
    }
  };
  const clickSettingsIcon = () => {
    setStatusSettings(!statusSettings);
    console.log("Click Settings");
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    startColumn: TypeColumn
  ) => {
    e.dataTransfer.setData("startColumn", `${startColumn.id}`);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove(style.columnDND);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add(style.columnDND);
  };
  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    dropColumn: TypeColumn,
    arrColumns: TypeColumn[]
  ) => {
    e.preventDefault();
    e.currentTarget.classList.remove(style.columnDND);
    const newArrColumns: TypeColumn[] = [...arrColumns];
    const currentColumnId = +e.dataTransfer.getData("startColumn");
    const currentColumn = newArrColumns.find((el) => el.id === currentColumnId);
    if (currentColumn) {
      const currentColumnIndex = newArrColumns.indexOf(currentColumn);
      const dropColumnIndex = newArrColumns.indexOf(dropColumn);
      [newArrColumns[dropColumnIndex], newArrColumns[currentColumnIndex]] = [
        newArrColumns[currentColumnIndex],
        newArrColumns[dropColumnIndex],
      ];
      console.log("CHEEECK COLOMUNS", newArrColumns);
      changeColumns(newArrColumns);
    }
  };

  console.log(
    "check move  state class block",
    column.id,
    column.name,
    column.status
  );

  return (
    <ColumnIndexContext.Provider value={inedex}>
      <div className={` ${style.createTableBlock} ${style[status]}`}>
        {statusSettings && (
          <div
            className={style.blackout}
            onClick={() => setStatusSettings(!statusSettings)}
            onKeyDown={() => setStatusSettings(!statusSettings)}
            aria-hidden
          />
        )}
        <div
          className={`title ${style.titleColumn}`}
          draggable
          onDragStart={(e) => handleDragStart(e, column)}
          onDragLeave={(e) => handleDragLeave(e)}
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, column, columns)}
        >
          <div
            className={style.titleName}
            onClick={clickCreateBlock}
            onKeyDown={clickCreateBlock}
            aria-hidden
          >
            <h4
              style={{ backgroundColor: colorTitle }}
              className={colorTitle ? style.changeFontColor : ""}
            >
              {column?.name}
            </h4>
          </div>
          <div
            className={style.settingsTitle}
            onClick={clickSettingsIcon}
            onKeyDown={clickSettingsIcon}
            aria-hidden
          >
            <img src={dots} alt="dots-settings" />
          </div>

          <SettingsModal index={inedex} status={statusSettings} />
        </div>
        <div className={`${style.create} `}>
          <textarea
            className={style.columnTextarea}
            maxLength={30}
            placeholder=""
            onChange={(e) => setNameBlock(e.target.value)}
          />
          <div className={style.createBtn}>
            <Button
              className={style.doneBtn}
              text="Done"
              onClick={clickCreateBtn}
              icon=""
            />
            <Button
              className={style.closeBtn}
              text="X"
              onClick={clickCloseBtn}
              icon=""
            />
          </div>
        </div>
        <div className={style.mainBlokTasks}>
          {tasks.map((el, i) => (
            <Task
              key={el.id}
              data={el}
              tasks={tasks}
              taskIndex={i}
              column={column}
              columns={columns}
            />
          ))}
          <AddTask columnInedex={inedex} />
        </div>
      </div>
    </ColumnIndexContext.Provider>
  );
}

export default CreateColumn;
