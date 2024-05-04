import React, { useState, useContext, Dispatch, SetStateAction } from "react";
import style from "./style.module.scss";
import Button from "../../../../button/Button";
import { useAppDispatch, useAppSelector } from "../../../../hook/hook";
import {
  ColumnIndexContext,
  TaskIndexContext,
} from "../../../../context/Context";
import { addGlobalTag } from "../../../../store/globalTaskSlice";
import { addTaskTag, removeTag } from "../../../../store/kanbanSlice";
import { Tag, ColumnTag } from "../../../../types/baseTypes";
import iconPaint from "../../../../../assets/icons-color.png";
import PaintTag from "./tagColor/PaintTag";

type Props = {
  status: boolean;
  setStatus: Dispatch<SetStateAction<boolean>>;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  tagPaint: boolean;
  setTagPaint: Dispatch<SetStateAction<boolean>>;
  bgColor: string;
  setBgColor: Dispatch<SetStateAction<string>>;
  textColor: string;
  setTextColor: Dispatch<SetStateAction<string>>;
};

function TagAddModal({
  status,
  setStatus,
  value,
  setValue,
  tagPaint,
  setTagPaint,
  bgColor,
  setBgColor,
  textColor,
  setTextColor,
}: Props) {
  const dispatch = useAppDispatch();
  const dispatchAddGlobalTag = (tag: Tag) => dispatch(addGlobalTag(tag));
  const dispatchAddColumnTag = (tag: ColumnTag) => dispatch(addTaskTag(tag));
  const dispatchRemoveColumnTag = (tag: ColumnTag) => dispatch(removeTag(tag));
  const columnIndex = useContext(ColumnIndexContext);
  const taskIndex = useContext(TaskIndexContext);
  const tagsGlobal = useAppSelector((state) => state.globalTask.tags);
  const tagsTask = useAppSelector(
    (state) => state.kanban.columns[columnIndex].tasks[taskIndex].tags
  );
  const filterTagGlobal = tagsGlobal.filter((el) => el.value === value);
  const idTag = Date.now();
  const creteObjTask = () => {
    return { id: idTag, value, bgColor, textColor };
  };

  const heandelInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filterTagGlobal[0]) {
      if (e.key === "Enter") {
        console.log(e.key);

        dispatchAddGlobalTag(creteObjTask());
        dispatchAddColumnTag({
          columnIndex,
          taskIndex,
          tag: creteObjTask(),
        });
        setStatus(!status);
        setValue("");
        setBgColor("#6a6a6a");
        setTextColor("#c5c5c5");
      }
    }
  };
  const clickCreateTag = () => {
    console.log("btnCreate", columnIndex);
    dispatchAddGlobalTag(creteObjTask());
    dispatchAddColumnTag({
      columnIndex,
      taskIndex,
      tag: creteObjTask(),
    });
    setStatus(!status);
    setValue("");
    setBgColor("#6a6a6a");
    setTextColor("#c5c5c5");
  };
  const onClickTag = (status, el) => {
    if (status) {
      const tag = tagsTask.find((tagTask: Tag) => tagTask.id === el.id);
      let tagIndex = -1;
      if (tag) tagIndex = tagsTask.indexOf(tag);
      dispatchRemoveColumnTag({ columnIndex, taskIndex, tagIndex });
    } else {
      dispatchAddColumnTag({ columnIndex, taskIndex, tag: el });
    }
  };

  return (
    <div className={` ${style.tagModal} ${status ? style.modalActive : ""} `}>
      <input
        value={value}
        placeholder="Create tag"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => heandelInput(e)}
      />
      <div className={style.blockTags}>
        {value && (
          <div className={style.beforeCreateTag}>
            {!filterTagGlobal[0] && (
              <div className={style.createTag}>
                <span>{"Create "}</span>
                <button
                  className={`${style.tag}`}
                  style={{ backgroundColor: bgColor, color: textColor }}
                  onClick={clickCreateTag}
                  type="button"
                >
                  {value}
                </button>
                <div
                  className={style.iconColorBlock}
                  onClick={() => setTagPaint(!tagPaint)}
                  onKeyDown={() => setTagPaint(!tagPaint)}
                  aria-hidden
                >
                  <img src={iconPaint} alt="iconPaint" />
                </div>
              </div>
            )}
            {tagPaint && (
              <PaintTag
                styleModification={style.paintModification}
                setBgColor={setBgColor}
                setTextColor={setTextColor}
              />
            )}
          </div>
        )}
        {tagsGlobal && (
          <div className={style.allTagsBlock}>
            {tagsGlobal.map((el, i) => {
              const checkHaveTagTask = tagsTask.filter(
                (elTask) => elTask.id === el.id
              );
              return (
                <button
                  key={el.id}
                  style={{ backgroundColor: el.bgColor, color: el.textColor }}
                  className={style.tag}
                  onClick={() => onClickTag(checkHaveTagTask[0], el, i)}
                  type="button"
                >
                  {el.value}
                  <span
                    className={checkHaveTagTask[0] ? style.haveTagCheck : ""}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default TagAddModal;
