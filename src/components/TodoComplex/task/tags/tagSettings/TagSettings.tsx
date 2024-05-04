import React, { useState, useContext, Dispatch, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hook/hook";
import { removeTag, changeColorTag } from "../../../../store/kanbanSlice";
import {
  changeColorGlobalTag,
  deleteTag,
} from "../../../../store/globalTaskSlice";
import {
  ColumnIndexContext,
  TaskIndexContext,
} from "../../../../context/Context";
import style from "./style.module.scss";
import PaintTag from "../tagModal/tagColor/PaintTag";
import { TypeTag } from "../../../../types/baseTypes";
import removeIcon from "../../../../../assets/icons8-remove.png";
import deleteIcon from "../../../../../assets/recycle-bin.png";

type Props = {
  targetTag: TypeTag | null;
  setTargetTag: Dispatch<SetStateAction<TypeTag | null>>;
  settagSettings: Dispatch<SetStateAction<boolean>>;
};

function TagSettings({ targetTag, setTargetTag, settagSettings }: Props) {
  const columnIndex = useContext(ColumnIndexContext);
  const taskIndex = useContext(TaskIndexContext);
  const tagsTask = useAppSelector(
    (state) => state.kanban.columns[columnIndex].tasks[taskIndex].tags
  );
  const tagsGlobal = useAppSelector((state) => state.globalTask.tags);
  const dispatch = useAppDispatch();
  const removeDispatch = (obj: Record<string, number>) =>
    dispatch(removeTag(obj));
  const changeColorDispatch = (obj: Record<string, number | string>) =>
    dispatch(changeColorTag(obj));
  const deleteGlobalDispatch = (index: number) => dispatch(deleteTag(index));
  const changeGlobalColorDispatch = (obj: Record<string, number | string>) =>
    dispatch(changeColorGlobalTag(obj));

  const geteIndex = (arr, currentEl) => {
    const tag = arr.find((el) => el.id === currentEl.id);
    let index = -1;
    if (tag) index = arr.indexOf(tag);
    return index;
  };

  const [bgColor, setBgColor] = useState(
    tagsTask[geteIndex(tagsTask, targetTag)].bgColor
  );
  const [textColor, setTextColor] = useState(
    tagsTask[geteIndex(tagsTask, targetTag)].textColor
  );

  const onClickRemove = () => {
    const tagIndex = geteIndex(tagsTask, targetTag);
    removeDispatch({ columnIndex, taskIndex, tagIndex });
    setTargetTag(null);
    settagSettings(false);
    console.log(targetTag, geteIndex(tagsTask, targetTag), "TARGET INDEX");
  };
  const onClickDelete = () => {
    const tagIndex = geteIndex(tagsTask, targetTag);
    deleteGlobalDispatch(tagIndex);
    setTargetTag(null);
    settagSettings(false);
    console.log(
      targetTag,
      geteIndex(tagsTask, targetTag),
      "TARGET INDEX DELETE"
    );
  };
  const changeColor = () => {
    const tagTaskIndex = geteIndex(tagsTask, targetTag);
    const tagTaskGlobalIndex = geteIndex(tagsGlobal, targetTag);
    changeColorDispatch({
      columnIndex,
      taskIndex,
      tagTaskIndex,
      bgColor,
      textColor,
    });
    changeGlobalColorDispatch({ tagTaskGlobalIndex, bgColor, textColor });
    console.log(targetTag, tagTaskGlobalIndex, "TARGET INDEX");
  };
  changeColor();

  return (
    <div className={style.settingBlock}>
      <div className={style.btnsBlock}>
        <button
          className={style.removeBtn}
          type="button"
          onClick={() => onClickRemove()}
        >
          <img className={style.removeIcon} src={removeIcon} alt="removeIcon" />
          Remove
        </button>
        <button
          className={style.deleteBtn}
          type="button"
          onClick={() => onClickDelete()}
        >
          <img className={style.removeIcon} src={deleteIcon} alt="removeIcon" />
          Delete
        </button>
      </div>
      <PaintTag
        styleModification={style.paintModification}
        setBgColor={setBgColor}
        setTextColor={setTextColor}
      />
    </div>
  );
}
export default TagSettings;
