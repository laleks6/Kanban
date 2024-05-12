import React, { useContext, Dispatch, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "../../../hook/hook";
import { ColumnIndexContext, TaskIndexContext } from "../../../context/Context";
import { ColumnTag, TypeTag } from "../../../types/baseTypes";
import { addTaskTag, removeTag } from "../../../store/kanbanSlice";
import style from "./style.module.scss";
type Props = Record<string, number>;
function GLobalTags({ columnIndex, taskIndex }: Props) {
  const tagsGlobal = useAppSelector((state) => state.globalTask.tags);
  const tagsTask = useAppSelector(
    (state) => state.kanban.columns[columnIndex].tasks[taskIndex].tags
  );
  const dispatch = useAppDispatch();
  const dispatchAddColumnTag = (tag: ColumnTag) => dispatch(addTaskTag(tag));
  const dispatchRemoveColumnTag = (tag: Record<string, number>) =>
    dispatch(removeTag(tag));

  const onClickTag = (status, el) => {
    if (status) {
      const tag = tagsTask.find((tagTask: TypeTag) => tagTask.id === el.id);
      let tagIndex = -1;
      if (tag) tagIndex = tagsTask.indexOf(tag);
      dispatchRemoveColumnTag({ columnIndex, taskIndex, tagIndex });
    } else {
      dispatchAddColumnTag({ columnIndex, taskIndex, tag: el });
    }
  };
  return (
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
            <span className={checkHaveTagTask[0] ? style.haveTagCheck : ""} />
          </button>
        );
      })}
    </div>
  );
}

export default GLobalTags;
function dispatchRemoveColumnTag(arg0: {
  columnIndex: any;
  taskIndex: any;
  tagIndex: number;
}) {
  throw new Error("Function not implemented.");
}
