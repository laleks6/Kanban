import React, { useState, useRef } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import style from "./style.module.scss";
import { TypeTaskDataContext } from "../../../types/baseTypes";
import { useAppSelector, useAppDispatch } from "../../../hook/hook";
import {
  changeTaskTitile,
  addDescriptionTask,
  deleteDescriptionTask,
  changeDescriptionTask,
  deleteTask,
} from "../../../store/kanbanSlice";
import GLobalTags from "../../tags/globalTags/GlobalTags";
import iconDelete from "../../../../assets/recycle-bin.png";

type Props = { taskIndex: TypeTaskDataContext | null };
function TaskSettingsModal({ taskIndex }: Props) {
  // const [targetTag];
  let indexColumn = -1;
  let indexTask = -1;
  if (taskIndex) {
    indexColumn = taskIndex.indexColumn;
    indexTask = taskIndex.indexTask;
  }
  const task = useAppSelector(
    (state) => state.kanban.columns[indexColumn].tasks[indexTask]
  );
  const dispatch = useAppDispatch();
  const chengeTitleTaskDispatch = (obj: Record<string, number | string>) =>
    dispatch(changeTaskTitile(obj));
  const addDescriptionDispatch = (obj: Record<string, number | string>) =>
    dispatch(addDescriptionTask(obj));
  const deleteDescriptionDispatch = (obj: Record<string, number>) =>
    dispatch(deleteDescriptionTask(obj));
  const changeDescriptionTaskDispatch = (
    obj: Record<string, number | string>
  ) => dispatch(changeDescriptionTask(obj));
  const deleteTaskDispatch = (obj: Record<string, number>) =>
    dispatch(deleteTask(obj));
  const [title, setTitile] = useState(true);
  const [titleValue, setTitileValue] = useState(task.data);
  const [descriptionValue, setDescriptionValue] = useState("");
  const [description, setDescription] = useState(false);
  const tagsGlobal = useAppSelector((state) => state.globalTask.tags);
  // const clickTitile = () => {
  //   setTitile(!title);
  // };
  const changeTitle = (e: ContentEditableEvent) => {
    const { value } = e.target;
    chengeTitleTaskDispatch({ indexColumn, indexTask, value });
    // setTitileValue(e.target.value);
  };
  // const clickChangeBtn = () => {
  //   chengeTitleTaskDispatch({ indexColumn, indexTask, titleValue });
  //   setTitile(true);
  // };
  // const clickCloseBtn = () => {
  //   setTitile(true);
  //   setTitileValue(task.data);
  // };
  const clickDescription = () => {
    setDescription(true);
  };
  const changeDescription = (
    e: ContentEditableEvent,
    indexDescription: number
  ) => {
    const { value } = e.target;

    changeDescriptionTaskDispatch({
      indexColumn,
      indexTask,
      indexDescription,
      value,
    });
    // setDescriptionValue(e.target.innerText);
  };
  const createDescription = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      // console.log("ПрошлоЫ", descriptionValue);
      e.preventDefault();
      addDescriptionDispatch({ indexColumn, indexTask, descriptionValue });
      setDescriptionValue("");
      e.target.innerText = "";
    }
  };
  const deleteDescription = (indexDescription: number) => {
    deleteDescriptionDispatch({ indexColumn, indexTask, indexDescription });
  };
  const clickDeleteTaskBtn = () => {
    deleteTaskDispatch({ indexColumn, indexTask });
  };
  console.log("description", task);
  return (
    <div className={style.setting}>
      <div className={style.settingContent}>
        <div className={style.taskInfo}>
          <ContentEditable
            id="title"
            data-one="one"
            className={style.title}
            onChange={(e) => changeTitle(e)}
            aria-hidden
            html={`${task.data}`}
          />

          <div className={style.blockDescriptions}>
            {task.description.map((el, i) => (
              <div key={el.id} className={style.description}>
                <ContentEditable
                  data-two="two"
                  html={el.data}
                  className={`${style.contentEditable}`}
                  onChange={(e) => changeDescription(e, i)}
                  aria-hidden
                />
                <button
                  className={style.deleteDescriptionBtn}
                  onClick={() => deleteDescription(i)}
                  type="button"
                >
                  <img src={iconDelete} alt="iconDelete" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`${style.newDescription} `}
          onInput={(e) => setDescriptionValue(e.target.innerText)}
          onClick={(e) => clickDescription(e)}
          onKeyDown={(e) => createDescription(e)}
          aria-hidden
          contentEditable="true"
          data-placeholder="+Add new description"
        />

        {tagsGlobal[0] && (
          <div className={style.tags}>
            <div className={style.taskTags} />
            <div className={style.globalTags}>
              <h6>Tags</h6>

              <GLobalTags columnIndex={indexColumn} taskIndex={indexTask} />
            </div>
          </div>
        )}
      </div>

      {/* <button className={style.deleteTask}>Delete</button> */}
      <button
        type="button"
        className={style.deleteTask}
        onClick={() => clickDeleteTaskBtn()}
      >
        <img src={iconDelete} alt="iconDelete" />
      </button>
    </div>
  );
}
export default TaskSettingsModal;
