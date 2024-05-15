import React, { useState } from "react";
import { useAppDispatch } from "../../../hook/hook";
import {
  changeBackgroundColorTitle,
  removeColumn,
} from "../../../store/kanbanSlice";
import style from "./styles.module.scss";
import binIcon from "../../../../assets/recycle-bin.png";
import PaintTag from "../../paint/PaintTag";
// import { Target, color } from "framer-motion";
// const colors = {
//   Gray: "#6a6a6a",
//   Brown: "#603b2c",
//   Orange: "#854c1d",
//   Yellow: "#89632a",
//   Green: "#2b593f",
//   Blue: "#28456c",
//   Purple: "#492f64",
//   Pink: "#69314c",
//   Red: "#6e3630",
//   None: "",
// };
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
  const onChangeRadioBtn = () =>
    // e: React.FormEvent<HTMLInputElement>,
    // color: string
    {
      // const target = e.target as HTMLInputElement;
      // if (target.checked) {
      //   changeColorTitile({ index, bgColor, textColor });
      // }
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
          styleModification=""
        />
        {/* {Object.keys(colors).map((el) => {
          if (typeof el === "string")
            return (
              <label htmlFor="s1-2" key={colors[el]} className={style.colorsSetting}>
                <div className={style.colorBlock}>
                  {colors[el] ? (
                    <span
                      className={style.colorIcon}
                      style={{ backgroundColor: colors[el] }}
                    />
                  ) : (
                    <img
                      className={style.noneColorsIcon}
                      src={noneIcon}
                      alt="none"
                    />
                  )}
                  <span>{el}</span>
                </div>
                <input
                  type="radio"
                  name={`radio_${index}`}
                  onChange={(e) => onChangeRadioBtn(e, colors[el])}
                />
                <span className={style.newChecbox} />
              </label>
            );
        })} */}
      </div>
    </div>
  );
}
export default SettingsModal;
