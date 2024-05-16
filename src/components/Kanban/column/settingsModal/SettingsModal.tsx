import { useState } from "react";
import { useAppDispatch } from "../../../hook/hook";
import {
  changeBackgroundColorTitle,
  removeColumn,
} from "../../../store/kanbanSlice";
import style from "./styles.module.scss";
import binIcon from "../../../../assets/recycle-bin.png";
import PaintTag from "../../paint/PaintTag";

type Props = {
  index: number;
  status: boolean;
};
function SettingsModal({ index, status }: Props) {
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const dispatch = useAppDispatch();
  const changeColorTitile = (obj: Record<string, number | string>) =>
    dispatch(changeBackgroundColorTitle(obj));
  const remove = (indexColumn: number) => dispatch(removeColumn(indexColumn));
  const onChangeRadioBtn = () => {
    changeColorTitile({ index, bgColor, textColor });
  };
  onChangeRadioBtn();
  const onClickRemove = () => {
    remove(index);
  };
  return (
    <div
      className={`${style.settingsModal} ${status ? style.modalActive : ""}`}
    >
      <div
        className={style.deleteSetting}
        onClick={onClickRemove}
        onKeyDown={onClickRemove}
        aria-hidden
      >
        <img src={binIcon} alt="bin-icon" /> <span>Delete</span>
      </div>
      <div className={style.colorsSettingBlock}>
        <PaintTag
          setBgColor={setBgColor}
          setTextColor={setTextColor}
          styleModification={style.paintMofification}
        />
      </div>
    </div>
  );
}
export default SettingsModal;
