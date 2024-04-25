import React, { useState, useContext, Dispatch, SetStateAction } from "react";
import style from "./style.module.scss";
import Button from "../../../../button/Button";
import { useAppDispatch, useSelector } from "../../../../hook/hook";
import {
  ColumnIndexContext,
  TaskIndexContext,
} from "../../../../context/columnContext";
import { addGlobalTag } from "../../../../store/globalTaskSlice";
import { addTaskTag } from "../../../../store/kanbanSlice";
import { Tag, ColumnTag } from "../../../../types/baseTypes";

type Props = {
  status: boolean;
  setStatus: Dispatch<SetStateAction<boolean>>;
};

function TagModal({ status, setStatus }: Props) {
  const [value, setValue] = useState("");
  const [bgColor, setBgColor] = useState("#6a6a6a");
  const [textColor, setTextColor] = useState("#c5c5c5");
  const dispatch = useAppDispatch();
  const dispatchAddGlobalTag = (tag: Tag) => dispatch(addGlobalTag(tag));
  const dispatchAddColumnTag = (tag: ColumnTag) => dispatch(addTaskTag(tag));
  const columnIndex = useContext(ColumnIndexContext);
  const taskIndex = useContext(TaskIndexContext);

  const heandelInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(e.key);

      dispatchAddGlobalTag({ value, bgColor, textColor });
      dispatchAddColumnTag({
        columnIndex,
        taskIndex,
        tag: { value, bgColor, textColor },
      });
      setStatus(!status);
      setValue("");
    }
  };
  const clickCreateTag = () => {
    console.log("btnCreate", columnIndex);
    dispatchAddGlobalTag({ value, bgColor, textColor });
    dispatchAddColumnTag({
      columnIndex,
      taskIndex,
      tag: { value, bgColor, textColor },
    });
    setStatus(!status);
    setValue("");
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
            Create{" "}
            <Button
              text={value}
              className={`btnCreate ${style.cereateTag}`}
              onClick={clickCreateTag}
              icon=""
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TagModal;
