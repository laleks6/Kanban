import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../../hook/hook";
import style from "./style.module.scss";
import Button from "../../../button/Button";
import TagAddModal from "./tagModal/TagModal";
import { type TypeTag } from "../../../types/baseTypes";
import TagSettings from "./tagSettings/TagSettings";
import Tag from "./tag/Tag";
import { ColumnIndexContext, TaskIndexContext } from "../../../context/Context";
import { removeTag } from "../../../store/kanbanSlice";

type Props = {
  data: TypeTag[];
  tagsAddModal: boolean;
  setTagsAddModal: Dispatch<SetStateAction<boolean>>;
  tagSettings: boolean;
  settagSettings: Dispatch<SetStateAction<boolean>>;
};
function Tags({
  data,
  tagsAddModal,
  setTagsAddModal,
  tagSettings,
  settagSettings,
}: Props) {
  console.log(data, "RENDERING TAGS BLOCK");
  const [value, setValue] = useState("");
  const [tagPaint, setTagPaint] = useState(false);
  const [bgColor, setBgColor] = useState("#6a6a6a");
  const [textColor, setTextColor] = useState("#c5c5c5");
  const [targetTag, setTargetTag] = useState<TypeTag | null>(null);
  const columnIndex = useContext(ColumnIndexContext);
  const taskIndex = useContext(TaskIndexContext);
  const globalTags = useAppSelector((state) => state.globalTask.tags);
  const deleteTag = useAppSelector((state) => state.globalTask.deleteTag);
  const dispatch = useAppDispatch();
  const deleteTagDispatch = (obj: Record<string, number | string>) =>
    dispatch(removeTag(obj));

  const onClickBtnAddTag = () => {
    setTagsAddModal(!tagsAddModal);
    setTagPaint(false);
    setValue("");
    setBgColor("#6a6a6a");
    setTextColor("#c5c5c5");
  };
  const onClickTag = (el: TypeTag) => {
    settagSettings(!tagSettings);
    setTargetTag(el);
  };
  useEffect(() => {
    const checkTags = () => {
      data.forEach((el, i) => {
        if (deleteTag[0]) {
          if (el.id === deleteTag[0].id) {
            deleteTagDispatch({ columnIndex, taskIndex, i });
          }
        }
      });
    };
    checkTags();
  }, [columnIndex, data, deleteTag, deleteTagDispatch, taskIndex]);
  return (
    <div className={style.tagsBlock}>
      {data &&
        data.map((el, i) => (
          <Tag
            key={el.id}
            data={el}
            onClickTag={onClickTag}
            index={i}
            targetTag={targetTag}
          />
        ))}
      {tagSettings && (
        <TagSettings
          targetTag={targetTag}
          setTargetTag={setTargetTag}
          settagSettings={settagSettings}
        />
      )}
      <div className={style.tagAddBlock}>
        <Button
          className={style.addTagBtn}
          onClick={onClickBtnAddTag}
          text="+"
          icon=""
        />
        {!data[0] && <span className={style.textAddTeg}>add tag</span>}
      </div>

      <TagAddModal
        status={tagsAddModal}
        setStatus={setTagsAddModal}
        value={value}
        setValue={setValue}
        tagPaint={tagPaint}
        setTagPaint={setTagPaint}
        bgColor={bgColor}
        setBgColor={setBgColor}
        textColor={textColor}
        setTextColor={setTextColor}
      />
    </div>
  );
}
export default Tags;
