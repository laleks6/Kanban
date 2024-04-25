import React, { useState } from "react";
import style from "./style.module.scss";
import Button from "../../../button/Button";
import TagModal from "./tagModal/TagModal";
import { color } from "framer-motion";
import { Tag } from "../../../types/baseTypes";

type Props = {
  data: Tag[];
};
function Tags({ data }: Props) {
  const [statusModal, setStatusModal] = useState(false);
  const [tegValue, settegValue] = useState("");
  const onClickBtn = () => {
    setStatusModal(!statusModal);
  };
  console.log(data, "MODAL");
  return (
    <div className={style.tagsBlock}>
      {data &&
        data.map((el) => (
          <span
            key={Date.now()}
            className={style.taskTags}
            style={{ backgroundColor: el.bgColor, color: el.textColor }}
          >
            {el.value}
          </span>
        ))}
      <div className={style.tagAddBlock}>
        <Button
          className={style.addTagBtn}
          onClick={onClickBtn}
          text="+"
          icon=""
        />
        <span className={style.textAddTeg}>add tag</span>
      </div>
      <TagModal status={statusModal} setStatus={setStatusModal} />
    </div>
  );
}
export default Tags;
