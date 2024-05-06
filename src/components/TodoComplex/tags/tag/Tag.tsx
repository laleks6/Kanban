import React, { useContext, useEffect } from "react";
import style from "../style.module.scss";
import { type TypeTag } from "../../../types/baseTypes";
import { useAppSelector, useAppDispatch } from "../../../hook/hook";
import { changeColorTag } from "../../../store/kanbanSlice";
import { ColumnIndexContext, TaskIndexContext } from "../../../context/Context";

type Props = {
  data: TypeTag;
  onClickTag: (el: TypeTag) => void;
  index: number;
  targetTag: TypeTag | null;
};

function Tag({ data, onClickTag, index, targetTag }: Props) {
  const columnIndex = useContext(ColumnIndexContext);
  const taskIndex = useContext(TaskIndexContext);
  const globalTags = useAppSelector((state) => state.globalTask.tags);
  const deleteTag = useAppSelector((state) => state.globalTask.deleteTag);
  const dispatch = useAppDispatch();

  console.log("CHECK DELTELDELTEL DELTE", deleteTag);
  useEffect(() => {
    const changeColor = (obj: Record<string, number | string>) =>
      dispatch(changeColorTag(obj));
    // const deleteTagDispatch = (obj: Record<string, number | string>) =>
    //   dispatch(removeTag(obj));

    const checkColorTags = () => {
      globalTags.forEach((el) => {
        if (el.id === data.id) {
          if (el.bgColor !== data.bgColor) {
            changeColor({
              columnIndex,
              taskIndex,
              tagTaskIndex: index,
              bgColor: el.bgColor,
              textColor: el.textColor,
            });
          }
        }
      });
    };

    // const checkHaveTag = () => {
    //   if (deleteTag[0]) {
    //     if (data.id === deleteTag[0].id) {
    //       console.log(
    //         datas,
    //         data,
    //         deleteTag[0],
    //         columnIndex,
    //         taskIndex,
    //         index,
    //         "AAAAAAAAAAAAAAAAAAAAAAAAAA DDDD"
    //       );
    //       deleteTagDispatch({ columnIndex, taskIndex, index });
    //     }
    //   }
    // };
    checkColorTags();
    // checkHaveTag();
  }, [columnIndex, data, deleteTag, dispatch, globalTags, index, taskIndex]);

  return (
    <div
      key={data.id}
      className={`${style.blockTag} `}
      onClick={() => onClickTag(data)}
      onKeyDown={() => onClickTag(data)}
      aria-hidden
    >
      <button
        className={`${style.tag} ${targetTag ? style.targetTag : ""}`}
        style={{ backgroundColor: data.bgColor, color: data.textColor }}
        type="button"
      >
        {" "}
        {data.value}
      </button>
    </div>
  );
}
export default Tag;
