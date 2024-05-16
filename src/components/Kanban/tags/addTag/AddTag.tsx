import React, { useContext, Dispatch, SetStateAction } from "react";
import style from "./style.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hook/hook";
import {
  ActiveModalContext,
  ColumnIndexContext,
  TaskIndexContext,
} from "../../../context/Context";
import { addGlobalTag } from "../../../store/globalTaskSlice";
import { addTaskTag } from "../../../store/kanbanSlice";
import { TypeTag, ColumnTag } from "../../../types/baseTypes";
import iconPaint from "../../../../assets/icons-color.png";
import PaintTag from "../../paint/PaintTag";
import GLobalTags from "../globalTags/GlobalTags";

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  tagPaint: boolean;
  setTagPaint: Dispatch<SetStateAction<boolean>>;
  bgColor: string;
  setBgColor: Dispatch<SetStateAction<string>>;
  textColor: string;
  setTextColor: Dispatch<SetStateAction<string>>;
  setTagsAddSettings: Dispatch<SetStateAction<boolean>>;
};

function AddTag({
  value,
  setValue,
  tagPaint,
  setTagPaint,
  bgColor,
  setBgColor,
  textColor,
  setTextColor,
  setTagsAddSettings,
}: Props) {
  const dispatch = useAppDispatch();
  const dispatchAddGlobalTag = (tag: TypeTag) => dispatch(addGlobalTag(tag));
  const dispatchAddColumnTag = (tag: ColumnTag) => dispatch(addTaskTag(tag));

  const columnIndex = useContext(ColumnIndexContext);
  const taskIndex = useContext(TaskIndexContext);
  const modalContext = useContext(ActiveModalContext);
  const tagsGlobal = useAppSelector((state) => state.globalTask.tags);
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
        setTagsAddSettings(false);
        setValue("");
        setBgColor("");
        setTextColor("");
        modalContext?.setModalActive(false);
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
    setTagsAddSettings(false);
    setValue("");
    setBgColor("");
    setTextColor("");
    modalContext?.setModalActive(false);
  };

  return (
    <div className={` ${style.tagModal} ${style.modalActive} `}>
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
        {tagsGlobal[0] && (
          <GLobalTags columnIndex={columnIndex} taskIndex={taskIndex} />
        )}
      </div>
    </div>
  );
}

export default AddTag;
