import React, { useState } from "react";
import { useAppDispatch } from "../../../hook/hook";
import {
  changeBackgroundColorTitle,
  removeColumn,
} from "../../../store/kanbanSlice";
import style from "./styles.module.scss";
import binIcon from "../../../../assets/recycle-bin.png";
import noneIcon from "../../../../assets/none_icon.png";
import { Target, color } from "framer-motion";
const colors = {
  Gray: "#6a6a6a",
  Brown: "#603b2c",
  Orange: "#854c1d",
  Yellow: "#89632a",
  Green: "#2b593f",
  Blue: "#28456c",
  Purple: "#492f64",
  Pink: "#69314c",
  Red: "#6e3630",
  None: "",
};
type Props = {
  index: number;
  status: boolean;
};
function SettingsModal({ index, status }: Props) {
  const dispatch = useAppDispatch();
  const changeColorTitile = (obj) => dispatch(changeBackgroundColorTitle(obj));
  const remove = (indexColumn: number) => dispatch(removeColumn(indexColumn));
  const onChangeRadioBtn = (
    e: React.FormEvent<HTMLInputElement>,
    color: string
  ) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      changeColorTitile({ index, color });
    }
  };
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
        {Object.keys(colors).map((el, i) => (
          <label key={i} className={style.colorsSetting}>
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
            <span className={style.newChecbox}></span>
          </label>
        ))}
      </div>
    </div>
  );
}
export default SettingsModal;
