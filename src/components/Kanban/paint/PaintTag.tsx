import { Dispatch, SetStateAction } from "react";
import style from "./style.module.scss";
import noneIcon from "../../../assets/none_icon.png";

type Props = {
  styleModification: string;
  setBgColor: Dispatch<SetStateAction<string>>;
  setTextColor: Dispatch<SetStateAction<string>>;
};
function PaintTag({ styleModification, setBgColor, setTextColor }: Props) {
  const arr = [
    { bgColor: "#f17574", color: "#a11900" },
    { bgColor: "#f48435", color: "#97470e" },
    { bgColor: "#e7a826", color: "#996701" },
    { bgColor: "#a8c027", color: "#60700b" },
    { bgColor: "#63c57e", color: "#067424" },
    { bgColor: "#19b9b4", color: "#026a67" },
    { bgColor: "#57b1fd", color: "#0a5595" },
    { bgColor: "#889afc", color: "#3b4891" },
    { bgColor: "#d296ee", color: "#73378f" },
    { bgColor: "#fe87bd", color: "#933b63" },
    { bgColor: "#6a6a6a", color: "#c5c5c5" },
    { bgColor: "#658ba8", color: "#bbdbf3" },
    { bgColor: "#b78562", color: "#f7d5bc" },
  ];
  const onClickColor = (el: Record<string, string>) => {
    setBgColor(el.bgColor);
    setTextColor(el.color);
    console.log("COLOR");
  };
  const onClickNoneColor = () => {
    setBgColor("");
    setTextColor("");
  };
  return (
    <div className={`${style.paint} ${styleModification}`}>
      {arr.map((el) => (
        <div
          key={el.bgColor}
          className={style.colorBlock}
          onClick={() => onClickColor(el)}
          onKeyDown={() => onClickColor(el)}
          aria-hidden
        >
          <div
            className={style.color}
            style={{ backgroundColor: el.bgColor }}
          />
        </div>
      ))}
      <div
        className={style.noneBlock}
        onClick={() => onClickNoneColor()}
        onKeyDown={() => onClickNoneColor()}
        aria-hidden
      >
        <img src={noneIcon} alt="noneIcon" />
      </div>
    </div>
  );
}
export default PaintTag;
